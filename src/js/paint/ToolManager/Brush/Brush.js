import ListenerManager from "../../ListenerManager/ListenerManager";

export default class Brush {
    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx = ctx;
        this._canvasBlock = document.querySelector(".canvas-block");
        this._listenerManager= new ListenerManager(new Array());
    }
}