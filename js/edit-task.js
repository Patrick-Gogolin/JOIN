let emptyTask = null;
let urgentActiveEditTask = false;
let mediumActiveEditTask = false;
let lowActiveEditTask = false;

function OpenEditTaskWindow(id) {
    closeEditTaskOverlay('edit-task-overlayer');
    openEditTaskOverlayer('edit-task-popup');
    let content = document.getElementById('edit-task-popup');
    let index = taskKeys.indexOf(id);
    let task = allTasks[index];
    let category = task.category;
    emptyTask = JSON.parse(JSON.stringify(task));
    let {urgentClass, mediumClass, lowClass} = getPriorityClasses(task.priority);
    let {urgentClassSvg, mediumClassSvg, lowClassSvg} = getPrioritySvgPaths(task.priority);
    console.log(emptyTask);
    content.innerHTML = /*html*/`
    <div class="popup-content-edit-task">
        <img onclick="closeEditTaskOverlay('edit-task-popup')" class="close-overlayer-sign-edit-task" src="/img/x.png" alt="Cross">
        <div class="title-input-container">
                <span class="headline-input">Title<span class="red-star-required">*</span></span>
                <input id="title-edit-task" type="text" value="${task.title}" required>
                <span id="title-required-span-edit-task" class="this-field-required-span d-none">This field is required</span>
        </div>
        <div class="description-input-container">
        <span class="headline-input">Description</span>
        <textarea id="description-of-task-edit-task" class="task-description-textarea" name="" id="">${task.description}</textarea>
        </div>
        <div class="date-container">
            <span class="headline-input">Due Date<span class="red-star-required">*</span></span>
            <input id="date-edit-task" type="date" value=${task.deadline} required>
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
            <span class="headline-input">Category<span class="red-star-required">*</span></span>
            <div class="select-contacts-container" id="select-contacts-container">
                <span id="selected-task-headline-edit-task">${category}</span>
                <img onclick="openSelectCategoryContainerEditTask()" src="img/arrow-drop-down-contacts.svg" alt="">
            </div>
            <span id="category-required-span-edit-task" class="this-field-required-span d-none">This field is required</span>
            <div id="choose-category-container-edit-task" class="choose-category-container d-none">
                <div onclick="selectCategoryEditTask('select-category-technical-task-span-edit-task', 'selected-task-headline-edit-task')" class="category-to-select-container" id="select-category-technical-task">
                    <span id="select-category-technical-task-span-edit-task">Technical Task</span>
                </div>
                <div onclick="selectCategoryEditTask('select-category-user-story-span-edit-task', 'selected-task-headline-edit-task')" class="category-to-select-container" id="select-category-user-story">
                    <span id="select-category-user-story-span-edit-task">User Story</span>
                </div>
            </div>
            <span id="category-required-span" class="this-field-required-span d-none">This field is required</span>
        </div>
        <div class="assigned-to-input-container">
            <span class="headline-input">Assigned to</span>
            <div class="select-contacts-container">
                <input onkeyup="searchContacts()" id="search-contact-inputfield" type="text" placeholder="Select contacts to assign">
                <img onclick="openSelectContactsContainerEditTask()" src="img/arrow-drop-down-contacts.svg" alt="">
            </div>
            <div id="choose-contacts-container-edit-task" class="choose-contacts-container d-none">
                <div id="active-user-container-edit-task" class="d-none">
                </div>
                <div class="contacts-to-select-container" id="select-contact-container">
                </div>
            </div>
        </div>
        <div id="show-assigned-contacts-edit-task" class="show-assigned-contacts">
        </div>
        <div class="subtask-area-container">
            <div class="add-subtask-container">
                <span class="headline-input">Subtask</span>
                <div class="add-subtask-input-container">
                    <input id="add-subtask-input-container-inputfield" oninput="changeIcons()" type="text" placeholder="Add new subtask">
                    <div id="add-subtask-svg-container" class="add-subtask-svg-container">
                        <img id="add-subtask-svg" class="add-subtask-svg" src="img/addsubtask.svg" alt="">
                    </div>
                    <div id="cancel-or-confirm-subtask-container" class="cancel-or-confirm-subtask-container d-none">
                        <img onclick="clearSubtask()" src="img/cancel.svg" alt="">
                        <div class="seperator"></div>
                        <img onclick="addSubtask()" src="img/check-grey.svg" alt="">
                    </div>
                </div>
            </div>
            <div id="added-subtask-main-container" class="added-subtask-main-container">
            </div>
        </div>
    </div>`;
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
        console.log(emptyTask);
        urgentActiveEditTask = true;
    } else {
        let urgentButton = document.getElementById('urgent-button-edit-task');
        let urgentPrioSign = document.getElementById('urgent-prio-sign-edit-task');
        urgentButton.classList.remove('urgent');
        urgentPrioSign.src = 'img/urgent-prio.svg';
        emptyTask.priority = "";
        console.log(emptyTask);
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
        urgentPrioSign.src = 'img/urgent-prio-white.svg';
        emptyTask.priority = taskPriority;
        console.log(emptyTask);
        mediumActiveEditTask = true;
    } else {
        let urgentButton = document.getElementById('medium-button-edit-task');
        let urgentPrioSign = document.getElementById('medium-prio-sign-edit-task');
        urgentButton.classList.remove('medium');
        urgentPrioSign.src = 'img/urgent-prio.svg';
        emptyTask.priority = "";
        console.log(emptyTask);
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
        urgentPrioSign.src = 'img/urgent-prio-white.svg';
        emptyTask.priority = taskPriority;
        console.log(emptyTask);
        lowActiveEditTask = true;
    } else {
        let urgentButton = document.getElementById('low-button-edit-task');
        let urgentPrioSign = document.getElementById('low-prio-sign-edit-task');
        urgentButton.classList.remove('low');
        urgentPrioSign.src = 'img/urgent-prio.svg';
        emptyTask.priority = "";
        console.log(emptyTask);
        lowActiveEditTask = false;
    }
}

