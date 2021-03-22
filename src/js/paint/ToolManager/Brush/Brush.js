import ListenerManager from "../../ListenerManager/ListenerManager";
import ColorHelper from "../../../utils/ColorHelper";
import Tool from "../Tool";
import SettingsManager from "../../SettingsManager/SettingsManager";

//Базовый класс для кисти
export default class Brush extends Tool {
    constructor(canvas, ctx, paint){
        super(canvas, ctx, paint);
        this._canvasBlock = document.querySelector(".canvas-block");
        this._listenerManager= new ListenerManager(new Array());
        this._alpha=1;
        this._settingManager = paint.getSettingManager();
        this._layoutManager = paint.getLayoutManager();
    }
    //устанавливаем стиль концов нарисованной линии
    getLineCap(){
        return this._ctx.lineCap;
    }
    setColor(color){
        let ctx = this._paint.getContext();
        console.log(color);
        if(this._alpha) color=ColorHelper.toRgba(color, this._alpha);
        ctx.fillStyle=color;
        ctx.strokeStyle=color;
    }
    getColor(){
        let ctx = this._paint.getContext();
        return ctx.strokeStyle;
    }
    //Задаем прозрачность кисти
    setAlpha(alpha){
        alpha = Math.floor(alpha*100)/100;
        console.log("alpha:"+alpha);
        this._alpha=alpha;
        this.setColor(this.getColor());
    }
    getAlpha(){
        return this._alpha;
    }
    //ширина линии
    setLineWidth(width){
        let ctx = this._paint.getContext();
        ctx.lineWidth=width;
    }
    getLineWidth(width){
        let ctx = this._paint.getContext();
        return ctx.lineWidth;
    }

}
