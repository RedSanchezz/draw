import ListenerManager from "../paint/ListenerManager/ListenerManager";
import LayoutPanel from "./LayoutPanel/LayoutPanel";

export default class InterfaceManager{
    
    constructor(toolManager, paint){
        this._listenerManager= new ListenerManager(new Array());
        this._toolManager = toolManager;
        this._paint=paint;
    }
    //Настройки для панели управления кистью
    setBrushPanel(brush){
        this._toolManager.getTool();
        
        let testBtn = document.getElementById("test-btn");
        testBtn.addEventListener("click", ()=>{
            let layoutManager = this._paint.getLayoutManager();
            layoutManager.getCurrentLayout().back();
        });

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
    //настройки не зависящие от инструмента
    defaultSetting(layoutManager){
        //меню управления иснтрументами
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


        //Убираем масштабируемость
        window.addEventListener("resize", function(e){
            e.preventDefault();
            return false;
        }, {passive: false});


        //brush
        let brushBtn = document.getElementById("sketch-brush");
        brushBtn.addEventListener("click", (e)=>{
            this._toolManager.setTool("scetchBrush");
        });

        let eraserBtn = document.getElementById("eraser1");
        eraserBtn.addEventListener("click", (e)=>{
            this._toolManager.setTool("eraser");
        });

        let brushNoOverlay = document.getElementById("brush-without-overlay");
        brushNoOverlay.addEventListener("click", (e) => {
            this._toolManager.setTool("brushWithoutOverlay");
        });

        let layoutBtn = document.getElementById("open-layout-btn");

        let layoutPanel = new LayoutPanel(this._paint);

        layoutBtn.addEventListener("click", (e) => {
            layoutPanel.toggle();
        });

        let register = [];
        window.addEventListener("keyup", (e) => {
            if(register.includes(e.code)) {
                register.splice(register.indexOf(e.code), 1);
            }
        });
        window.addEventListener("keydown", (e) => {
            if(!register.includes(e.code)) register.push(e.code);
            if(register.includes("KeyZ") && e.ctrlKey){
                layoutManager.getCurrentLayout().back();
                register.splice(register.indexOf("KeyZ"), 1);
            }
        });


        

    }


}