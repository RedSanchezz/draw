import ListenerManager from "../paint/ListenerManager/ListenerManager";

export default class Interface{
    
    constructor(){

    }

    setBrushPanel(brushManager){
        let brushColorInp = document.getElementById("brush-color-inp");
        let listenerManager= new ListenerManager(new Array());
        brushManager.setColor(brushColorInp.value);
        brushManager.setLineWidth(100);

        listenerManager.addListener(brushColorInp, 'input',  (e) => {
            brushManager.setColor(brushColorInp.value);
        });

        let testBtn=document.getElementById("test-btn");
        testBtn.addEventListener('click', (e) => {
            brushManager.removePointer();
        });
        //input brush size
        let brushSizeInp = document.getElementById("brush-size-inp");
        brushSizeInp.value=brushManager.getLineWidth();

        //изменение инпута
        brushSizeInp.addEventListener("input", function(){
            brushManager.setLineWidth(brushSizeInp.value);
        });


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
                console.log(e.wheelDeltaX);
                console.log(e.wheelDeltaY);
                brushSizeInp.value=brushSizeInp.value-e.wheelDeltaY*0.1;
                brushManager.setLineWidth(brushSizeInp.value);
                e.preventDefault();
                return false;
            }
        },{ passive: false });
    }
}