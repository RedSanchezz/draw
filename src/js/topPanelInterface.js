let instrumentBtn = document.getElementById("open-instruments-btn");
let instrumentsPanel = document.querySelector(".top-panel__instruments");


instrumentBtn.addEventListener("mouseenter", (e) => {
    instrumentsPanel.style.left="0px";
    let mouseEnter = false;
    let mouseLeaveFunc=function(e){
        instrumentsPanel.style.left="-200px";
        instrumentsPanel.removeEventListener("mouseenter", mouseEnterFunc);
    };
    let mouseEnterFunc = function(e){
        mouseEnter = true;
    };
    //если уводим указатель мыши - закрываем менюху и удаляем слушатель
    instrumentsPanel.addEventListener("mouseleave", mouseLeaveFunc, {once: true});

    // если курсор так и не появился спустя 2 секунды - закрываем меню
    instrumentsPanel.addEventListener("mouseenter", mouseEnterFunc, {once: true});
    setTimeout(() => {
        if(!mouseEnter) { 
            mouseLeaveFunc();
            instrumentsPanel.removeEventListener("mouseleave", mouseLeaveFunc);
        }
    }, 1000);
});