function resetButtonsEditTask() {
    emptyTask.Priority = "";
    let urgentButton = document.getElementById('urgent-button-edit-task');
    let urgentPrioSign = document.getElementById('urgent-prio-sign-edit-task');
    urgentButton.classList.remove('urgent');
    urgentPrioSign.src = 'img/urgent-prio.svg';
    urgentActiveEditTask = false;

    let mediumButton = document.getElementById('medium-button-edit-task');
    let mediumPrioSign = document.getElementById('medium-prio-sign-edit-task');
    mediumButton.classList.remove('medium');
    mediumPrioSign.src = 'img/medium-prio-orange.svg';
    mediumActiveEditTask = false;

    let lowButton = document.getElementById('low-button-edit-task');
    let lowPrioSign = document.getElementById('low-prio-sign-edit-task');
    lowButton.classList.remove('low');
    lowPrioSign.src = 'img/low-prio.svg';
    lowActiveEditTask = false;
}

function openSelectCategoryContainerEditTask() {
    let container = document.getElementById('choose-category-container-edit-task');
    if (assignCategoryContainer === false) {
        container.classList.remove('d-none');
        assignCategoryContainer = true;
    }
    else {
        container.classList.add('d-none');
        assignCategoryContainer = false;
    }
}

function selectCategoryEditTask(id, i) {
    let container = document.getElementById('choose-category-container-edit-task');
    category = document.getElementById(id).innerHTML;
    categoryHeadline = document.getElementById(i);
    categoryHeadline.innerHTML = category;
    container.classList.add('d-none');
    assignCategoryContainer = false;
    emptyTask.category = category;
    console.log(emptyTask);
}

function openSelectContactsContainerEditTask() {
    let container = document.getElementById('choose-contacts-container-edit-task');
    let assignedContacts = document.getElementById('show-assigned-contacts');
    if (assignOptionsContactsContainer === false) {
        container.classList.remove('d-none');
        assignOptionsContactsContainer = true;
        renderContacts();
        assignedContacts.classList.add('d-none')
    }
    else {
        container.classList.add('d-none');
        assignOptionsContactsContainer = false;
        renderAssignedContacts();
        assignedContacts.classList.remove('d-none');
    }
}
// Weiter mit dem render der Assigned Contacts in der empty Task