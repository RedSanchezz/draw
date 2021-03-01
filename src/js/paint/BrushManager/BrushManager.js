import PointerManager from "../ToolManager/PointerManager/PointerManager";

//класс определяет свойства кисти
export default class BrushManager{
    constructor(canvas, ctx){
        this._canvas=canvas;
        this._ctx = ctx;
        this._pointerManager= new PointerManager(this._canvas, this._ctx);
    }

    setLineWidth(width){
        this._ctx.lineWidth=width;
        this._pointerManager.updateWidth(width);
    }
    getLineWidth(){
        return this._ctx.lineWidth;
    }

    setLineCap(lineCap){
        this._pointerManager.setLineWidth
        this._ctx.lineCap = lineCap;
    }

    getLineCap(){
        return this._ctx.lineCap;
    }

    setColor(color){
        this._ctx.fillStyle=color;
        this._ctx.strokeStyle=color;
        this._pointerManager.setColor(color);
    }


    setPointer(){
        this._pointerManager.setBrushPointer();
    }

    removePointer(){
        this._pointerManager.removePointer();
    }
}