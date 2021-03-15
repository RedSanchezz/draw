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
        console.log("Обновляется");
        let layoutManager = this._paint.getLayoutManager();
        let contentPanel = document.querySelector(".layout-panel__content");
        contentPanel.innerHTML="";
        let imgList=layoutManager.getImageList();

        let currentLayoutIndex=layoutManager.getCurrentLayoutIndex();
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

            let buttons=this._addLayoutBtn(i, index);

            
            content.addEventListener("click", (e) => {
                if(e.ctrlKey){
                    if(content.classList.contains("selected")){
                        content.classList.remove("selected");
                    }
                    else{
                        content.classList.add("selected");
                    }
                    e.stopPropagation();
                }
            }, {capture: true});


            window.addEventListener("keydown", (e) => {
                if(e.code=="ControlLeft"){
                    content.style.cursor = "pointer";
                }
            });
            window.addEventListener("keyup", (e) => {
                if(e.code=="ControlLeft"){
                    content.style.cursor = "default";
                }
            });

            content.addEventListener("contextmenu", (e) => {
                this._createLayoutMenu(e.clientY, e.clientX, contentPanel);
                e.preventDefault();
            });

            content.append(buttons);
            content.append(img);
            contentPanel.append(content);
        }
    }




    _createLayoutMenu(y, x, contentPanel){
        let menu = document.createElement("div");
        menu.classList.add("selectedMenu");
        menu.style.top=y-15+ "px";
        menu.style.left=x-15 + "px";
    
        let selectedMenuItemComb = document.createElement("div");
        selectedMenuItemComb.classList.add("selectedMenuItem");
        selectedMenuItemComb.textContent = "Обьеденить";
        selectedMenuItemComb.addEventListener("click", (e) => {
            
        });


        menu.append(selectedMenuItemComb);
    
        menu.addEventListener("mouseleave", (e) => {
            menu.remove();
        });
        document.body.append(menu);
    }



    _addLayoutBtn(i, index){
        let layoutManager = this._paint.getLayoutManager();
    
        let buttons = document.createElement("div");
        buttons.classList.add("layout-panel__content-buttons");
        
        let delBtn = document.createElement("div");
        delBtn.classList.add("layout__btn");
        delBtn.classList.add("layout__btn-del");
        delBtn.addEventListener("click", (e) => {
            if(confirm("Удалить выбранный слой ? ")){
                layoutManager.deleteLayout(i);
            }
        });
        buttons.append(delBtn);
    
        let upBtn = document.createElement("div");
        upBtn.classList.add("layout__btn");
        upBtn.classList.add("layout__btn-up");
        buttons.append(upBtn);
    
        upBtn.addEventListener("click", (e) => {
            layoutManager.swap(i, i-1);
        });
    
    
        let downBtn = document.createElement("div");
        downBtn.classList.add("layout__btn");
        downBtn.classList.add("layout__btn-down");
        buttons.append(downBtn);
        downBtn.addEventListener("click", (e) => {
            layoutManager.swap(i, i+1);
        });
    
        let showBtn = document.createElement("div");
        showBtn.classList.add("layout__btn");
        showBtn.classList.add("layout__btn-show");

        //С учетеом, что с сокрытием слоя все будет обновляться
        if(layoutManager.isHidden(index)){
            showBtn.classList.add("layout__btn-hidden");
        }

        showBtn.addEventListener("click", (e) => {
            layoutManager.toggleHide(index);
        });
        buttons.append(showBtn);
        return buttons;
    }
}



