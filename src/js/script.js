
import InterfaceManager from './Interface/InterfaceManager';
import Paint from './paint/Paint';

let paint = new Paint();
let interfaceManager= new InterfaceManager();
interfaceManager.defaultSetting();
let brushManager= paint.getToolManager().getBrushManager();

interfaceManager.setBrushPanel(brushManager);
