export default class LayoutPanel{
    constructor(paint){
        //блок для изменения
        this._layoutPanelBlock = document.querySelector(".top-panel__layout-panel");
        this._paint = paint;
        this._toolManager = paint.getToolManager();
        this._intervalId=null;
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
        for(let i=0; i< imgList.length; i++){
            let content =document.createElement("div");
            content.classList.add("layout-panel__content-block");
            let img = imgList[i];
            img.style.height="200px";
            img.style.width = "auto";
            img.style.maxWidth="100%";
            img.style.cursor = "pointer";
            img.addEventListener("click", () => {
                let index=img.getAttribute("data-index");
                layoutManager.setCurrentLayout(index, this._toolManager);
            });
            content.append(img);
            contentPanel.append(content);
        }
    }
}