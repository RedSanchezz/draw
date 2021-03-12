import LayoutManager from "./LayoutManager/LayoutManager";
import SettingsManager from "./SettingsManager/SettingsManager";
import ToolManager from "./ToolManager/ToolManager";

export default class Paint{
    constructor(){
        this._canvas = document.getElementById("canvas");
        this._ctx = this._canvas.getContext("2d");
        this._toolManager = new ToolManager(this._canvas, this._ctx, this);

        this._settingsManager = new SettingsManager(this._canvas, this._ctx);
        this._settingsManager.defaultSetting();
        this._layoutManager = new LayoutManager(this._canvas, this._ctx);

        this._toolManager.setTool("sketchBrush");
    }
    getContext(){
        return this._ctx;
    }
    getCanvas(){
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
    getLayoutManager(){
        return this._layoutManager;
    }
}