
import InterfaceManager from './Interface/InterfaceManager';
import Paint from './paint/Paint';

let paint = new Paint();
let toolManager= paint.getToolManager();
let interfaceManager= new InterfaceManager(toolManager, paint);

let settingManager = paint.getSettingManager();
settingManager.loadCanvas();

interfaceManager.defaultSetting(paint.getLayoutManager());
interfaceManager.setBrushPanel(toolManager.getTool());






