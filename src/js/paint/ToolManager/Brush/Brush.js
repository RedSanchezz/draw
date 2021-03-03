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
        this._ctx.fillStyle=color;
        this._ctx.strokeStyle=color;
    }
    getColor(){
        return this._ctx.strokeStyle;
    }
    setAlpha(alpha){
        console.log(ColorHelper.rgbaToHex("rgba(2, 255, 255, 0.9999)"));
        console.log(ColorHelper.rgbToHex("rgba(2, 255, 255"));
        // let rgba= this.getColor().startsWith("rgba");
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
