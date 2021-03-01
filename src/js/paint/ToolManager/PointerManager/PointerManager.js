import BrushManager from "../BrushManager/BrushManager";
import ListenerManager from "../../ListenerManager/ListenerManager"

export default class PointerManager{
    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx = ctx;
        this._canvasBlock = document.querySelector(".canvas-block");
        this._listeners = [];
        this._pointerElem=document.querySelector(".brush_pointer");;
        this._listenerManager = new ListenerManager(new Array());
        this._pointerFunc=null;
    }
    setBrushPointer(){
        let pointer = document.querySelector(".brush_pointer");
        this._pointerElem = pointer;
        pointer.style.width = new BrushManager(this._canvas, this._ctx).getLineWidth() + "px";
        pointer.style.height = new BrushManager(this._canvas, this._ctx).getLineWidth() + "px";
        this._pointerFunc = (e)=>{
            this._pointerElem.style.display="block";
            let domRect = this._canvas.getBoundingClientRect();
            pointer.style.top = e.offsetY - parseInt(getComputedStyle(pointer).width)/2 + "px";
            pointer.style.left = e.offsetX - parseInt(getComputedStyle(pointer).height)/2 + "px";
        }
        this._listenerManager.addListener(this._canvas, "mousemove", this._pointerFunc)

        this._listenerManager.addListener(this._canvas, "mouseleave", (params) => {
            this._pointerElem.style.display="none";
        })
    }
    removePointer(){
        this._listenerManager.removeListener(this._canvas, "mousemove", this._pointerFunc);
        this._pointerElem.style.display = "none";
    }
    setColor(color){
        this._pointerElem.style.backgroundColor=color;
    }
    getPointer(){
        return this._pointerElem;
    }
    updateWidth(width){
        this._pointerElem.style.width = width+"px";
        this._pointerElem.style.height = width+"px";
    }
}