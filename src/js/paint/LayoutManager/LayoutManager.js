//Класс для управления слоями
export default class LayoutManager{
    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx = ctx;
        this._layoutList=[];
        this._init();

        
    }
    _init(){
        let defCanvas = document.createElement("canvas");
        defCanvas.width=this._canvas.width;
        defCanvas.height=this._canvas.height;
        let defCtx = defCanvas.getContext("2d");
        defCtx.putImageData(this._ctx.createImageData( this._canvas.width, this._canvas.height),0,0);
        
        let def = {
            show: true,
            canvas: defCanvas,
            ctx: defCtx
        }
        this._layoutList.push(def);
        this._currentLayoutIndex =0;//выбранный слой
        this._currentLayout = this._layoutList[0];
        
    }
    //обновляем канвас, из всех слоев
    updateCurrentLayout(imageData){
        console.log("Обновляю карент");
        console.log(imageData);
        this._layoutList[this._currentLayoutIndex].ctx.putImageData(imageData, 0, 0);
    }
    //Обновляем текущий выбраный слой. 
    update(){
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        for(let i=0; i< this._layoutList.length; i++){
            this._ctx.drawImage(this._layoutList[i].canvas, 0, 0);
        }
    }
    //Добавляем новый пустой слой
    addLayout(){
        let canvas = document.createElement("canvas");
        canvas.width = this._canvas.width;
        canvas.height=this._canvas.height;
        let context = canvas.getContext("2d");
        let obj= {
            show: true,
            canvas: canvas,
            ctx:context
        }
        this._layoutList.push(obj);
    }
    //получаем список картинок из слоев
    getImageList(){
        let imageList =[];
        for(let i=0; i< this._layoutList.length; i++){

            let img = document.createElement("img");
            let src=this._layoutList[i].canvas.toDataURL();

            img.setAttribute("src", src);
            img.setAttribute("data-index", i);
            imageList.push(img);
        }
        return imageList;
    }
    //Возвращает обьект 
    getCurrentLayout(){
        return this._currentLayout;
    }

    setCurrentLayout(number, toolManager){
        this._currentLayout = this._layoutList[number];
        this._currentLayoutIndex = number;
        let tool=toolManager.getTool();
        tool.setLayout(this._currentLayout.canvas, this._currentLayout.ctx);
        console.log(this._currentLayout);
    }
    getCurrentLayoutIndex(){
        return +this._currentLayoutIndex;
    }

}

/*
    Отображать: true,
    canvas: canvas,
    ctx:ctx
*/
