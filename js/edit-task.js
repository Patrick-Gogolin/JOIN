let emptyTask = null;
let urgentActiveEditTask = false;
let mediumActiveEditTask = false;
let lowActiveEditTask = false;
let assignOptionsContactsContainerEditTask = false;
let assignedContactsInitialsEditTask = [];
let editMenuSubtaskIsOpenInEditTask = false;
let currentSubtask = null;

function OpenEditTaskWindow(id) {
    closeEditTaskOverlay('edit-task-overlayer');
    openEditTaskOverlayer('edit-task-popup');
    let content = document.getElementById('edit-task-popup');
    let index = taskKeys.indexOf(id);
    let task = allTasks[index];
    emptyTask = JSON.parse(JSON.stringify(task));
    let {urgentClass, mediumClass, lowClass} = getPriorityClasses(task.priority);
    let {urgentClassSvg, mediumClassSvg, lowClassSvg} = getPrioritySvgPaths(task.priority);
    console.log(emptyTask);
    content.innerHTML = /*html*/`
    <div class="popup-content-edit-task">
        <img onclick="closeEditTaskOverlay('edit-task-popup')" class="close-overlayer-sign-edit-task" src="/img/cancel.svg" alt="Cross">
        <div class="edit-task-content">
        <div class="title-input-container">
                <span class="headline-input">Title<span class="red-star-required">*</span></span>
                <input id="title-edit-task" onblur="newTitle()" type="text" value="${task.title}" required>
                <span id="title-required-span-edit-task" class="this-field-required-span d-none">This field is required</span>
        </div>
        <div class="description-input-container">
        <span class="headline-input">Description</span>
        <textarea id="description-of-task-edit-task" onblur="newDescription()" class="task-description-textarea" name="" id="">${task.description}</textarea>
        </div>
        <div class="date-container">
            <span class="headline-input">Due Date<span class="red-star-required">*</span></span>
            <input id="date-edit-task" onblur="newDate()" type="date" value=${task.deadline} required>
            <span id="date-required-span-edit-task" class="this-field-required-span d-none">This field is required</span>
        </div>
        <div class="priority-container">
            <span class="headline-input">Prio</span>
            <div class="priority-button-container">
                <button onclick="urgentPriorityEditTask()" id="urgent-button-edit-task" class="urgent-button ${urgentClass}">Urgent <img id="urgent-prio-sign-edit-task" src=${urgentClassSvg} alt=""></button>
                <button onclick="mediumPriorityEditTask()" id="medium-button-edit-task" class="medium-button ${mediumClass}">Medium <img id="medium-prio-sign-edit-task" src=${mediumClassSvg} alt=""></button>
                <button onclick="lowPriorityEditTask()" id="low-button-edit-task" class="low-button ${lowClass}">Low <img id="low-prio-sign-edit-task" src=${lowClassSvg} alt=""></button>
            </div>
        </div>
        <div class="assigned-to-input-container">
            <span class="headline-input">Assigned to</span>
            <div class="select-contacts-container">
                <input onkeyup="searchContactsEditTask()" id="search-contact-inputfield-edit-task" type="text" placeholder="Select contacts to assign">
                <div class="arrow-drop-down">
                    <img onclick="openSelectContactsContainerEditTask(event)" src="img/arrow-drop-down-contacts.svg"alt="">
                </div>
            </div>
            <div id="choose-contacts-container-edit-task" class="choose-contacts-container d-none">
                <div id="active-user-container-edit-task" class="d-none">
                </div>
                <div class="contacts-to-select-container" id="select-contact-container-edit-task">
                </div>
            </div>
        </div>
        <div id="show-assigned-contacts-edit-task" class="show-assigned-contacts">
        </div>
        <div class="subtask-area-container">
            <div class="add-subtask-container">
                <span class="headline-input">Subtask</span>
                <div class="add-subtask-input-container">
                    <input id="add-subtask-input-container-inputfield-edit-task" oninput="changeIconsSubtasksEditTask()" type="text" placeholder="Add new subtask">
                    <div id="add-subtask-svg-container-edit-task" class="add-subtask-svg-container">
                        <img id="add-subtask-svg" class="add-subtask-svg" src="img/addsubtask.svg" alt="">
                    </div>
                    <div id="cancel-or-confirm-subtask-container-edit-task" class="cancel-or-confirm-subtask-container d-none">
                        <img onclick="clearSubtaskEditTask()" src="img/cancel.svg" alt="">
                        <div class="seperator"></div>
                        <img onclick="addSubtaskEditTask()" src="img/check-grey.svg" alt="">
                    </div>
                </div>
            </div>
            <div id="added-subtask-main-container-edit-task" class="added-subtask-main-container">
            </div>
        </div>
        </div>
        <div class="update-task-button-container">
            <button onclick= "finalUpdateTask(${index})">Ok <img src="img/check.svg" alt=""></button>
        </div>
    </div>`;

    eventListenerForSubtaskInputField('add-subtask-input-container-inputfield-edit-task')
    renderAssignedContactsEditTask();
    renderSubtasksFromEditTask();
}

