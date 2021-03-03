import Brush from "./Brush";


export default class SketchBrush extends Brush{
    constructor(canvas, ctx){
        super(canvas, ctx);
    }
    create(){
        var ppts = [];
        const tmp_canvas = document.createElement("canvas");
        tmp_canvas.style.zIndex=100;
        tmp_canvas.height= this._canvas.height;
        tmp_canvas.width = this._canvas.width;
        tmp_canvas.classList.add("canvas");
        const tmp_ctx=tmp_canvas.getContext("2d");
        this._canvasBlock.prepend(tmp_canvas);
        tmp_canvas.addEventListener('mousedown', (e) =>{
            console.log("down");
            tmp_ctx.strokeStyle = this._ctx.strokeStyle;
            tmp_ctx.lineWidth = this._ctx.lineWidth;
            tmp_ctx.lineCap  = this._ctx.lineCap;
            tmp_canvas.addEventListener("mousemove", onPaint);
            //test
        });
        
        tmp_canvas.addEventListener('mouseup', ()=> {
            tmp_canvas.removeEventListener('mousemove', onPaint);
            this._ctx.drawImage(tmp_canvas, 0, 0);
            tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
            console.log("up");
            ppts=[];
        });
        var onPaint = (e)=> {
            let x= e.offsetX;
            let y = e.offsetY;

            ppts.push({x, y});
            
            tmp_ctx.beginPath();
            // tmp_ctx.moveTo(ppts[0].x, ppts[0].y);

            tmp_ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);

            if(ppts.length<3){
                tmp_ctx.arc(ppts[0].x, ppts[0].y, 1, 0, 2*Math.PI);
                console.log("test");
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

    }
    

}
