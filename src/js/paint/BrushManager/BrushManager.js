//класс определяет свойства кисти
export default class BrushManager{
    constructor(ctx){
        this._ctx = ctx;

    }

    setLineWidth(width){
        this._ctx.lineWidth=width;
    }
    getLineWidth(){
        return this._ctx.lineWidth;
    }

    setLineCap(lineCap){
        this._ctx.lineCap = lineCap;
    }

    getLineCap(){
        return this._ctx.lineCap;
    }

    setColor(color){
        this._ctx.fillStyle=color;
        this._ctx.strokeStyle=color;
    }

}