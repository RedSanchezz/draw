
import SketchBrush from "./Brush/SketchBrush";
import LineBrush from "./Brush/LineBrush";
import TestBrush from "./Brush/BrushWithoutOverlay";
import Eraser from "./Eraser/Eraser";
import BrushWithoutOverlay from "./Brush/BrushWithoutOverlay";


//класс для выбора инструмента рисования
export default class ToolManager{
    constructor(canvas, ctx, paint){
        this._canvas = canvas;
        this._ctx = ctx;
        this._canvasBlock = document.querySelector(".canvas-block");
        this._currentBrush = null;
        this._paint=paint;
    }
    setTool(tool){
        if(this._currentBrush) this._currentBrush.destroy();
        switch(tool){
            case "scetchBrush":{ 
                let brush = new SketchBrush(this._canvas, this._ctx, this._paint);
                brush.create();
                this._currentBrush=brush;
                break;
            }
            case "brushWithoutOverlay":{
                let brush = new BrushWithoutOverlay(this._canvas, this._ctx, this._paint);
                brush.create();
                this._currentBrush=brush;
                break;
            }
            case "eraser":{
                let brush = new Eraser(this._canvas, this._ctx, this._paint);
                brush.create();
                this._currentBrush=brush;
                break;
            }
            default: {
                let brush = new SketchBrush(this._canvas, this._ctx, this._paint);
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

