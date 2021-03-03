
import InterfaceManager from './Interface/InterfaceManager';
import Paint from './paint/Paint';

let paint = new Paint();
let interfaceManager= new InterfaceManager();

interfaceManager.defaultSetting();
let toolManager= paint.getToolManager();

interfaceManager.setBrushPanel(toolManager.getBrush());
