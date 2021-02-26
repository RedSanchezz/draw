import {defaultSetting}from "./PaintDefaultSetting"

export default class Paint{

    constructor(){
        this._canvas = document.getElementById("canvas");
        this._ctx = this._canvas.getContext("2d");
        
        
        defaultSetting(this._canvas, this._ctx);
        // this._context.fillRect(10, 10, 50, 50);
        this._ctx.beginPath();
        this._ctx.moveTo(300, 500);
        this._ctx.lineTo(100, 100);
        this._ctx.stroke();
    }

    getContext(){
        return this._context;
    }
    getCavas(){
        return this._canvas;
    }

    //настройки кисти
    setLineWidth(width){
        this._ctx=width;
    }
    getLineWidth(){
        return this._ctx;
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