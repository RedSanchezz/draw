import BrushManager from "../BrushManager/BrushManager";
import PointerManager from "./PointerManager/PointerManager";


//класс для выбора инструмента рисования
export default class ToolManager{

    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx = ctx;
        this._canvasBlock = document.querySelector(".canvas-block");
        this._listeners = [];
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
        
        new PointerManager(this._canvas, this._ctx).setBrushPointer();

        this.addListener(this._canvas, "mousedown", (e)=>{
            console.log(ctx);
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
            ctx.closePath();
            let x = e.offsetX;
            let y= e.offsetY;
            end=false;
            this.addListener(this._canvas, "mousemove", (e) => {
                drawLine(this._ctx, x, y, e.offsetX , e.offsetY);
                x=e.offsetX;
                y=e.offsetY;
            });
        });

        this.addListener(this._canvas, "mouseup", (e)=>{
            if(!end){
                this.removeListenersByEvent(this._canvas, "mousemove");
                end=true;
            }
        });

        this.addListener(this._canvasBlock, "mouseleave", (e)=>{
            if(!end){
                this.removeListenersByEvent(this._canvas, "mousemove");
                end=true;
            }
        });
    }

    //event listeners
    addListener(element, event, func){
        let obj = {
            element,
            event,
            func
        }
        this._listeners.push(obj);
        element.addEventListener(event, func);
    }
    removeLastListener(){
        let obj= this._listeners.pop();
        obj.element.removeEventListener(obj.event, obj.func);
    }
    removeListenersByEvent(element, event){
        for(let i=0; i< this._listeners.length; i++){
            if(this._listeners[i].event===event && this._listeners[i].element===element){
                let obj = this._listeners[i];
                obj.element.removeEventListener(obj.event, obj.func);
                this._listeners.splice(i, 1);
            }
        }
    }
    removeAllListener(){
        while(this._listeners.length!=0){
            let obj= this._listeners.pop();
            obj.element.removeEventListener(obj.event, obj.func);
        }
    }
}
function drawLine(ctx,x1, y1, x2, y2 ){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}