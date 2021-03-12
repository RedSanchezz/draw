import ListenerManager from "../paint/ListenerManager/ListenerManager";

export default class InterfaceManager{
    
    constructor(toolManager, paint){
        this._listenerManager= new ListenerManager(new Array());
        this._toolManager = toolManager;
        this._paint=paint;
    }
    setBrushPanel(brush){
        this._toolManager.getBrush();
        let testBtn = document.getElementById("test-btn");
        testBtn.addEventListener("click", function(){
            brush.destroy();
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
            console.log(brushAlphaInp.value);
            console.log("INPUT");
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
    defaultSetting(layoutManager){
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
        let layoutPanel = document.querySelector(".top-panel__layout-panel");
        layoutBtn.addEventListener("click", (e) => {
            this.updateLayoutPanel(layoutManager);
            if(layoutPanel.classList.contains("open")){
                layoutPanel.classList.remove("open");
            }
            else{
                layoutPanel.classList.add("open");
            }
        });
        let layoutBtnAdd = document.querySelector(".layout-panel-add");
        layoutBtnAdd.addEventListener("click", (e) => {
            let canvas = this._paint.getCanvas();
            layoutManager.addLayout(this._paint.getContext().getImageData(0, 0, canvas.width, canvas.height));
            this.updateLayoutPanel(layoutManager);
        });

        setInterval(() => {
            this.updateLayoutPanel(layoutManager);
        }, 1000);
    }

    updateLayoutPanel(layoutManager){
        let layoutList =layoutManager.getLayoutList();
        let layoutPanel = document.querySelector(".layout-panel__content");
        
        console.log("Обновляется !");

        let layoutBlock=document.createElement("div");
        layoutBlock.classList.add("layout-panel__content-block");

        layoutPanel.innerHTML = "";

        let canvas = document.createElement("canvas");
        
        let ctx= canvas.getContext("2d");
        
        for(let i=0; i< layoutList.length; i++){
            canvas.height = layoutList[i].height;
            canvas.width = layoutList[i].width;

            
            let layoutBlock=document.createElement("div");
            layoutBlock.classList.add("layout-panel__content-block");


            let img = document.createElement("img");
            img.style.height = "100px";
            img.style.width = "200px";

            ctx.putImageData(layoutList[i], 0, 0);
            console.log(layoutList[i]);

            let src=canvas.toDataURL("image/png", 0.5);
            img.setAttribute("src", src);
            img.style.cursor = "pointer";

            img.addEventListener("click", function(){
                alert("clicked!");
            });


            layoutBlock.append(img);
            layoutPanel.append(layoutBlock);
        }
    }
}