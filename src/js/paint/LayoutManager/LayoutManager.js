//Класс для управления слоями
export default class LayoutManager{
    constructor(canvas, ctx){
        this._canvas = canvas;
        this._ctx = ctx;
        this._layoutList=[];
        this._init();
        //колбэк для управления слоями из оболочки
        this._callback=null;
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
    update(){
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        for(let i=0; i< this._layoutList.length; i++){
            if(this._layoutList[i].show) this._ctx.drawImage(this._layoutList[i].canvas, 0, 0);
        }
        if(this._callback) this._callback();
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

        if(this._callback) this._callback();
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

        if(this._callback) this._callback();
    }
    getCurrentLayoutIndex(){
        return +this._currentLayoutIndex;
    }
    setCallback(func){
        this._callback=func;
    }
    
    toggleHide(index){
        index=+index;
        this._layoutList.forEach((value, i, array) => {
            if(i===index){
                if(array[i].show==false) {
                    array[i].show=true;
                }
                else {
                    array[i].show=false;
                }
            }
        });
        console.log(this._layoutList[index].show);
        this.update();
        if(this._callback) this._callback();
    }
}

/*
    show: true,
    canvas: canvas,
    ctx:ctx
*/
