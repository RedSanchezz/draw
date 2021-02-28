import BrushManager from "../../BrushManager/BrushManager";


export default class PointerManager{
    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx = ctx;
        this._canvasBlock = document.querySelector(".canvas-block");
        this._listeners = [];
    }
    setBrushPointer(){
        let pointer = document.querySelector(".brush_pointer");
        pointer.style.width = new BrushManager(this._ctx).getLineWidth() + "px";
        pointer.style.height = new BrushManager(this._ctx).getLineWidth() + "px";
        let pointerFunc = (e)=>{
            let domRect = this._canvas.getBoundingClientRect();
            pointer.style.top = e.offsetY - parseInt(getComputedStyle(pointer).width)/2 + "px";
            pointer.style.left = e.offsetX - parseInt(getComputedStyle(pointer).height)/2 + "px";
        }
        this._canvas.addEventListener("mousemove", pointerFunc);
    }
}