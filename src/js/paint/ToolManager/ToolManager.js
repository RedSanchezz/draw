import BrushManager from "./BrushManager/BrushManager";
import SketchBrush from "./Brush/SketchBrush";
import LineBrush from "./Brush/LineBrush";


//класс для выбора инструмента рисования
export default class ToolManager{

    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx = ctx;
        this._canvasBlock = document.querySelector(".canvas-block");
        this._brushManager = new BrushManager(this._canvas, this._ctx);
    }
    setTool(tool){
        switch(tool){
            case "brush":{ 
                this.setBrush();
                break;
            }
        }
    }
    setBrush(){
        let brush = new LineBrush(this._canvas, this._ctx);
        brush.create();
    }
    setBrush2(){
        let brush = new SketchBrush(this._canvas, this._ctx);
        brush.create();
    }
    getBrushManager(){
        return this._brushManager;
    }
}

