export default class Tool{
    constructor(canvas, ctx, paint){
        this._paint= paint;
        this._canvas = canvas;
        this._ctx = ctx;
    }
    create(){
    }
    destroy(){
    }
    setLayout(canvas, ctx){
        this._canvas=canvas;
        this._ctx = ctx;
    }
}