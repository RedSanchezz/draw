import Brush from "./Brush";


export default class SketchBrush extends Brush{
    constructor(canvas, ctx, paint){
        super(canvas, ctx, paint);
        console.log(this._layoutManager);
        
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
            tmp_ctx.strokeStyle = this._ctx.strokeStyle;
            tmp_ctx.lineWidth = this._ctx.lineWidth;
            tmp_ctx.lineCap  = this._ctx.lineCap;
            onPaint(e);
            this._listenerManager.addListener(tmp_canvas, "mousemove", onPaint);
        });
        
        //когда отжимаем клавишу мыши
        this._listenerManager.addListener(tmp_canvas, "mouseup", ()=> {
            this._listenerManager.removeListener(tmp_canvas, "mousemove",onPaint);
            // tmp_ctx.globalAlpha=this.getAlpha();
            this._ctx.drawImage(tmp_canvas, 0, 0);
            
            tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
            ppts=[];
            this._settingManager.saveCanvas();
            this._layoutManager.updateLayout(this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height));
        });

        //когда мышка уходит с холста
        this._listenerManager.addListener(this._canvasBlock, "mouseleave", ()=> {
            this._listenerManager.removeListener(tmp_canvas, "mousemove",onPaint);
            // tmp_ctx.globalAlpha=this.getAlpha();
            this._ctx.drawImage(tmp_canvas, 0, 0);
            
            tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
            ppts=[];
            this._settingManager.saveCanvas();
            this._layoutManager.updateLayout(this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height));
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


