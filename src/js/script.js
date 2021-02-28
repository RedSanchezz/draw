import ListenerManager from './paint/ListenerManager/ListenerManager';
import Paint from './paint/Paint';


let paint = new Paint();
let listenerManager = new ListenerManager(new Array());
let brushManager= paint.getToolManager().getBrushManager();



let brushColorInp = document.getElementById("brush-color-inp");


brushManager.setColor(brushColorInp.value);
listenerManager.addListener(brushColorInp, 'input',  (e) => {
    paint.getToolManager().getBrushManager().setColor(brushColorInp.value);
});

let testBtn=document.getElementById("test-btn");
testBtn.addEventListener('click', (params) => {
    brushManager.removePointer();
});