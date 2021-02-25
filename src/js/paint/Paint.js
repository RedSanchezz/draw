
export default class Paint{

    constructor(){
        this._canvas = document.getElementById("canvas");
        this._context = this._canvas.getContext("2d");
        this._context.fillStyle = "red";
        this._context.fillRect(10, 10, 50, 50);
    }
}