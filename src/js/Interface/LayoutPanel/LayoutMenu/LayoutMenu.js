import Layout from "../../../paint/LayoutManager/Layout";
import LayoutSettingModal from "../LayoutSettingModal/LayoutSettingModal";

export default class LayoutMenu{
    constructor(paint, target){
        this._paint= paint;
        this._target = target;
    }
    create(x, y){
        //проверяем есть ли другие меню
        let allMenu = document.querySelectorAll(".selected-menu") || [];
        for (const it of allMenu) {
            it.remove();
        }

        let menu = document.createElement("div");
        this._menu=menu;
        menu.classList.add("selected-menu");
        menu.style.top=y-15+ "px";
        menu.style.left=x-15 + "px";

        let menuItemCust = document.createElement("div");
        menuItemCust.classList.add("selected-menu__item");
        menuItemCust.textContent = "Настройки";

        menuItemCust.addEventListener("click", (e) => {
            this._setting();
            this.removeFast();
        });

        let menuItemComb = document.createElement("div");
        menuItemComb.classList.add("selected-menu__item");
        menuItemComb.textContent = "Обьеденить";
        menuItemComb.addEventListener("click", (e) => {
            this._combine();
            this.removeFast();
        });

        let menuItemCopy = document.createElement("div");
        menuItemCopy.classList.add("selected-menu__item");
        menuItemCopy.textContent = "Копировать";
        menuItemCopy.addEventListener("click", (e) => {
            this._copy();
            this.removeFast();
        });

        let menuItemDel = document.createElement("div");
        menuItemDel.classList.add("selected-menu__item");
        menuItemDel.textContent = "Удалить";
        menuItemDel.addEventListener("click", (e) => {
            if(confirm("Удалить выделенные слои ? ")){
                this._delete();
            }
            this.removeFast();
        });

        menu.append(menuItemCust);
        menu.append(menuItemComb);
        menu.append(menuItemCopy);
        menu.append(menuItemDel);
        menu.addEventListener("mouseleave", (e) => {
            this.remove(menu);
        });
        document.body.append(menu);
    }

    remove(menu){
        menu.classList.add("selected-menu-hide");
        let id=setTimeout(() => {
            menu.remove();
        }, 500);
        menu.addEventListener("mousemove", (e) => {
            menu.classList.remove("selected-menu-hide");
            clearTimeout(id);
        });
    }

    _delete(){
        let layoutPanelBlock = document.querySelector(".layout-panel__content");
        let selected = layoutPanelBlock.querySelectorAll(".selected");
        console.log(selected);
        if(selected.length>1) {
            let indexArr = Array.from(selected).map((value, index, array) => +value.getAttribute("data-index"));
            console.log(indexArr);
            this._paint.getLayoutManager().deleteLayouts(indexArr);
        }else {
            let index = this._target.getAttribute("data-index");
            this._paint.getLayoutManager().deleteLayout(index);
        }
    }

    _combine(){
        if(confirm("Обьеденить выбранные слои ?"))
        {
        //ищем выделенные элементы
            let layoutPanelBlock = document.querySelector(".layout-panel__content");
            let selected = layoutPanelBlock.querySelectorAll(".selected");
            if(selected.length<2) {
                alert("Выберите хотя бы 2 слоя !");
                return;
            }
            //получаем индексы выделенных элементов
            let indexArr = Array.from(selected).map((value, index, array) => +value.getAttribute("data-index"));

            let min = Math.min(...indexArr);
            alert(min);

            let layoutList=this._paint.getLayoutManager().getLayoutList();
            let canvas = document.createElement("canvas");
            canvas.height = this._paint.getCanvas().height;
            canvas.width = this._paint.getCanvas().width;
            let ctx= canvas.getContext("2d");

            layoutList.forEach((value, index, array) => {
                if(indexArr.includes(index)){
                    ctx.drawImage(value.getCanvas(), 0, 0);
                }
            });

            let layout = new Layout(canvas, ctx, true, this._paint.getLayoutManager());

            this._paint.getLayoutManager().setLayout(layout, min);
            console.log(indexArr);
            indexArr.splice(indexArr.indexOf(min), 1);
            console.log(indexArr);
            this._paint.getLayoutManager().deleteLayouts(indexArr);

            this._paint.getLayoutManager().setCurrentLayout(min);
        }
    }

    _setting(){
        let index = +this._target.getAttribute("data-index");
        let layout=this._paint.getLayoutManager().getLayoutList()[index];

        let settingModal = new LayoutSettingModal(this._paint, layout);
        settingModal.create();
    }
    
    _copy(){
        let index = +this._target.getAttribute("data-index");
        this._paint.getLayoutManager().copyLayout(index);
    }
    removeFast(){
        this._menu.remove();
    }
    
}