function eventListenerForSubtaskInputField(id) {
    let inputField = document.getElementById(id);
    if (inputField) {
        inputField.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                event.stopPropagation();
                addSubtaskEditTask();
            }
        });
    }
}

function getPrioritySvgPaths(priority) {
    return {
        urgentClassSvg: priority === 'Urgent' ? 'img/urgent-prio-white.svg' : 'img/urgent-prio.svg',
        mediumClassSvg: priority === 'Medium' ? 'img/medium-prio.svg' : 'img/medium-prio-orange.svg',
        lowClassSvg: priority === 'Low' ? 'img/low-prio-white.svg' : 'img/low-prio.svg'
    };
}

function getPriorityClasses(priority) {
    return {
        urgentClass: priority === 'Urgent' ? 'urgent' : '',
        mediumClass: priority === 'Medium' ? 'medium' : '',
        lowClass: priority === 'Low' ? 'low' : '',
    };
}

function urgentPriorityEditTask() {
    if (!urgentActiveEditTask) {
        resetButtonsEditTask();
        let urgentButton = document.getElementById('urgent-button-edit-task');
        let urgentPrioSign = document.getElementById('urgent-prio-sign-edit-task');
        let taskPriority = urgentButton.innerText;
        urgentButton.classList.add('urgent');
        urgentPrioSign.src = 'img/urgent-prio-white.svg';
        emptyTask.priority = taskPriority;
        urgentActiveEditTask = true;
    } else {
        let urgentButton = document.getElementById('urgent-button-edit-task');
        let urgentPrioSign = document.getElementById('urgent-prio-sign-edit-task');
        urgentButton.classList.remove('urgent');
        urgentPrioSign.src = 'img/urgent-prio.svg';
        emptyTask.priority = "";
        urgentActiveEditTask = false;
    }
}

function mediumPriorityEditTask() {
    if (!mediumActiveEditTask) {
        resetButtonsEditTask();
        let urgentButton = document.getElementById('medium-button-edit-task');
        let urgentPrioSign = document.getElementById('medium-prio-sign-edit-task');
        let taskPriority = urgentButton.innerText;
        urgentButton.classList.add('medium');
        urgentPrioSign.src = 'img/medium-prio.svg';
        emptyTask.priority = taskPriority;
        mediumActiveEditTask = true;
    } else {
        let urgentButton = document.getElementById('medium-button-edit-task');
        let urgentPrioSign = document.getElementById('medium-prio-sign-edit-task');
        urgentButton.classList.remove('medium');
        urgentPrioSign.src = 'img/medium-prio-orange.svg';
        emptyTask.priority = "";
        mediumActiveEditTask = false;
    }
}

