
import Interface from './interface/interface';
import Paint from './paint/Paint';
import {} from "./topPanelInterface";

let paint = new Paint();
let interfaceManager= new Interface();
let brushManager= paint.getToolManager().getBrushManager();

interfaceManager.setBrushPanel(brushManager);