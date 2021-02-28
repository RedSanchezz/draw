import {defaultSetting}from "./PaintDefaultSetting"
import BrushManager from "./BrushManager/BrushManager"
import ToolManager from "./ToolManager/ToolManager";

export default class Paint{

    constructor(){
        this._canvas = document.getElementById("canvas");
        this._ctx = this._canvas.getContext("2d");
        
        defaultSetting(this._canvas, this._ctx);

        this._toolManager = new ToolManager(this._canvas, this._ctx);
        this._toolManager.setBrush();
    }

    getContext(){
        return this._context;
    }
    getCavas(){
        return this._canvas;
    }

    getBrushManager(){
        return new BrushManager(this._ctx);
    }
    //настройки кисти

}