function lowPriorityEditTask() {
    if (!lowActiveEditTask) {
        resetButtonsEditTask();
        let urgentButton = document.getElementById('low-button-edit-task');
        let urgentPrioSign = document.getElementById('low-prio-sign-edit-task');
        let taskPriority = urgentButton.innerText;
        urgentButton.classList.add('low');
        urgentPrioSign.src = 'img/low-prio-white.svg';
        emptyTask.priority = taskPriority;
        lowActiveEditTask = true;
    } else {
        let urgentButton = document.getElementById('low-button-edit-task');
        let urgentPrioSign = document.getElementById('low-prio-sign-edit-task');
        urgentButton.classList.remove('low');
        urgentPrioSign.src = 'img/low-prio.svg';
        emptyTask.priority = "";
        lowActiveEditTask = false;
    }
}

function resetButtonsEditTask() {
    emptyTask.Priority = "";
    resetUrgentButtonEditTask();
    resetMediumButtonEditTask();
    resetLowButtonEditTask();
}

function resetUrgentButtonEditTask() {
    let urgentButton = document.getElementById('urgent-button-edit-task');
    let urgentPrioSign = document.getElementById('urgent-prio-sign-edit-task');
    urgentButton.classList.remove('urgent');
    urgentPrioSign.src = 'img/urgent-prio.svg';
    urgentActiveEditTask = false;
}

function resetMediumButtonEditTask() {
    let mediumButton = document.getElementById('medium-button-edit-task');
    let mediumPrioSign = document.getElementById('medium-prio-sign-edit-task');
    mediumButton.classList.remove('medium');
    mediumPrioSign.src = 'img/medium-prio-orange.svg';
    mediumActiveEditTask = false;
}

function resetLowButtonEditTask() {
    let lowButton = document.getElementById('low-button-edit-task');
    let lowPrioSign = document.getElementById('low-prio-sign-edit-task');
    lowButton.classList.remove('low');
    lowPrioSign.src = 'img/low-prio.svg';
    lowActiveEditTask = false;
}

function openSelectContactsContainerEditTask() {
    let container = document.getElementById('choose-contacts-container-edit-task');
    let assignedContacts = document.getElementById('show-assigned-contacts-edit-task');
    if (assignOptionsContactsContainerEditTask === false) {
        container.classList.remove('d-none');
        assignOptionsContactsContainerEditTask = true;
        renderContactsEditTask();
        assignedContacts.classList.add('d-none')
    }
    else {
        container.classList.add('d-none');
        assignOptionsContactsContainerEditTask = false;
        renderAssignedContactsEditTask();
        assignedContacts.classList.remove('d-none');
    }
}

function renderContactsEditTask() {
    let activeUserContainer = document.getElementById('active-user-container-edit-task');
    let container = document.getElementById('select-contact-container-edit-task');
    activeUserContainer.innerHTML = "";
    container.innerHTML = "";

    if (activeUser != "" && activeUser[0] != "Guest") {
        activeUserContainer.classList.remove('d-none');
        let activeUserUpdated = activeUser.join(" ");
        let activeUserInitialsUpdated = [activeUserInitials.join("")];
        for (let y = 0; y < 1; y++) {
            const activeUserName = activeUserUpdated;
            let checkBox = renderCheckBoxEditTask(activeUserUpdated);
            let bgColor = emptyTask.assignedContacts.indexOf(activeUserUpdated) !== -1 ? 'bg-navy' : 'bg-white';
            activeUserContainer.innerHTML = /*html*/`
            <div id="logged-in-user-edit-task" onclick="assignTaskToLoggedInUserEditTask('logged-in-user-edit-task')" class="single-contact-container ${bgColor}">
                <div class="single-contact-name-container">
                    <div class="contact-name-initials-container" style="background-color: ${colorForActiveUser[0]};">
                        <span class="user-initials-span">${activeUserInitialsUpdated}</span>
                    </div>
                    <span id="logged-in-user-name-edit-task">${activeUserName}</span><span>(You)</span>
                </div>
                <div>
                    <img id="checkbox-active-user-edit-task" src=${checkBox} alt="Checkbox">
                </div>
            </div>`;
    
            for (let i = 0; i < contacts.length; i++) {
                const color = colors[i];
                const userName = userNames[i];
                const userNameInitial = userNamesInitials[i];
                let checkBoxContacts = renderCheckBoxEditTask(userName);
                let bgColor = emptyTask.assignedContacts.indexOf(userName) !== -1 ? 'bg-navy' : 'bg-white'
                container.innerHTML += /*html*/`
        <div id="assign-contact-to-task${i}" onclick="assignTaskToContactEditTask(${i})"  class="single-contact-container ${bgColor}">
            <div class="single-contact-name-container">
                <div class="contact-name-initials-container" style="background-color: ${color};">
                    <span class="user-initials-span">${userNameInitial}</span>
                </div>
                <span id="assigned-contact-name-edit-task${i}">${userName}</span>
            </div>
            <div>
                <img id="checkbox-edit-task${i}" src=${checkBoxContacts} alt="Checkbox">
            </div>
        </div>`;
    
            }
        }
    }
    else {
    
        for (let i = 0; i < contacts.length; i++) {
            const color = colors[i];
            const userName = userNames[i];
            const userNameInitial = userNamesInitials[i];
            let checkBoxContacts = renderCheckBoxEditTask(userName);
            let bgColor = emptyTask.assignedContacts.indexOf(userName) !== -1 ? 'bg-navy' : 'bg-white'
            container.innerHTML += /*html*/`
     <div id="assign-contact-to-task${i}" onclick="assignTaskToContactEditTask(${i})"  class="single-contact-container ${bgColor}">
        <div class="single-contact-name-container">
            <div class="contact-name-initials-container" style="background-color: ${color};">
                <span class="user-initials-span">${userNameInitial}</span>
            </div>
            <span id="assigned-contact-name-edit-task${i}">${userName}</span>
        </div>
        <div>
            <img id="checkbox-edit-task${i}" src=${checkBoxContacts} alt="Checkbox">
        </div>
    </div>`;
    }
}
}

