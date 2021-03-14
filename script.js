const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("paint_size");
const fill = document.getElementById("control_fill");
const clear = document.getElementById("control_clear");
const save = document.getElementById("control_save");
const colors = document.getElementsByClassName("color");

const init_color = "#2c2c2c";
canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width, canvas.height);
ctx.lineWidth = 2.5;
ctx.strokeStyle = init_color;
ctx.fillStyle = init_color;

let painting = false;
let filling = false;

function getDateString(date) {
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!

    var yyyy = date.getFullYear();
    if(dd<10){dd='0'+dd} if(mm<10){mm='0'+mm}
    
    yyyy = yyyy.toString();
    mm = mm.toString();
    dd = dd.toString();
    
    var m = date.getHours();
    var s = date.getMinutes();

    if(m<10){m='0'+m} if(s<10){s='0'+s}
    m = m.toString();
    s = s.toString();

    var s1 = yyyy+mm+dd+m+s;
    return s1;
}

function startDraw(event) {
    painting = true;
}

function stopDraw(event) {
    painting = false;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(painting) {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
    else {
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
}

function changeSize(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function getSizeValue(obj) {
    document.getElementById("size_val").innerHTML = obj.value;
}

function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
}

function changeMode() {
    if(filling == false) {
        filling = true;
        fill.innerText = "Paint";
    }
    else {
        filling = false;
        fill.innerText = "Fill";
    }
}

function handleCanvasClick(event) {
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas(event) {
    const image = canvas.toDataURL();
    const link = document.createElement("a");

    let now = new Date();
    link.href = image;
    link.download = "PainterJS-" + getDateString(now);
    link.click();
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseleave", stopDraw);
    canvas.addEventListener("click", handleCanvasClick);
}

if(fill) {
    fill.addEventListener("click", changeMode);
}

if(range) {
    range.addEventListener("input", changeSize);
}

if(clear) {
    clear.addEventListener("click", clearCanvas);
}

if(save) {
    save.addEventListener("click", saveCanvas);
}

Array.from(colors).forEach(color => color.addEventListener("click",changeColor));
// Array.from(colors).forEach(function(color) {
//     color.addEventListener("click", changeColor);
// })