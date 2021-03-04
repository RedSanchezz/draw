
import InterfaceManager from './Interface/InterfaceManager';
import Paint from './paint/Paint';

let paint = new Paint();
let toolManager= paint.getToolManager();
let interfaceManager= new InterfaceManager(toolManager);


interfaceManager.defaultSetting();


interfaceManager.setBrushPanel(toolManager.getBrush());
