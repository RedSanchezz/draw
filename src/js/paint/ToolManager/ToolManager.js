
import SketchBrush from "./Brush/SketchBrush";

import Eraser from "./Eraser/Eraser";
import BrushWithoutOverlay from "./Brush/BrushWithoutOverlay";


//класс для выбора инструмента рисования
export default class ToolManager{
    constructor(canvas, ctx, paint){
        this._canvas = canvas;
        this._ctx = ctx;
        this._canvasBlock = document.querySelector(".canvas-block");
        this._currentTool = null;
        this._paint=paint;
    }
    setTool(tool){
        let layoutManager = this._paint.getLayoutManager();
        let obj = layoutManager.getCurrentLayout();

        if(this._currentTool) this._currentTool.destroy();
        switch(tool){
            case "scetchBrush":{ 
                let brush = new SketchBrush(obj.canvas, obj.ctx, this._paint);
                brush.create();
                this._currentTool=brush;
                break;
            }
            case "brushWithoutOverlay":{
                let brush = new BrushWithoutOverlay(obj.canvas, obj.ctx, this._paint);
                brush.create();
                this._currentTool=brush;
                break;
            }
            case "eraser":{
                let brush = new Eraser(obj.canvas, obj.ctx, this._paint);
                brush.create();
                this._currentTool=brush;
                break;
            }
            default: {
                let layoutManager = this._paint.getLayoutManager();
                let obj = layoutManager.getCurrentLayout();
                let brush = new SketchBrush(obj.canvas, obj.ctx, this._paint);
                brush.create();
                this._currentTool=brush;
                break;
            }
        }
    }
    getTool(){
        return this._currentTool;
    }
}

