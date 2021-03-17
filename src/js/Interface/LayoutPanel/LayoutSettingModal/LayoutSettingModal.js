export default class LayoutSettingModal{
    constructor(paint, targetLayout){
        this._paint=paint;
        this._targetLayout = targetLayout;
    }
    create(){
        console.log("Create !");
        
        let modal=document.createElement("div");
        this._modal= modal;
        modal.classList.add("layout-modal");
        modal.classList.add("layout-modal-hidden");
        modal.addEventListener("click", (e) => {
            this.remove(); 
            e.stopPropagation();
        });

        let modalInner =document.createElement("div");
        modalInner.classList.add("layout-modal__inner");
        modalInner.addEventListener("click", (e) => {
            e.stopPropagation();
        });
        let modalHeader = document.createElement("div");
        modalHeader.classList.add("layout-modal__header");

        let title= document.createElement("div");
        title.innerText="Настройки слоя";
        title.classList.add("layout-modal__title");
        modalHeader.append(title);


        let close = document.createElement("div");
        close.classList.add("layout-modal__close");
        close.addEventListener("click", (e) => {
            this.remove();
        });
        modalHeader.append(close);


        modalInner.append(modalHeader);

        modal.append(modalInner);
        document.body.append(modal);

        this._show(modal);
    }
    remove(){
        this._hide();
        setTimeout(() => {
            this._modal.remove();
        }, 500);
    }
    _show(){
        setTimeout(() => {
            this._modal.classList.remove("layout-modal-hidden");
        }, 0);
    }
    _hide(){
        this._modal.classList.add("layout-modal-hidden");
    }

    _addAlphaInput(){
        let input = documen.createElement("input");
        input.setAttribute("type", "number");
        input.setAttribute("max", "1");
        input.setAttribute("min", "0");
        input.setAttribute("step", "0.1");
        
    }   
}