function searchContactsEditTask() {
    let search = document.getElementById('search-contact-inputfield-edit-task').value.toLowerCase().trim();
    let content = document.getElementById('select-contact-container-edit-task');
    let activeUserContainer = document.getElementById('active-user-container-edit-task');
    let container = document.getElementById('choose-contacts-container-edit-task');
    let assignedContacts = document.getElementById('show-assigned-contacts-edit-task');
    content.innerHTML = '';

    if(search.length > 0) {
        container.classList.remove('d-none');
        assignOptionsContactsContainerEditTask = true;
        assignedContacts.classList.add('d-none');
    }
    else {
        container.classList.add('d-none');
        assignOptionsContactsContainerEditTask = false;
        assignedContacts.classList.remove('d-none');
        renderAssignedContactsEditTask();
    }

    if (activeUser.length > 0) { 
        let activeUserUpdated = activeUser.join(" ");
        let activeUserInitialsUpdated = activeUserInitials.join("");
        let checkBox = renderCheckBoxEditTask(activeUserUpdated);
        let bgColor = emptyTask.assignedContacts.indexOf(activeUserUpdated) !== -1 ? 'bg-navy' : 'bg-white';
        let color = colorForActiveUser;

        if (activeUserUpdated.toLowerCase().includes(search)) {
            activeUserContainer.classList.remove('d-none');
            activeUserContainer.innerHTML = /*html*/`
            <div id="logged-in-user-edit-task" onclick="assignTaskToLoggedInUserEditTask('logged-in-user-edit-task')" class="single-contact-container ${bgColor}">
                <div class="single-contact-name-container">
                    <div class="contact-name-initials-container" style="background-color: ${color};">
                        <span class="user-initials-span">${activeUserInitialsUpdated}</span>
                    </div>
                    <span id="logged-in-user-name-edit-task">${activeUserUpdated}</span><span>(You)</span>
                </div>
                <div>
                    <img id="checkbox-active-user-edit-task" src=${checkBox} alt="Checkbox">
                </div>
            </div>`;
        } else {
            activeUserContainer.innerHTML = '';
        }
    } else {
        activeUserContainer.classList.add('d-none');
    }

    for (let i = 0; i < contacts.length; i++) {
        const color = colors[i];
        const userName = userNames[i];
        const userNameLowerCase = userName.toLowerCase();
        const userNameInitial = userNamesInitials[i];
        let checkBoxContacts = renderCheckBoxEditTask(userName);
        let bgColor = emptyTask.assignedContacts.indexOf(userName) !== -1 ? 'bg-navy' : 'bg-white'

        if (userNameLowerCase.includes(search)) {
        content.innerHTML += /*html*/`
<div id="assign-contact-to-task${i}" onclick="assignTaskToContactEditTask(${i})"  class="single-contact-container ${bgColor}">
    <div class="single-contact-name-container">
        <div class="contact-name-initials-container" style="background-color: ${color};">
            <span class="user-initials-span">${userNameInitial}</span>
        </div>
        <span id="assigned-contact-name-edit-task${i}">${userName}</span>
    </div>
    <div>
        <img id="checkbox-edit-task${i}" src=${checkBoxContacts} alt="Checkbox">
    </div>
</div>`;
        }
    }
}

