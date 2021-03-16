export default class LayoutMenu{
    constructor(paint, target){
        this._paint= paint;
        this._target = target;
    }

    create(x, y){
        let allMenu = document.querySelectorAll(".selected-menu") || [];
        for (const it of allMenu) {
            it.remove();
        }

        let menu = document.createElement("div");
        menu.classList.add("selected-menu");
        menu.style.top=y-15+ "px";
        menu.style.left=x-15 + "px";

        let menuItemCust = document.createElement("div");
        menuItemCust.classList.add("selected-menu__item");
        menuItemCust.textContent = "Настройки";
        menuItemCust.addEventListener("click", (e) => {
            alert("Clicked !");
        });

        let menuItemComb = document.createElement("div");
        menuItemComb.classList.add("selected-menu__item");
        menuItemComb.textContent = "Обьеденить";
        menuItemComb.addEventListener("click", (e) => {
            alert("Clicked !");
        });

        let menuItemDel = document.createElement("div");
        menuItemDel.classList.add("selected-menu__item");
        menuItemDel.textContent = "Удалить";
        menuItemDel.addEventListener("click", (e) => {
            alert("Удалить !");
            this._delete();
        });

        menu.append(menuItemCust);
        menu.append(menuItemComb);
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
        console.log("__________________________________________");
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
    
}