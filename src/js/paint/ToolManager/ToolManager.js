import BrushManager from "./BrushManager/BrushManager";
import ListenerManager from "../ListenerManager/ListenerManager";


//класс для выбора инструмента рисования
export default class ToolManager{

    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx = ctx;
        this._canvasBlock = document.querySelector(".canvas-block");
        this._listenerManager= new ListenerManager(new Array());
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
        let ctx = this._ctx;
        let end=false;
        this._brushManager.setPointer(1);

        this._brushManager.lineJoin = "bevel";

        
        this._listenerManager.addListener(this._canvas, "mousedown", (e)=>{
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx.closePath();
            let x = e.offsetX;
            let y= e.offsetY;
            end=false;
            this._listenerManager.addListener(this._canvas, "mousemove", (e) => {
                drawLine(this._ctx, x, y, e.offsetX , e.offsetY);
                x=e.offsetX;
                y=e.offsetY;
                
            });
        });

        this._listenerManager.addListener(document.body, "mouseup", (e)=>{
            if(!end){
                this._listenerManager.removeListenersByEvent(this._canvas, "mousemove");
                end=true;
            }
        });

        this._listenerManager.addListener(document.body, "mouseleave", (e)=>{
            if(!end){
                this._listenerManager.removeListenersByEvent(this._canvas, "mousemove");
                end=true;
            }
        });
    }
    getBrushManager(){
        return this._brushManager;
    }
}

function drawLine(ctx,x1, y1, x2, y2 ){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}