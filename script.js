
let alarmtime;
ringtone = new Audio("beep-04.mp3")
// To set a time
function displayTime() {
    var d = new Date();
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();
    var amorpm = "AM";
    if (hour >= 12) {
        amorpm = "PM"
    }
    if (hour > 12) {
        hour = hour - 12;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    document.getElementById("clock").innerHTML = hour + ":" + min + ":" + sec + " " + amorpm;
    if (alarmtime == hour + ":" + min + ":" + sec + " " + amorpm) {
        // console.log("alarm ringing");
        ringtone.play();
        ringtone.loop = true;
    }
}
setInterval(displayTime, 1000);

// to set a value for alarm
const selectMenu = document.querySelectorAll("select");

for (let i = 12; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
    console.log(i);
}
for (let i = 59; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
    console.log(i);
}
for (let i = 59; i > 0; i--) {
    i = i < 10 ? "0" + i : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
    console.log(i);
}
for (let i = 2; i > 0; i--) {
    let ampm = i == 1 ? "AM" : "PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
    console.log(i);
}

// set a list of alarm time
tasks = []
const taskslist = document.getElementById('list');
const set = document.querySelector('button');

function showNotification(text) {
    alert(text);
}

function handleInputKeypress() {
    if (EventTarget) {
        const value1 = selectMenu[0].value;
        const value2 = selectMenu[1].value;
        const value3 = selectMenu[2].value;
        const value4 = selectMenu[3].value;
        const text = value1 + ":" + value2 + ":" + value3 + " " + value4;
        // console.log(text)
        if (text.includes("Hr") || text.includes("Min") || text.includes("Sec") || text.includes("Am")) {
            return showNotification("Select a valid time to set alarm")
        }
        alarmtime = text;
        const task = {
            text,
            id: Date.now().toString()
        }
        console.log(task);
        selectMenu[0].value = 'Hr';
        selectMenu[1].value = 'Min';
        selectMenu[2].value = 'Sec';
        selectMenu[3].value = 'Am';
        addTaskLi(task)

    }
}
function deletetask(taskid) {
    const newtasks = tasks.filter(function (task) {
        return task.id !== taskid;
    });
    tasks = newtasks;
    renderList();
    // showNotification('Alarm deleted successfully');
}

function addTaskLi(task) {
    if (task) {
        tasks.push(task);
        renderList();
        showNotification('Alarm added successfully');
        return;
    }

}
function addtasktodom(task) {
    const li = document.createElement('li');
    li.innerHTML = `
    
    <span class='custom'>${task.text}<span>
    <img src="binbutton copy.png" class="delete" data-id="${task.id}" />
    `;
    taskslist.append(li)
}

function renderList() {
    taskslist.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        addtasktodom(tasks[i]);
    }
}
function handleclickListener(e) {
    const target = e.target;

    if (target.className == 'delete') {
        const taskid = target.dataset.id;
        deletetask(taskid);
        return
    }
}
set.addEventListener('click', handleInputKeypress);
document.addEventListener('click', handleclickListener);
function intializeapp() {
}
intializeapp();
