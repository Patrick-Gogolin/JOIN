const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"
let allTasks = [];
let taskKeys = null;
let responseToJsonArray = null;


async function getTasks(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    responseToJsonArray = responseToJson;
    console.log(responseToJsonArray);
    let keys = Object.keys(responseToJson); // erstellt ein Array, das alle Schlüssel eines Objekts enthält
    taskKeys = keys;
    console.log(taskKeys);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const task = responseToJson[key];
         data = {
            title: task['title'],
            description: task['description'],
            deadline: task['deadline'],
            priority: task['priority'],
            subtasks: JSON.parse(task['subtasks']),
            assignedContacts: JSON.parse(task['assignedContacts']),
            assignedContactsColors: JSON.parse(task['assignedContactsColors']),
            category: task['category'],
        };
        allTasks.push(data);

}
console.log(allTasks);

renderTask();

}

function renderTask() {
    let content = document.getElementById('content');
    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        let title = task.title === "" ? 'd-none' : 'd-block'
        content.innerHTML +=  /*html*/`
        <div class="${title}">
            <h1 id="headline${i}">${task.title}</h1>
        </div>`;
    }
}

async function updateData(path = "", data={}) {
    data = allTasks[0];
    let response = await fetch(BASE_URL + path + ".json",{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
  return responseToJson = await response.json();

}

function newHeadline() {
    headline = document.getElementById(`headline0`);
    headline.innerHTML = "Europameister";
    allTasks[0].title = "Europameister";
    let subtasks = JSON.stringify(allTasks[0].subtasks);
    let contacts = JSON.stringify(allTasks[0].assignedContacts)
    let colors = JSON.stringify(allTasks[0].assignedContactsColors)
    allTasks[0].subtasks = subtasks;
    allTasks[0].assignedContacts = contacts;
    allTasks[0].assignedContactsColors = colors;
    console.log(allTasks[0].subtasks);
    console.log("Original subtasks:", allTasks[0]['subtasks']);
}

//let subtask = allTasks[3].subtasks;
    //content.innerHTML =  /*html*/`
   // <p>${subtask}</p>`;
