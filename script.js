var topZIndex = 10;
var isStartOpen = false;

function openMyPC() {
    var w = document.getElementById("myPcWindow");
    w.style.display = "flex";
    topZIndex = topZIndex + 1;
    w.style.zIndex = topZIndex;
}
function closeMyPC() {
    document.getElementById("myPcWindow").style.display = "none";
}

function openCalc() {
    var w = document.getElementById("calcWindow");
    w.style.display = "flex";
    topZIndex = topZIndex + 1;
    w.style.zIndex = topZIndex;
}
function closeCalc() {
    document.getElementById("calcWindow").style.display = "none";
}

function openNotepad() {
    var w = document.getElementById("noteWindow");
    w.style.display = "flex";
    topZIndex = topZIndex + 1;
    w.style.zIndex = topZIndex;
    var saved = localStorage.getItem("win_notepad_data");
    document.getElementById("noteText").value = saved;
}
function closeNotepad() {
    document.getElementById("noteWindow").style.display = "none";
}

function openCalendar() {
    var w = document.getElementById("calWindow");
    w.style.display = "flex";
    topZIndex = topZIndex + 1;
    w.style.zIndex = topZIndex;
    loadCal();
}
function closeCalendar() {
    document.getElementById("calWindow").style.display = "none";
}

function openRecycleBin() {
    var w = document.getElementById("binWindow");
    w.style.display = "flex";
    topZIndex = topZIndex + 1;
    w.style.zIndex = topZIndex;
}
function closeRecycleBin() {
    document.getElementById("binWindow").style.display = "none";
}

function toggleStart() {
    var m = document.getElementById("startMenu");
    if (isStartOpen == false) {
        m.style.display = "flex";
        isStartOpen = true;
    } else {
        m.style.display = "none";
        isStartOpen = false;
    }
}

function setWallpaper(gradientStr) {
    document.body.style.background = gradientStr;
}

function searchApps(val) {
    if (val.includes("c")) {
        openCalc();
    }
    if (val.includes("n")) {
        openNotepad();
    }
    if (val.includes("p")) {
        openMyPC();
    }
}

function updateClock() {
    var d = new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    document.getElementById("timeBox").innerText = h + ":" + m + ":" + s;
    document.getElementById("dateBox").innerText = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
}
setInterval(updateClock, 1000);

var calcStr = "";
function addCalc(ch) {
    calcStr = calcStr + ch;
    document.getElementById("calcScreen").value = calcStr;
}
function clearCalc() {
    calcStr = "";
    document.getElementById("calcScreen").value = "0";
}
function backCalc() {
    calcStr = calcStr.slice(0, -1);
    document.getElementById("calcScreen").value = calcStr;
}
function doMath() {
    var res = eval(calcStr);
    document.getElementById("calcScreen").value = res;
}

function saveNote() {
    var txt = document.getElementById("noteText").value;
    localStorage.setItem("win_notepad_data", txt);
    alert("File saved!");
}
function clearNote() {
    document.getElementById("noteText").value = "";
}

function loadCal() {
    var tbl = document.getElementById("calGrid");
    var now = new Date();
    var yr = now.getFullYear();
    var mo = now.getMonth();
    var today = now.getDate();

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    document.getElementById("calHeaderTitle").innerText = months[mo] + " " + yr;

    var first = new Date(yr, mo, 1).getDay();
    var total = new Date(yr, mo + 1, 0).getDate();

    var row = tbl.insertRow();
    for (var i = 0; i < first; i++) {
        row.insertCell();
    }

    for (var d = 1; d <= total; d++) {
        if ((first + d - 1) % 7 === 0 && d !== 1) {
            row = tbl.insertRow();
        }
        var c = row.insertCell();
        c.innerText = d;
        if (d === today) {
            c.style.backgroundColor = "#0078d7";
            c.style.color = "white";
        }
    }
}

dragElement(document.getElementById("myPcWindow"), document.getElementById("myPcHeader"));
dragElement(document.getElementById("calcWindow"), document.getElementById("calcHeader"));
dragElement(document.getElementById("noteWindow"), document.getElementById("noteHeader"));
dragElement(document.getElementById("calWindow"), document.getElementById("calHeader"));
dragElement(document.getElementById("binWindow"), document.getElementById("binHeader"));

function dragElement(box, bar) {
    var p1 = 0, p2 = 0, p3 = 0, p4 = 0;
    bar.onmousedown = function(e) {
        p3 = e.clientX;
        p4 = e.clientY;
        document.onmouseup = function() {
            document.onmouseup = null;
            document.onmousemove = null;
        };
        document.onmousemove = function(e) {
            p1 = p3 - e.clientX;
            p2 = p4 - e.clientY;
            p3 = e.clientX;
            p4 = e.clientY;
            box.style.top = (box.offsetTop - p2) + "px";
            box.style.left = (box.offsetLeft - p1) + "px";
        };
    };
}