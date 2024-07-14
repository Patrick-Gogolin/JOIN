const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"
let allTasks = [];
let taskKeys = null;
let emptyTask = null;
let currentDraggedElement;
let statusOfTask = null;

async function getTasks(path = "") {
    allTasks.length = 0;
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();;
    let keys = Object.keys(responseToJson);
    taskKeys = keys;

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

    updateHTML();
}


function openEditTaskOverlayer() {
    document.getElementById('edit-task-overlayer').classList.remove('d-none');
    document.body.style.overflow = 'hidden';
}

function closeEditTaskOverlay() {
    document.getElementById('edit-task-overlayer').classList.add('d-none');
    document.body.style.overflow = 'auto';
}

function renderEditTaskSlide(id) {
    content = document.getElementById('edit-task-overlayer');
    let index = taskKeys.indexOf(id);
    let task = allTasks[index];
    let imageSrc = renderPriorityImage(task);
    let initials = getInitialsOfFetchedData(task.assignedContacts);
    console.log(index);
    openEditTaskOverlayer();
    content.innerHTML = /*html*/`
    <div class="popup-content">
                    <div class="task-card-header">
                        <span>${task.category}</span><div onclick="closeEditTaskOverlay()" class="task-card-back-icon-boarder"><img class="task-card-back-icon" src="/img/x.png" alt=""></div>
                    </div>
                    <div class="task-card-title">${task.title}</div>
                    <div class="task-card-description">${task.description}</div>
                    <div class="task-card-date"><span class="edit-task-subheadline">Due date:</span><div>${task.deadline}</div></div>
                    <div class="task-card-priority"><span class="edit-task-subheadline">Priority:</span><div class="task-card-priority-icon">${task.priority}<img class="task-card-priority-sign" src=${imageSrc} alt="medium"></div></div>
                    <div class="task-card-assigned"><span class="edit-task-subheadline">Assigned To:</span>
                        <div id="assigned-contacts-edit-task-container" class="task-card-assigned-list">
                        </div>
                    </div>
                    <div class="task-card-subtasks"><span class="edit-task-subheadline">Subtasks</span>
                        <div id="task-card-subtasks-container" class="task-card-subtasks-list">
                        </div>
                    </div>
                    <div class="task-card-footer">
                        <div onmouseover="changeAddSignToBlue('delete-task-grey', 'delete-task-blue')" onmouseout="changeAddSingToDefault('delete-task-grey', 'delete-task-blue')" onclick="deleteTaskFromDatabase('/tasks/${taskKeys[index]}')" class="task-card-delete">
                            <img id="delete-task-grey" src="/img/delete.svg" alt="Trashbin">
                            <img id="delete-task-blue" class="d-none" src="/img/delete-blue.svg" alt="Trashbin">
                            <span>Delete</span>
                        </div>
                        <div class="task-card-separator"></div>
                        <div onmouseover="changeAddSignToBlue('edit-task-grey', 'edit-task-blue')" onmouseout="changeAddSingToDefault('edit-task-grey', 'edit-task-blue')" class="task-card-edit">
                            <img id="edit-task-grey" src="/img/edit.svg" alt="Pencil">
                            <img id="edit-task-blue" class="d-none" src="/img/edit-blue.svg" alt="Pencil">
                            <span>Edit</span>
                    </div>
                </div>`;
            for (let i = 0; i < task['assignedContacts'].length; i++) {
                let assignedContactsContent = document.getElementById('assigned-contacts-edit-task-container');
                let contact= task['assignedContacts'][i];
                let initial = initials[i];
                let contactColors = task.assignedContactsColors[i]
                assignedContactsContent.innerHTML += /*html*/`
                <div>
                    <div class="rendered-task-assigned-contact-container" style="background-color:${contactColors}">
                            <span>${initial}</span>
                    </div>
                    <div>
                        <span>${contact}</span>
                    </div>
                </div>`;
                }

            for (let i = 0; i < task['subtasks'].length; i++) {
                let subtaskContent = document.getElementById('task-card-subtasks-container');
                const subtask = task['subtasks'][i];
                let index = doneSubtasks.indexOf(subtask);
                console.log(index);
                if (index !== -1) {
                    subtaskContent.innerHTML += /*html*/`
                    <div class="single-subtask-in-edit-slide-container">
                        <div>
                            <img src="/img/filled-check-box.svg">
                        </div>
                        <div>
                            <span>${subtask}</span>
                        </div>
                    </div>`; 
                }
                else {
                    subtaskContent.innerHTML += /*html*/`
                    <div class="single-subtask-in-edit-slide-container">
                        <div>
                            <img src="/img/empty-check-box.svg">
                        </div>
                        <div>
                            <span>${subtask}</span>
                        </div>
                    </div>`; 
                }
                
            }

}

async function deleteTaskFromDatabase(path = ""){
    let response = await fetch(BASE_URL + path + ".json",{
        method: "DELETE",
    });
    setTimeout(async function() {
        closeEditTaskOverlay()
        await getTasks('/tasks');
    }, 300);
  return responseToJson = await response.json();

}

function changeAddSignToBlue(idDefault, idBlue) {
    let addButtonGrey = document.getElementById(idDefault);
    let addButtonBlue = document.getElementById(idBlue);
    addButtonGrey.classList.add('d-none');
    addButtonBlue.classList.remove('d-none');
}

function changeAddSingToDefault(idDefault, idBlue) {
    let addButtonGrey = document.getElementById(idDefault);
    let addButtonBlue = document.getElementById(idBlue);
    addButtonGrey.classList.remove('d-none');
    addButtonBlue.classList.add('d-none');
}