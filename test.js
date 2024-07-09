
let allTasks = [];
let taskKeys = null;

let emptyTask = null;

 function updateEmptyTask() {
    emptyTask = allTasks[0];
    console.log(emptyTask);
 }


async function getTasks(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();;
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
    let content = document.getElementById('progress');
    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        let imageSrc = renderPriorityImage(task)
        let initials = getInitialsOfFetchedData(task.assignedContacts);
        let bgColor = task.category === "User Story" ? 'bg-blue' : 'bg-green';
        content.innerHTML +=  /*html*/`
        <div onclick="editTask(${i})" id="task-container${i}" class="task-container">
            <div class="category-container ${bgColor}">
                <span class="category-span" id="category${i}">${task.category}</span>
            </div>
            <div class="title-container">
                <span class="title-span" id="title${i}">${task.title}</span>
            </div>
            <div class="description-container">
                <p id="description${i}">${task.description}</p> 
            </div>
            <div class="subtasks-container">
                <label for="file">1/2 Subtasks</label>
                <progress id="file" value="1" max="2"> 1 </progress>
            </div>
            <div class="contacts-and-priority-container">
                <div id="contacts-container${i}" class="contacts-container">

                </div>
                <div id="priority-container${i}" class="priority-container">
                    <img src=${imageSrc} alt="">

                </div>   
            </div>
        </div>`;

        for (let x = 0; x < initials.length; x++) {
            const initial = initials[x];
            let contentForContacts = document.getElementById(`contacts-container${i}`)
            contentForContacts.innerHTML += /*html*/`
            <div>
                <span>${initial}
            </div>`;

            
        }
    }
}

 async function editTask(i) {
    let title = document.getElementById(`title${i}`);
    title.innerHTML = "Europameister";
    allTasks[i].title ="Europameister";
    let subtasks = JSON.stringify(allTasks[i].subtasks);
    let contacts = JSON.stringify(allTasks[i].assignedContacts);
    let colors = JSON.stringify(allTasks[i].assignedContactsColors);
    allTasks[i].subtasks = subtasks;
    allTasks[i].assignedContacts = contacts;
    allTasks[i].assignedContactsColors = colors;

    await updateData(`/tasks/${taskKeys[i]}`, data, i)

}

function getInitialsOfFetchedData(namesArray) {
    return namesArray.map(name => {
        let nameParts = name.split(" ");
        let initials = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
        return initials;
    });
}


function renderPriorityImage(task) {
    if(task.priority === "Urgent") {
        return 'img/urgent-prio.svg';
    }
    else if(task.priority === "Medium" ) {
        return 'img/medium-prio-orange.svg';
    }
    else if(task.priority === "Low") {
        return 'img/low-prio.svg';
    }

}

async function updateData(path = "", data={}, i) {
    data = allTasks[i];
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

  // let title = task.title === "" ? 'd-none' : 'd-block'// Verwendung, falls leere Daten gesendet werden
