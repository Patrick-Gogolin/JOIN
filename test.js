
let allTasks = [];
let taskKeys = null;

let emptyTask = null;

let currentDraggedElement;

 function updateEmptyTask() {
    emptyTask = allTasks[0];
    console.log(emptyTask);
 }


async function getTasks(path = "") {
    allTasks.length = 0;
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();;
    let keys = Object.keys(responseToJson); // erstellt ein Array, das alle Schlüssel eines Objekts enthält
    taskKeys = keys;
    console.log(taskKeys);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const task = responseToJson[key];
         data = {
            id: key,
            title: task['title'],
            description: task['description'],
            deadline: task['deadline'],
            priority: task['priority'],
            subtasks: JSON.parse(task['subtasks']),
            doneSubtasks: JSON.parse(task['doneSubtasks']),
            assignedContacts: JSON.parse(task['assignedContacts']),
            assignedContactsColors: JSON.parse(task['assignedContactsColors']),
            category: task['category'],
            status: task['status']
        };
        allTasks.push(data);

}
console.log(allTasks);

updateHTML();

}

function renderTask() {
    let content = document.getElementById('progress');
    for (let i = 0; i < allTasks.length; i++) {
        let task = allTasks[i];
        let subtasks = task.subtasks.length;
        let doneSubtasks = task.doneSubtasks.length;
        let imageSrc = renderPriorityImage(task);
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
                <label for="file">${doneSubtasks}/${subtasks} Subtasks</label>
                <progress id="file" value=${doneSubtasks} max=${subtasks}> 1 </progress>
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
            let contactColors = task.assignedContactsColors[x]
            let contentForContacts = document.getElementById(`contacts-container${i}`)
            contentForContacts.innerHTML += /*html*/`
            <div class="rendered-task-assigned-contact-container" style="background-color:${contactColors}">
                <span>${initial}
            </div>`;

            
        }
    }
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

  function updateHTML() {
    let toDo = allTasks.filter(t => t['status'] == 'todo');

    document.getElementById('todo').innerHTML = '';

    if(toDo.length === 0) {
        let content = document.getElementById('todo');
        content.innerHTML = /*html*/`
         <div class="nothing-to-do-nothing-done-container">
                        <span>No tasks To do</span>
                    </div>`;
        }

    for (let i = 0; i < toDo.length; i++) {
        let content = document.getElementById('todo');
                let task = toDo[i];
                let subtasks = task.subtasks.length;
                let doneSubtasks = task.doneSubtasks.length;
                let imageSrc = renderPriorityImage(task);
                let initials = getInitialsOfFetchedData(task.assignedContacts);
                let bgColor = task.category === "User Story" ? 'bg-blue' : 'bg-green';
                content.innerHTML +=  /*html*/`
                <div onclick="renderEditTaskSlide('${task.id}')" draggable="true" ondragstart="startDragging('${task.id}')" onclick="editTask(${i})" id="${task.id}" class="task-container">
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
                        <label for="file">${doneSubtasks}/${subtasks} Subtasks</label>
                        <progress id="file" value=${doneSubtasks} max=${subtasks}> 1 </progress>
                    </div>
                    <div class="contacts-and-priority-container">
                        <div id="contacts-todo-container${i}" class="contacts-container">
        
                        </div>
                        <div id="priority-container${i}" class="priority-container">
                            <img src=${imageSrc} alt="">
        
                        </div>   
                    </div>
                </div>`;
        
                for (let x = 0; x < initials.length; x++) {
                    const initial = initials[x];
                    let contactColors = task.assignedContactsColors[x]
                    let contentForContacts = document.getElementById(`contacts-todo-container${i}`)
                    contentForContacts.innerHTML += /*html*/`
                    <div class="rendered-task-assigned-contact-container" style="background-color:${contactColors}">
                        <span>${initial}
                    </div>`;
        
                    
                }
            }

            removeHighlight('todo');

    let inProgress = allTasks.filter(t => t['status'] == 'progress');

    document.getElementById('progress').innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        let content = document.getElementById('progress');
                let task = inProgress[i];
                let subtasks = task.subtasks.length;
                let doneSubtasks = task.doneSubtasks.length;
                let imageSrc = renderPriorityImage(task);
                let initials = getInitialsOfFetchedData(task.assignedContacts);
                let bgColor = task.category === "User Story" ? 'bg-blue' : 'bg-green';
                content.innerHTML +=  /*html*/`
                <div onclick="renderEditTaskSlide('${task.id}')" draggable="true" ondragstart="startDragging('${task.id}')" onclick="editTask(${i})" id="${task.id}" class="task-container">
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
                        <label for="file">${doneSubtasks}/${subtasks} Subtasks</label>
                        <progress id="file" value=${doneSubtasks} max=${subtasks}> 1 </progress>
                    </div>
                    <div class="contacts-and-priority-container">
                        <div id="contacts-progress-container${i}" class="contacts-container">
        
                        </div>
                        <div id="priority-container${i}" class="priority-container">
                            <img src=${imageSrc} alt="">
        
                        </div>   
                    </div>
                </div>`;
        
                for (let x = 0; x < initials.length; x++) {
                    const initial = initials[x];
                    let contactColors = task.assignedContactsColors[x]
                    let contentForContacts = document.getElementById(`contacts-progress-container${i}`)
                    contentForContacts.innerHTML += /*html*/`
                    <div class="rendered-task-assigned-contact-container" style="background-color:${contactColors}">
                        <span>${initial}
                    </div>`;
        
                    
                }
            }

            removeHighlight('progress');

    let awaitFeedback = allTasks.filter(t => t['status'] == 'feedback');

    document.getElementById('feedback').innerHTML = '';

    for (let i = 0; i < awaitFeedback.length; i++) {
        let content = document.getElementById('feedback');
                let task = awaitFeedback[i];
                let subtasks = task.subtasks.length;
                let doneSubtasks = task.doneSubtasks.length;
                let imageSrc = renderPriorityImage(task);
                let initials = getInitialsOfFetchedData(task.assignedContacts);
                let bgColor = task.category === "User Story" ? 'bg-blue' : 'bg-green';
                content.innerHTML +=  /*html*/`
                <div onclick="renderEditTaskSlide('${task.id}')" draggable="true" ondragstart="startDragging('${task.id}')" onclick="editTask(${i})" id="${task.id}" class="task-container">
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
                        <label for="file">${doneSubtasks}/${subtasks} Subtasks</label>
                        <progress id="file" value=${doneSubtasks} max=${subtasks}> 1 </progress>
                    </div>
                    <div class="contacts-and-priority-container">
                        <div id="contacts-feedback-container${i}" class="contacts-container">
        
                        </div>
                        <div id="priority-container${i}" class="priority-container">
                            <img src=${imageSrc} alt="">
        
                        </div>   
                    </div>
                </div>`;
        
                for (let x = 0; x < initials.length; x++) {
                    const initial = initials[x];
                    let contactColors = task.assignedContactsColors[x]
                    let contentForContacts = document.getElementById(`contacts-feedback-container${i}`)
                    contentForContacts.innerHTML += /*html*/`
                    <div class="rendered-task-assigned-contact-container" style="background-color:${contactColors}">
                        <span>${initial}
                    </div>`;
        
                    
                }
            }

            removeHighlight('feedback');

            let done = allTasks.filter(t => t['status'] == 'done');

    document.getElementById('done').innerHTML = '';

    if(done.length === 0) {
        let content = document.getElementById('done');
        content.innerHTML = /*html*/`
         <div class="nothing-to-do-nothing-done-container">
                        <span>No tasks Done</span>
                    </div>`;
        }

    for (let i = 0; i < done.length; i++) {
        let content = document.getElementById('done');
                let task = done[i];
                let subtasks = task.subtasks.length;
                let doneSubtasks = task.doneSubtasks.length;
                let imageSrc = renderPriorityImage(task);
                let initials = getInitialsOfFetchedData(task.assignedContacts);
                let bgColor = task.category === "User Story" ? 'bg-blue' : 'bg-green';
                content.innerHTML +=  /*html*/`
                <div onclick="renderEditTaskSlide('${task.id}')" draggable="true" ondragstart="startDragging('${task.id}')" onclick="editTask(${i})" id="${task.id}" class="task-container">
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
                        <label for="file">${doneSubtasks}/${subtasks} Subtasks</label>
                        <progress id="file" value=${doneSubtasks} max=${subtasks}> 1 </progress>
                    </div>
                    <div class="contacts-and-priority-container">
                        <div id="contacts-done-container${i}" class="contacts-container">
        
                        </div>
                        <div id="priority-container${i}" class="priority-container">
                            <img src=${imageSrc} alt="">
        
                        </div>   
                    </div>
                </div>`;
        
                for (let x = 0; x < initials.length; x++) {
                    const initial = initials[x];
                    let contactColors = task.assignedContactsColors[x]
                    let contentForContacts = document.getElementById(`contacts-done-container${i}`)
                    contentForContacts.innerHTML += /*html*/`
                    <div class="rendered-task-assigned-contact-container" style="background-color:${contactColors}">
                        <span>${initial}
                    </div>`;
        
                    
                }
            }
            removeHighlight('done');
            
        
        }

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(status) {
    let index = taskKeys.indexOf(currentDraggedElement);
    allTasks[index].status = status;
    let subtasks = JSON.stringify(allTasks[index].subtasks);
    let doneSubtasks = JSON.stringify(allTasks[index].doneSubtasks);
    let contacts = JSON.stringify(allTasks[index].assignedContacts);
    let colors = JSON.stringify(allTasks[index].assignedContactsColors);
    allTasks[index].subtasks = subtasks;
    allTasks[index].assignedContacts = contacts;
    allTasks[index].assignedContactsColors = colors;
    allTasks[index].doneSubtasks = doneSubtasks;
    console.log(allTasks);
    await updateData(`/tasks/${taskKeys[index]}`, data, index);
    allTasks.length = 0;
    await getTasks('/tasks');
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