function renderAssignedContactsEditTask() {
    getInitialsAssignedContactsIdEditTask();
    console.log(assignedContactsInitialsEditTask);
    let assignedContactsContainer = document.getElementById('show-assigned-contacts-edit-task');
    assignedContactsContainer.innerHTML = "";
    for (let i = 0; i < assignedContactsInitialsEditTask.length; i++) {
        const initials = assignedContactsInitialsEditTask[i];
        const color = emptyTask.assignedContactsColors[i];
        assignedContactsContainer.innerHTML += /*html*/`
        <div class="contact-name-initials-container" style="background-color: ${color}">
            <span class="user-initials-span">${initials}</span>
        </div>`;
    }
}

function getInitialsAssignedContactsIdEditTask() {
    assignedContactsInitialsEditTask.length = 0;
    let initials = emptyTask.assignedContacts.map(name => {
        let nameParts = name.split(/[\s-]+/);
        let initial = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
        assignedContactsInitialsEditTask.push(initial);
    });
}

function renderCheckBoxEditTask(id) {
    if(emptyTask.assignedContacts.length === 0) {
        return "img/empty-check-box.svg";
    }
    else if(emptyTask.assignedContacts.indexOf(id) !== -1) {
        return "img/filled-check-box-white.svg"
    }
    else {
        return "img/empty-check-box.svg";
    }
}

function assignTaskToLoggedInUserEditTask(i) {
    let container = document.getElementById(i);
    let loggedInUserName = document.getElementById('logged-in-user-name-edit-task').innerHTML;
    let index = emptyTask.assignedContacts.indexOf(loggedInUserName);
    let checkbox = document.getElementById('checkbox-active-user-edit-task');
    if (index === -1) {
        container.classList.add('bg-navy');
        emptyTask.assignedContactsColors.push(colorForActiveUser[0]);
        emptyTask.assignedContacts.push(loggedInUserName);
        checkbox.src = "img/filled-check-box-white.svg"
    }
    else {
        container.classList.remove('bg-navy');
        emptyTask.assignedContacts.splice(index,1);
        emptyTask.assignedContactsColors.splice(index, 1);
        checkbox.src = "img/empty-check-box.svg"
    }
}

function assignTaskToContactEditTask(i) {
    let container = document.getElementById(`assign-contact-to-task${i}`);
    let contactName = document.getElementById(`assigned-contact-name-edit-task${i}`).innerHTML;
    let index = emptyTask.assignedContacts.indexOf(contactName);
    console.log(index);
    let checkbox = document.getElementById(`checkbox-edit-task${i}`);
    if (index === -1) {
        container.classList.add('bg-navy');
        emptyTask.assignedContactsColors.push(colors[i]);
        emptyTask.assignedContacts.push(contactName);
        checkbox.src = "img/filled-check-box-white.svg"
    }
    else {
        container.classList.remove('bg-navy');
        emptyTask.assignedContacts.splice(index,1);
        emptyTask.assignedContactsColors.splice(index, 1);
        checkbox.src = "img/empty-check-box.svg";
    }
}

