for(let i=0; i<100 ; i++){
    const box = document.createElement("div");
    box.classList.add('box');
    document.querySelector(".container").appendChild(box);   
}

const btn = document.getElementsByClassName("btn");
const colorBox = document.querySelectorAll('.box');

function randomColorCode() {
    var chars = "0123456789ABCDEF";
    var colorLength = 6;
    var color = "";

    for (let i=0; i<colorLength; i++) {
        var randomCode = Math.floor(Math.random() * chars.length);
        color += chars.substring(randomCode, randomCode+1);
    }
    return "#" + color;
}

function onMouseEnter(event) {
    event.target.style.cursor = "pointer";

    var desc = document.createElement("div");
    desc.classList.add("description");
    desc.innerText = "Click to Copy";
    event.target.appendChild(desc);
}

function onMouseLeave(event) {
    var desc = document.querySelector(".description");
    event.target.removeChild(desc);
}

function onMouseClick(event, newColor) {
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.value = newColor;
    event.target.appendChild(createInput);
    createInput.select();
    document.execCommand("copy");
    event.target.removeChild(createInput);
    alert('Copy Complete!');
}

function addColor() {
    colorBox.forEach(e => {
        var newColor = randomColorCode();
        e.style.backgroundColor = newColor;
        e.innerHTML = newColor;
        e.addEventListener("mouseenter", onMouseEnter);
        e.addEventListener("mouseleave", onMouseLeave);
        e.addEventListener("click", function(event) {onMouseClick(event, newColor);});
    })
}