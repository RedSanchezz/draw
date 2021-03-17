import Layout from "./Layout";

//Класс для управления слоями
export default class LayoutManager{
    constructor(canvas, ctx, paint){
        this._canvas = canvas;
        this._ctx = ctx;
        this._layoutList=[];
        this._init();

        //колбэк для управления слоями из оболочки
        this._callback=null;
        this._paint= paint;
    }
    _init(){
        let defCanvas = document.createElement("canvas");
        defCanvas.width=this._canvas.width;
        defCanvas.height=this._canvas.height;
        let defCtx = defCanvas.getContext("2d");
        defCtx.putImageData(this._ctx.createImageData( this._canvas.width, this._canvas.height),0,0);
        

        let layout = new Layout(defCanvas, defCtx, true, this);
        this._layoutList.push(layout);
        this._currentLayoutIndex =0;  //выбранный слой
        this._currentLayout = this._layoutList[0];
        
    }
    //обновляем канвас, из всех слоев
    update(){
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        for(let i=0; i< this._layoutList.length; i++){
            if(!this._layoutList[i].isHidden()) this._ctx.drawImage(this._layoutList[i].getCanvas(), 0, 0);
        }

        if(this._callback) this._callback();
    }
    //Добавляем новый пустой слой
    addLayout(){
        let canvas = document.createElement("canvas");
        canvas.width = this._canvas.width;
        canvas.height=this._canvas.height;
        let context = canvas.getContext("2d");
        let layout= new Layout(canvas, context, true, this);

        this._layoutList.push(layout);

        if(this._callback) this._callback();
    }
    //получаем список картинок из слоев
    getImageList(){
        console.log("imagelist"+this._layoutList.length);
        let imageList =[];
        for(let i=0; i< this._layoutList.length; i++){

            let img = document.createElement("img");
            let src=this._layoutList[i].getCanvas().toDataURL();

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

    setCurrentLayout(number){

        let toolManager = this._paint.getToolManager();

        this._currentLayout = this._layoutList[number];
        this._currentLayoutIndex = number;

        let tool=toolManager.getTool();
        console.log(this._currentLayout);
        console.log(this._currentLayoutIndex);
        console.log(this._layoutList);
        
        tool.setLayout(this._currentLayout.getCanvas(), this._currentLayout.getContext());

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
        this._layoutList[index].toggleHide();

        this.update();
        if(this._callback) this._callback();
    }
    deleteLayout(index){
        //если остался 1 слой, то просто очищаем его
        if(this._layoutList.length<=1){
            this._currentLayout.clear();
            this.update();
            if(this._callback) this._callback();
            return;
        }
        //Если элемент который надо удалить находится выше нужного
        if(this._currentLayoutIndex>index){
            this.setCurrentLayout(this._currentLayoutIndex-1);
        }
        this._layoutList.splice(index,1);
        this.setCurrentLayout(this._currentLayoutIndex);
        this.update();
        if(this._callback) this._callback();
    }

    deleteLayouts(indexArray){
        if(this._layoutList.length<=1){
            this._currentLayout.clear();
            this.update();
            if(this._callback) this._callback();
            return;
        }
        this._layoutList= this._layoutList.filter((value, index, array) => {
            return !indexArray.includes(index);
        });
        console.log(this._layoutList);
        if(this._layoutList.length==0){
            console.log("Нулевая длинна");
            this.addLayout();
            this.setCurrentLayout(0);
        }
        else{
            //если индекс больше допустимого
            if(this._currentLayoutIndex >= this._layoutList.length-1){
                this.setCurrentLayout(this._layoutList.length-1);
                console.log(this._layoutList);
                console.log("Больше чем нужно");
            }
            else{
                this.setCurrentLayout(this._currentLayoutIndex);
                console.log("Норм");
            }
        }
        console.log(this._layoutList);
        this.update();
        console.log(this._layoutList);
        if(this._callback) this._callback();
    }
    swap(index1, index2){
        if(index1<0 || index1 > this._layoutList.length-1 || index2<0 || index2 > this._layoutList.length-1) {
            return;
        }

        let help = this._layoutList[index1];
        this._layoutList[index1]=this._layoutList[index2];
        this._layoutList[index2]=help;

        if(index1==this._currentLayoutIndex){
            this.setCurrentLayout(index2);
        }
        else if(index2==this._currentLayoutIndex){
            this.setCurrentLayout(index1);
        } else {
            this.setCurrentLayout(this._currentLayoutIndex);
        }

        this.update();
        if(this._callback) this._callback();
    }



    combine(index1, index2){

    }
    isHidden(index){
        return this._layoutList[index].isHidden();
    }
    getLayoutList(){
        return this._layoutList;
    }
    setLayout(layout, index){
        this._layoutList[index]=layout;
        this.update();
    }
}

/*
    show: true,
    canvas: canvas,
    ctx:ctx
*/
