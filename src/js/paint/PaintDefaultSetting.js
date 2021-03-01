export function defaultSetting(canvas, ctx){
    let style=getComputedStyle(document.querySelector(".canvas-block"));
    canvas.setAttribute("height", style.height);
    canvas.setAttribute("width", style.width);
    defaultBranch(ctx);
}
function defaultBranch(ctx){
    ctx.fillStyle="red";
    ctx.strokeStyle = "red";
    //стили линий
    
    ctx.lineWidth = "40";
    ctx.lineCap = "round"; // определяет концы линий
    ctx.lineJoin = "round"; // как будут сходитться линии
}