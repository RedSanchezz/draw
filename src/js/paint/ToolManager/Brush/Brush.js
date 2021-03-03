import ListenerManager from "../../ListenerManager/ListenerManager";
import ColorHelper from "../../utils/ColorHelper";

export default class Brush {
    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx = ctx;
        this._canvasBlock = document.querySelector(".canvas-block");
        this._listenerManager= new ListenerManager(new Array());
        this._alpha=1;
    }
    //устанавливает кисти прозрачность

    getLineCap(){
        return this._ctx.lineCap;
    }
    setColor(color){
        if(this._alpha) color=ColorHelper.toRgba(color, this._alpha);
        this._ctx.fillStyle=color;
        this._ctx.strokeStyle=color;
    }
    getColor(){
        ColorHelper.toHex(this._ctx.strokeStyle);
        return this._ctx.strokeStyle;
    }
    setAlpha(alpha){
        console.log(alpha);
        let rgba= ColorHelper.toRgba(this.getColor(),alpha);
        console.log(rgba);
        this.setColor(rgba);
        this._alpha=alpha;
    }
    getAlpha(){
        console.log(this._alpha);
        return this._alpha;
    }
    setLineWidth(width){
        this._ctx.lineWidth=width;
    }
    getLineWidth(width){
        return this._ctx.lineWidth;
    }

}
