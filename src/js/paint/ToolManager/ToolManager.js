
import SketchBrush from "./Brush/SketchBrush";
import LineBrush from "./Brush/LineBrush";


//класс для выбора инструмента рисования
export default class ToolManager{
    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx = ctx;
        this._canvasBlock = document.querySelector(".canvas-block");
        this._currentBrush = null;
    }
    setTool(tool){
        if(this._currentBrush) this._currentBrush.destroy();
        switch(tool){
            case "scetchBrush":{ 
                let brush = new SketchBrush(this._canvas, this._ctx);
                brush.create();
                this._currentBrush=brush;
                break;
            }
            default: {
                let brush = new SketchBrush(this._canvas, this._ctx);
                brush.create();
                this._currentBrush=brush;
                break;
            }
        }
    }
    getBrush(){
        return this._currentBrush;
    }
}

