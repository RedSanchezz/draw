import ListenerManager from "../paint/ListenerManager/ListenerManager";

export default class InterfaceManager{
    
    constructor(){
        this._listenerManager= new ListenerManager(new Array());

    }

    setBrushPanel(brush){
        //brush color
        let brushColorInp = document.getElementById("brush-color-inp");
        brushColorInp.value=brush.getColor();
        this._listenerManager.addListener(brushColorInp, 'input',  (e) => {
            brush.setColor(brushColorInp.value);
        });

        // brush size
        let brushSizeInp = document.getElementById("brush-size-inp");
        brushSizeInp.value=brush.getLineWidth();
        brushSizeInp.addEventListener("input", function(){
            brush.setLineWidth(brushSizeInp.value);
        });

        //прозрачность кисти
        let brushAlphaInp = document.getElementById("brush-alpha-inp");
        brushAlphaInp.value = brush.getAlpha();
        this._listenerManager.addListener(brushAlphaInp, "input", (e) => {
            brush.setAlpha(brushAlphaInp.value.replace(/,/, "."));
        });



        //нажимание клавиш
        let register = [];
        window.addEventListener("keyup", (e) => {
            if(register.includes(e.code)) {
                register.splice(register.indexOf(e.code), 1);

            }
        });
        window.addEventListener("keydown", (e) => {
            if(!register.includes(e.code))register.push(e.code);
        });

        //passive нужно что бы работало в хроме
        window.addEventListener("mousewheel", function(e){
            if(register.includes("ControlLeft")) {
                brushSizeInp.value=brushSizeInp.value-(e.wheelDeltaY>0 ? 20 : -20);
                if(brushSizeInp.value<0) brushSizeInp.value=0;


                brush.setLineWidth(brushSizeInp.value);
                e.preventDefault();
                return false;
            }
        },{ passive: false });
    }


    //настройки не зависящие от canvas
    defaultSetting(){
        let instrumentBtn = document.getElementById("open-instruments-btn");
        let instrumentsPanel = document.querySelector(".top-panel__instruments");
        instrumentBtn.addEventListener("mouseenter", (e) => {
            instrumentsPanel.style.left="0px";
            let mouseEnter = false;
            let mouseLeaveFunc=function(e){
                instrumentsPanel.style.left="-200px";
                instrumentsPanel.removeEventListener("mouseenter", mouseEnterFunc);
            };
            let mouseEnterFunc = function(e){
                mouseEnter = true;
            };
            //если уводим указатель мыши - закрываем менюху и удаляем слушатель
            instrumentsPanel.addEventListener("mouseleave", mouseLeaveFunc, {once: true});
        
            // если курсор так и не появился спустя 2 секунды - закрываем меню
            instrumentsPanel.addEventListener("mouseenter", mouseEnterFunc, {once: true});
            setTimeout(() => {
                if(!mouseEnter) { 
                    mouseLeaveFunc();
                    instrumentsPanel.removeEventListener("mouseleave", mouseLeaveFunc);
                }
            }, 1000);
        });

        window.addEventListener("resize", function(e){
            e.preventDefault();
            return false;
        }, {passive: false});
    }
}