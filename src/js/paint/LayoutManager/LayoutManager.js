//Класс для управления слоями
export default class LayoutManager{
    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx = ctx;
        this._layoutList=[];
        this._layoutList.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        this._currentLayout = 0;
    }
    addLayout(imageData){
        this._layoutList.push(imageData);
    }
    removeLayout(number){
    }
    setLayout(number, imageData){
        this._layoutList[number]=imageData;
    }
    updateLayout(imageData){
        console.log("update in layout manager");
        this._layoutList[this._currentLayout]=imageData;
    }
    getLayout(number){
        return this._layoutList[number];
    }
    getActualImageData(){
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        for(let i = this._layoutList.length-1; i>=0; i--){
            ctx.putImageData(this._layoutList[i], 0, 0);
        }
        return ctx.getImageData();
    }
    getLayoutList(){
        return this._layoutList;
    }

}