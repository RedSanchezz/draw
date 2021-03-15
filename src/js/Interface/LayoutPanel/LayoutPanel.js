export default class LayoutPanel{
    constructor(paint){
        //блок для изменения
        this._layoutPanelBlock = document.querySelector(".top-panel__layout-panel");
        this._paint = paint;
        this._toolManager = paint.getToolManager();
        this._intervalId=null;

        let layoutManager =this._paint.getLayoutManager();
        let layoutBtnAdd = document.querySelector(".layout-panel-add");
        layoutBtnAdd.addEventListener("click", (e) => {
            layoutManager.addLayout();
            layoutManager.setCurrentLayout(layoutManager.getCurrentLayoutIndex()+1, this._paint.getToolManager());
        });
    }
    //open/close
    toggle(){
        let layoutManager =this._paint.getLayoutManager();
        this.updateLayoutPanel();
        if(this._layoutPanelBlock.classList.contains("open")){
            this._layoutPanelBlock.classList.remove("open");
            layoutManager.setCallback(null);
        }
        else{
            this._layoutPanelBlock.classList.add("open");
            layoutManager.setCallback(() => {
                this.updateLayoutPanel();
            });

        }
    }
    addLayout(){
        let layoutManager =this._paint.getLayoutManager();
        layoutManager.addLayout();
        layoutManager.setCurrentLayout(layoutManager.getCurrentLayoutIndex()+1, this._paint.getToolManager());
        this.updateLayoutPanel();
    }
    updateLayoutPanel(){
        let layoutManager = this._paint.getLayoutManager();
        let contentPanel = document.querySelector(".layout-panel__content");
        contentPanel.innerHTML="";
        let imgList=layoutManager.getImageList();

        let currentLayoutIndex=layoutManager.getCurrentLayoutIndex();
        console.log(currentLayoutIndex);
        for(let i=0; i< imgList.length; i++){
            let content =document.createElement("div");
            content.classList.add("layout-panel__content-block");
            if(currentLayoutIndex==i) content.classList.add("active");

            let img = imgList[i];
            img.classList.add("layout-panel__content-img");
        
            let index=img.getAttribute("data-index");
            content.setAttribute("data-index", index);

            img.addEventListener("click", () => {
                layoutManager.setCurrentLayout(index, this._toolManager);
            });


            let buttons = document.createElement("div");
            buttons.classList.add("layout-panel__content-buttons");
            
            let delBtn = document.createElement("div");
            delBtn.classList.add("layout__btn");
            buttons.append(delBtn);

            let downBtn = document.createElement("div");
            downBtn.classList.add("layout__btn");
            buttons.append(downBtn);

            let upBtn = document.createElement("div");
            upBtn.classList.add("layout__btn");
            buttons.append(upBtn);

            let showBtn = document.createElement("div");
            showBtn.classList.add("layout__btn");
            buttons.append(showBtn);
            showBtn.addEventListener("click", (e) => {
                layoutManager.toggleHide(index);
                console.log("hide");
            });
            

            content.append(buttons);
            content.append(img);
            contentPanel.append(content);
        }
    }
    
}