function renderSubtasksFromEditTask() {
    let content = document.getElementById('added-subtask-main-container-edit-task');
    let subtasks = emptyTask.subtasks;
    content.innerHTML = "";
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
            content.innerHTML += /*html*/`
            <div id="single-subtask-container-edit-task${i}" class="single-subtask-container bg-grey-hover" onmouseout="hoverExitFunctionEditTask(${i})" onmouseover="hoverFunctionEditTask(${i})">
                <ul>
                    <li id="list-content-edit-task${i}" class="list-element">${subtask}</li>
                </ul>
                <div id="edit-delete-created-subtask-container-edit-task${i}" class="edit-delete-created-subtask-container d-none">
                    <img id="single-subtask-edit-edit-task${i}" class="edit-sign" onclick="OpenEditTaskInEditTask(${i})" src="img/edit.svg" alt="">
                    <div class="seperator"></div>
                    <img id="single-subtask-delete-edit-task${i}" class="delete-sign" onclick="deleteTaskInEditTask(${i})" src="img/delete.svg" alt="">
                </div>
            </div>`;
            }
}

function hoverFunctionEditTask(i) {
    let editContainer = document.getElementById(`edit-delete-created-subtask-container-edit-task${i}`);
    if (editContainer) {
        editContainer.classList.remove('d-none');
    }
}

function hoverExitFunctionEditTask(i) {
    let editContainer = document.getElementById(`edit-delete-created-subtask-container-edit-task${i}`);
    if (editContainer) {
        editContainer.classList.add('d-none');
    }
}

function OpenEditTaskInEditTask(i) {
    let content = document.getElementById(`single-subtask-container-edit-task${i}`);
    let listValue = document.getElementById(`list-content-edit-task${i}`).innerHTML;
    currentSubtask = listValue;
    console.log(currentSubtask);

    if (editMenuSubtaskIsOpenInEditTask === false) {
        content.classList.remove('bg-grey-hover');
        content.classList.add('blue-underline');
        content.innerHTML = /*html*/`
        <div class="edit-subtask-container">
                <input id="edit-task-input-edit-task${i}" class="edit-subtask-inputfield" value="${listValue}">
                <div id="delete-confirm-edit-subtask-edit-task" class="delete-confirm-edit-subtask-container">
                    <img class="delete-sign" onclick="deleteOpenEditTaskInEditTask(${i})" src="img/delete.svg" alt="">
                    <div class="seperator"></div>
                    <img class="confirm-edit" onclick="editTaskInEditTask(${i})" src="img/check-grey.svg" alt="">
                </div>
        </div>`;
        editMenuSubtaskIsOpenInEditTask = true;
    }
}

function editTaskInEditTask(i) {
    let taskElement = document.getElementById(`edit-task-input-edit-task${i}`);
    let newValue = taskElement.value;

    let doneIndex = emptyTask.doneSubtasks.indexOf(currentSubtask);

    if (doneIndex !== -1) {
        emptyTask.subtasks.splice(i, 1, newValue);
        emptyTask.doneSubtasks.splice(doneIndex, 1, newValue);
    } else {
        emptyTask.subtasks.splice(i, 1, newValue);
    }
    currentSubtask = null;

    console.log(emptyTask);
    renderSubtasksFromEditTask();
    editMenuSubtaskIsOpenInEditTask = false;
}

function deleteOpenEditTaskInEditTask(i) {
    emptyTask.subtasks.splice(i, 1);
    emptyTask.doneSubtasks.splice(i, 1);
    console.log(emptyTask);
    renderSubtasksFromEditTask();
    editMenuSubtaskIsOpenInEditTask = false;
}

function deleteTaskInEditTask(i) {
    if (editMenuSubtaskIsOpenInEditTask === false) {
        emptyTask.subtasks.splice(i, 1);
        emptyTask.doneSubtasks.splice(i, 1);
        renderSubtasksFromEditTask();
    }
}

