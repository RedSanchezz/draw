import IndexedDB from "../../SettingsManager/DBHelper";
import Brush from "../Brush/Brush";

export default class Eraser extends Brush{
    constructor(canvas, ctx, paint){
        super(canvas, ctx, paint);
    }
    create(){
        var ppts = [];
        const tmp_canvas = document.createElement("canvas");
        this._fakeCanvas =tmp_canvas;
        tmp_canvas.style.zIndex=100;
        tmp_canvas.height= this._canvas.height;
        tmp_canvas.width = this._canvas.width;
        tmp_canvas.classList.add("canvas");

        const tmp_ctx=tmp_canvas.getContext("2d");

        this._canvasBlock.prepend(tmp_canvas);

        this._listenerManager.addListener(tmp_canvas, "mousedown",(e) =>{
            let settingObj=this._settingManager.getSettingObject();

            this._ctx.strokeStyle = settingObj.strokeStyle;
            this._ctx.lineWidth = settingObj.lineWidth;
            this._ctx.lineCap = settingObj.lineCap;

            tmp_ctx.strokeStyle = this._ctx.strokeStyle;
            tmp_ctx.lineWidth = this._ctx.lineWidth;
            tmp_ctx.lineCap  = this._ctx.lineCap;

            this._ctx.strokeStyle= "lightgray";
            tmp_ctx.strokeStyle = "lightgray";
            onPaint(e);
            this._listenerManager.addListener(tmp_canvas, "mousemove", onPaint);
        });
        
        this._listenerManager.addListener(tmp_canvas, "mouseup", ()=> {
            this._listenerManager.removeListener(tmp_canvas, "mousemove",onPaint);
            // tmp_ctx.globalAlpha=this.getAlpha();
            let imageData=testFunc(tmp_ctx.getImageData(0, 0, tmp_canvas.width, tmp_canvas.height), this._ctx.getImageData(0, 0, tmp_canvas.width, tmp_canvas.height));
            
            tmp_ctx.putImageData(imageData, 0, 0);

            this._ctx.lineWidt=0;
            this._ctx.putImageData(imageData, 0, 0);

            tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
            ppts=[];
            this._settingManager.saveCanvas();
            this._layoutManager.update();

        });

        var onPaint = (e)=> {
            let x= e.offsetX;
            let y = e.offsetY;
            ppts.push({x, y});

            tmp_ctx.beginPath();
            // tmp_ctx.moveTo(ppts[0].x, ppts[0].y);
            tmp_ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

            if(ppts.length<=3){
                tmp_ctx.arc(ppts[0].x, ppts[0].y, 0, 0, 2*Math.PI);
            }
            for (var i = 1; i < ppts.length - 2; i++) {
                var c = (ppts[i].x + ppts[i + 1].x) / 2;
                var d = (ppts[i].y + ppts[i + 1].y) / 2;
                tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
            }
            // for(let i=2;i<ppts.length-2; i++){
            //     tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, ppts[i].x, ppts[i].y);
            // }
            tmp_ctx.stroke();
        };
    }
    destroy(){
        this._listenerManager.removeAllListener();
        this._fakeCanvas.remove();
    }
}

function testFunc(array, array2){
    for(let i=0;i<array.data.length; i=i+4){
        if(array.data[i+3]==255){
            array2.data[i+3]=0;
        }
    }
    return array2;
}

async function saveImageInDB(imageDataForSave){
    let indexedDB = new IndexedDB();
    await indexedDB.open("canvasDB", 2);
    await indexedDB.save("canvasDB", {
        id: "imageData",
        imageData: imageDataForSave
    });
}