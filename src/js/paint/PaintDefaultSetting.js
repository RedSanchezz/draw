

export function defaultSetting(canvas, ctx, paint){
    let style=getComputedStyle(document.querySelector(".canvas-block"));

    setCanvas(ctx);


    canvas.setAttribute("height", style.height);
    canvas.setAttribute("width", style.width);


    defaultBrush(ctx);
}
function defaultBrush(ctx){
    ctx.fillStyle="red";
    ctx.strokeStyle = "red";
    //стили линий
    ctx.lineWidth = "40";
    ctx.lineCap = "round"; // определяет концы линий
    ctx.lineJoin = "round"; // как будут сходитться линии
}
async function setCanvas(ctx){
    let indexedDB = new IndexedDB();
    await indexedDB.open("canvasDB", 2);
    let imageData= await indexedDB.getByKey("imageData", "canvasDB");
    if(imageData){
        ctx.putImageData(imageData.imageData, 0, 0);
    }
}
async function getBrushSetting(){
    
}