function changeIconsSubtasksEditTask() {
    let content = document.getElementById('add-subtask-svg-container-edit-task');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container-edit-task')
    let input = document.getElementById('add-subtask-input-container-inputfield-edit-task');
    if (input.value === '') {
        content.classList.remove('d-none');
        cancelAndConfirm.classList.add('d-none');
    }
    else {
        content.classList.add('d-none');
        cancelAndConfirm.classList.remove('d-none');
    }
}

function clearSubtaskEditTask() {
    let addSignContainer = document.getElementById('add-subtask-svg-container-edit-task');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container-edit-task')
    let inputField = document.getElementById('add-subtask-input-container-inputfield-edit-task');

    inputField.value = '';
    addSignContainer.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');
}

function addSubtaskEditTask() {
    let addSignContainer = document.getElementById('add-subtask-svg-container-edit-task');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container-edit-task')
    let inputField = document.getElementById('add-subtask-input-container-inputfield-edit-task');
    let content = document.getElementById('added-subtask-main-container-edit-task');
    let subtasks = emptyTask.subtasks;
    emptyTask.subtasks.push(inputField.value);
    content.innerHTML = "";
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        content.innerHTML += /*html*/`
          <div id="single-subtask-container-edit-task${i}" class="single-subtask-container bg-grey-hover" onmouseout="hoverExitFunctionEditTask(${i})" onmouseover="hoverFunctionEditTask(${i})">
            <ul>
                <li id="list-content-edit-task${i}" class="list-element">${subtask}</li>
            </ul>
            <div id="edit-delete-created-subtask-container-edit-task${i}" class="edit-delete-created-subtask-container d-none">
                <img id="single-subtask-edit-edit-task${i}" class="edit-sign" onclick="OpenEditTaskInEditTask(${i})" src="img/edit.svg" alt="">
                <div class="seperator"></div>
                <img id="single-subtask-delete-edit-task${i}" class="delete-sign" onclick="deleteTaskInEditTask(${i})" src="img/delete.svg" alt="">
            </div>
        </div>`;
    }
    inputField.value = '';
    addSignContainer.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');
    editMenuSubtaskIsOpenInEditTask = false;
}

function newTitle() {
    let title = document.getElementById("title-edit-task").value;
    emptyTask.title = title;
    console.log(emptyTask);
}

function newDescription() {
    let description = document.getElementById("description-of-task-edit-task").value;
    emptyTask.description = description;
    console.log(emptyTask);
}

function newDate() {
    let date = document.getElementById("date-edit-task").value;
    emptyTask.deadline = date;
    console.log(emptyTask);
}

async function updateTask(path = "", data={}) {
   data = {
        id: "",
        title: emptyTask['title'],
        description: emptyTask['description'],
        deadline: emptyTask['deadline'],
        priority: emptyTask['priority'],
        subtasks: JSON.stringify(emptyTask['subtasks']),
        doneSubtasks: JSON.stringify(emptyTask['doneSubtasks']),
        assignedContacts: JSON.stringify(emptyTask['assignedContacts']),
        assignedContactsColors: JSON.stringify(emptyTask['assignedContactsColors']),
        assignedContactsId: JSON.stringify(emptyTask['assignedContactsId']),
        category: emptyTask['category'],
        status: emptyTask['status']
    };
    let response = await fetch(BASE_URL + path + ".json",{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
  return responseToJson = await response.json();
  }

 async function finalUpdateTask(index) {
    let title = document.getElementById('title-edit-task');
    let date = document.getElementById('date-edit-task');
    let titleRequiredSpan = document.getElementById('title-required-span-edit-task');
    let dateRequiredSpan = document.getElementById('date-required-span-edit-task');
    let indexOfTaskKeys = taskKeys.indexOf(emptyTask.id);
    allTasks[indexOfTaskKeys] = emptyTask;
    let key = taskKeys[indexOfTaskKeys];
    console.log(allTasks);

    checkField(title, titleRequiredSpan);
    checkField(date, dateRequiredSpan);

    if (title.value !== "" && date.value !== "") {
        await updateTask(`/tasks/${taskKeys[index]}`)
        closeEditTaskOverlay('edit-task-popup');
        updateHTML();
        renderDetailTaskSlide(key);
    }
}
