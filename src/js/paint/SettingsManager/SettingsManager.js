import DBHelper from "./DBHelper";


//класс для работы с базой данных
//Установка / получение разных настроек
export default class SettingsManager{
    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx=ctx;
        this._dbHelper = new DBHelper();
        
    }
    defaultSetting(){
        let style=getComputedStyle(document.querySelector(".canvas-block"));

        this._canvas.setAttribute("height", style.height);
        this._canvas.setAttribute("width", style.width);

        this._ctx.fillStyle="red";
        this._ctx.strokeStyle = "red";
        this._ctx.lineWidth = "40";
        this._ctx.lineCap = "round"; // определяет концы линий
        this._ctx.lineJoin = "round"; // как будут сходитться линии
    }
    async saveCanvas(){
        await this._dbHelper.open("canvasDB", 2);
        await this._dbHelper.save("canvasDB", {
            id: "imageData",
            imageData: this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height)
        });
    }
    async loadCanvas(){
        await this._dbHelper.open("canvasDB", 2);
        let imageData= await this._dbHelper.getByKey("imageData", "canvasDB");
        if(imageData){
            this._ctx.putImageData(imageData.imageData, 0, 0);
        }
    }
}