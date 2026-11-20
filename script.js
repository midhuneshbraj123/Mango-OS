function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;

    document.getElementById("live-clock").innerText = hours + ":" + minutes + ":" + seconds;
}
setInterval(updateClock, 1000);
updateClock();

// Calculator Logic
let calcInput = "";
const display = document.getElementById("calc-display");

function appendCalc(value) {
    calcInput += value;
    display.value = calcInput;
}

function clearCalc() {
    calcInput = "";
    display.value = "0";
}

function calculateResult() {
    try {
        let result = eval(calcInput);
        display.value = result;
        calcInput = String(result);
    } catch (error) {
        display.value = "Error";
        calcInput = "";
    }
}

// Notes Local Storage Logic
const notesArea = document.getElementById("notes-area");
const saveStatus = document.getElementById("save-status");

// Load saved notes on startup
if (localStorage.getItem("hud_notes")) {
    notesArea.value = localStorage.getItem("hud_notes");
}

function saveNotes() {
    localStorage.setItem("hud_notes", notesArea.value);
    saveStatus.innerText = "Saved!";
    setTimeout(() => {
        saveStatus.innerText = "";
    }, 2000);
}