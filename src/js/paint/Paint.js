import {defaultSetting}from "./PaintDefaultSetting"
import SettingsManager from "./SettingsManager/SettingsManager";
import ToolManager from "./ToolManager/ToolManager";

export default class Paint{
    constructor(){
        this._canvas = document.getElementById("canvas");
        this._ctx = this._canvas.getContext("2d");
        defaultSetting(this._canvas, this._ctx, this);
        this._toolManager = new ToolManager(this._canvas, this._ctx);
        this._toolManager.setTool("sketchBrush");
        this._settingsManager = new SettingsManager(this._canvas, this._ctx);
    }
    getContext(){
        return this._context;
    }
    getCavas(){
        return this._canvas;
    }
    getToolManager(){
        return this._toolManager;
    }
    loadSetting(){
        defaultSetting(this._canvas, this._ctx, this);
    }
    getSettingManager(){
        return this._settingsManager;
    }
}