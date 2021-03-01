import BrushManager from './paint/ToolManager/BrushManager/BrushManager';
import ListenerManager from './paint/ListenerManager/ListenerManager';
import Paint from './paint/Paint';
import {} from "./topPanelInterface";

let paint = new Paint();
let listenerManager = new ListenerManager(new Array());
let brushManager= paint.getToolManager().getBrushManager();



//input brush color
let brushColorInp = document.getElementById("brush-color-inp");
brushManager.setColor(brushColorInp.value);
brushManager.setLineWidth(100);

listenerManager.addListener(brushColorInp, 'input',  (e) => {
    paint.getToolManager().getBrushManager().setColor(brushColorInp.value);
});

let testBtn=document.getElementById("test-btn");
testBtn.addEventListener('click', (params) => {
    brushManager.removePointer();
});

//input brush size
let brushSizeInp = document.getElementById("brush-size-inp");
console.log(brushManager.getLineCap());
brushSizeInp.value=brushManager.getLineWidth();

//изменение инпута
brushSizeInp.addEventListener("input", function(){
    brushManager.setLineWidth(brushSizeInp.value);
});

window.addEventListener("keydown", (e) => {
    console.log(e.code);//ControlLeft
})