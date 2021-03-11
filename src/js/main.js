
import InterfaceManager from './Interface/InterfaceManager';
import Paint from './paint/Paint';

let paint = new Paint();
let toolManager= paint.getToolManager();
let interfaceManager= new InterfaceManager(toolManager);

let settingManager = paint.getSettingManager();
settingManager.loadCanvas();

interfaceManager.defaultSetting();
interfaceManager.setBrushPanel(toolManager.getBrush());




