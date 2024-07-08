const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"
let assignOptionsContactsContainer = false;
let assignCategoryContainer = false;
let editMenuSubtaskIsOpen = false;
let assignedCategory = "";
let subtasks = [];
let urgentActive = false; // für Die Buttons beim Addtask Formular
let mediumActive = false;
let lowActive = false;
let priority = "";
let assignedTaskToLoggedInUser = false;
let contacts = [];
let userNames = [];
let userNamesInitials = [];
let colors = [];
let activeUser = [];
let activeUserInitials = null;
let colorForActiveUser = ["rgb(0,190,232)"];
let assignedContactsNames = [];
let assignedContactsInitials = [];
let assignedContactsId = [];
let assignedContactsColors =[];


let currentDraggedElement;
let todos = [{
    'id' : 0,
    'title': 'Implement Login Feature',
    'content': 'Create login page and integrate authentication.',
    'status': 'todo'
}, {
    'id' : 1,
    'title': 'Fix Bugs in Payment Module',
    'content': 'Resolve issues with payment processing and improve error handling.',
    'status': 'progress'
}, {
    'id' : 2,
    'title': 'Code Review for Registration Module',
    'content': 'Review the code for the registration module and provide feedback.',
    'status': 'feedback'
}, {
    'id' : 3,
    'title': 'Complete Unit Tests for User Profile',
    'content': 'Write and run unit tests for the user profile functionality.',
    'status': 'done'
}, {
    'id' : 4,
    'title': 'Optimize Query Performance',
    'content': 'Analyze and optimize slow database queries.',
    'status': 'done'
}, {
    'id' : 5,
    'title': 'Integrate Third-Party APIs',
    'content': 'Integrate third-party APIs for weather and news updates.',
    'status': 'progress'
},];


async function getContacts(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    console.log(responseToJson);
    let contactsKeys = Object.keys(responseToJson);

    for (let i = 0; i < contactsKeys.length; i++) {
        contacts.push({
            id: contactsKeys[i],
            name: responseToJson[contactsKeys[i]]['name'],
            color: responseToJson[contactsKeys[i]]['color'],
        });
        userNames.push(responseToJson[contactsKeys[i]]['name']);
        colors.push(responseToJson[contactsKeys[i]]['color']);
    }

    loadAndGetNameOfActiveUser();
    getInitials();
    sortAlphabetically();
}



function openAddTaskOverlayer() {
    document.getElementById('overlayer').classList.remove('d-none');
}

function closeOverlayer() {
    document.getElementById('overlayer').classList.add('d-none');
}

function addTask() {
    let title = document.getElementById('title');
    let date = document.getElementById('date');
    let category = document.getElementById('category');
    let titleRequiredSpan = document.getElementById('title-required-span');
    let dateRequiredSpan = document.getElementById('date-required-span');
    let categoryRequiredSpan = document.getElementById('category-required-span');

    let hasError = false;

    if (checkField(title, titleRequiredSpan)) {
        hasError = true;
    }
    if (checkField(date, dateRequiredSpan)) {
        hasError = true;
    }
    if (checkField(category, categoryRequiredSpan)) {
        hasError = true;
    }
}

function checkField(field, requiredSpan) {
    if (field.value === '') {
        field.classList.add('this-field-required-border');
        requiredSpan.classList.remove('d-none');
        return true;
    } else {
        requiredSpan.classList.add('d-none');
        field.classList.remove('this-field-required-border')
        return false;
    }
}

function urgentPriority() {
    if (!urgentActive) {
        resetButtons();
        let urgentButton = document.getElementById('urgent-button');
        let urgentPrioSign = document.getElementById('urgent-prio-sign');
        let taskPriority = urgentButton.innerText;
        urgentButton.classList.add('urgent');
        urgentPrioSign.src = 'img/urgent-prio-white.svg';
        priority = taskPriority;
        console.log(priority);
        urgentActive = true;
    } else {
        let urgentButton = document.getElementById('urgent-button');
        let urgentPrioSign = document.getElementById('urgent-prio-sign');
        urgentButton.classList.remove('urgent');
        urgentPrioSign.src = 'img/urgent-prio.svg';
        priority.length = 0;
        console.log(priority);
        urgentActive = false;
    }
}

function mediumPriority() {
    if (!mediumActive) {
        resetButtons();
        let mediumButton = document.getElementById('medium-button');
        let mediumPrioSign = document.getElementById('medium-prio-sign');
        let taskPriority = mediumButton.innerText;
        mediumButton.classList.add('medium');
        mediumPrioSign.src = 'img/medium-prio.svg';
        priority = taskPriority;
        console.log(priority);
        mediumActive = true;
    } else {
        let mediumButton = document.getElementById('medium-button');
        let mediumPrioSign = document.getElementById('medium-prio-sign');
        mediumButton.classList.remove('medium');
        mediumPrioSign.src = 'img/medium-prio-orange.svg';
        priority.length = 0;
        console.log(priority);
        mediumActive = false;
    }
}

function lowPriority() {
    if (!lowActive) {
        resetButtons();
        let lowButton = document.getElementById('low-button');
        let lowPrioSign = document.getElementById('low-prio-sign');
        let taskPriority = lowButton.innerText;
        lowButton.classList.add('low');
        lowPrioSign.src = 'img/low-prio-white.svg';
        priority = taskPriority;
        console.log(priority);
        lowActive = true;
    } else {
        let lowButton = document.getElementById('low-button');
        let lowPrioSign = document.getElementById('low-prio-sign');
        lowButton.classList.remove('low');
        lowPrioSign.src = 'img/low-prio.svg';
        priority.length = 0;
        console.log(priority);
        lowActive = false;
    }
}

function resetButtons() {
    priority = "";
    let urgentButton = document.getElementById('urgent-button');
    let urgentPrioSign = document.getElementById('urgent-prio-sign');
    urgentButton.classList.remove('urgent');
    urgentPrioSign.src = 'img/urgent-prio.svg';
    urgentActive = false;

    let mediumButton = document.getElementById('medium-button');
    let mediumPrioSign = document.getElementById('medium-prio-sign');
    mediumButton.classList.remove('medium');
    mediumPrioSign.src = 'img/medium-prio-orange.svg';
    mediumActive = false;

    let lowButton = document.getElementById('low-button');
    let lowPrioSign = document.getElementById('low-prio-sign');
    lowButton.classList.remove('low');
    lowPrioSign.src = 'img/low-prio.svg';
    lowActive = false;
}

function changeIcons() {
    let content = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container')
    let input = document.getElementById('add-subtask-input-container-inputfield');
    if (input.value === '') {
        content.classList.remove('d-none');
        cancelAndConfirm.classList.add('d-none');
    }
    else {
        content.classList.add('d-none');
        cancelAndConfirm.classList.remove('d-none');
    }
}

function addSubtask() {
    let addSignContainer = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container')
    let inputField = document.getElementById('add-subtask-input-container-inputfield');
    let content = document.getElementById('added-subtask-main-container');
    subtasks.push(inputField.value);
    content.innerHTML = "";
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        content.innerHTML += renderAddedSubtasksHtml(i, subtask);
    }
    inputField.value = '';
    addSignContainer.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');
    editMenuSubtaskIsOpen = false;
}

function renderSubtasks() {
    let content = document.getElementById('added-subtask-main-container');
    content.innerHTML = "";
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        content.innerHTML += renderAddedSubtasksHtml(i, subtask);
    }
}

function clearSubtask() {
    let addSignContainer = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container')
    let inputField = document.getElementById('add-subtask-input-container-inputfield');

    inputField.value = '';
    addSignContainer.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');
}

function hoverFunction(i) {
    let editContainer = document.getElementById(`edit-delete-created-subtask-container${i}`);
    if (editContainer) {
        editContainer.classList.remove('d-none');
    }
}

function hoverExitFunction(i) {
    let editContainer = document.getElementById(`edit-delete-created-subtask-container${i}`);
    if (editContainer) {
        editContainer.classList.add('d-none');
    }
}

function OpenEditTask(i) {
    let content = document.getElementById(`single-subtask-container${i}`);
    let listValue = document.getElementById(`list-content${i}`).innerHTML;

    if (editMenuSubtaskIsOpen === false) {
        content.classList.remove('bg-grey-hover');
        content.classList.add('blue-underline');
        content.innerHTML = renderOpenEditHtml(i, listValue);
        editMenuSubtaskIsOpen = true;
    }
}

function editTask(i) {
    let task = document.getElementById(`edit-task-input${i}`);
    subtasks.splice(i, 1, task.value);
    renderSubtasks();
    editMenuSubtaskIsOpen = false;
}

function deleteOpenEditTask(i) {
    subtasks.splice(i, 1);
    renderSubtasks();
    editMenuSubtaskIsOpen = false;
}

function deleteTask(i) {
    if (editMenuSubtaskIsOpen === false) {
        subtasks.splice(i, 1);
        renderSubtasks();
    }
}

function openSelectContactsContainer() {
    let container = document.getElementById('choose-contacts-container');
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

function openSelectCategoryContainer() {
    let container = document.getElementById('choose-category-container');
    if (assignCategoryContainer === false) {
        container.classList.remove('d-none');
        assignCategoryContainer = true;
    }
    else {
        container.classList.add('d-none');
        assignCategoryContainer = false;
    }
}

function selectCategory (id, i) {
    let container = document.getElementById('choose-category-container');
    category = document.getElementById(id).innerHTML;
    categoryHeadline = document.getElementById(i);
    categoryHeadline.innerHTML = category;
    container.classList.add('d-none');
    assignCategoryContainer = false;
    assignedCategory = category;
    console.log(assignedCategory);
}

// Problem: Was bei Guest Reundern (IfAbfrage?) Initials vom Active User generieren lassen und abbilden//
function renderContacts() {
    let activeUserContainer = document.getElementById('active-user-container');
    let container = document.getElementById('select-contact-container');
    activeUserContainer.innerHTML = "";
    container.innerHTML = "";

    if (activeUser != "") {
        activeUserContainer.classList.remove('d-none');
        let activeUserUpdated = [activeUser.join(" ")];
        let activeUserInitialsUpdated = [activeUserInitials.join("")];

        for (let y = 0; y < activeUserUpdated.length; y++) {
            const activeUserName = activeUserUpdated[y];
            let checkBox = renderCheckBox("logged-in-user");
            let bgColor = assignedContactsId.indexOf('logged-in-user') !== -1 ? 'bg-navy' : 'bg-white';
            activeUserContainer.innerHTML = /*html*/`
            <div id="logged-in-user" onclick="assignTaskToLoggedInUser('logged-in-user')" class="single-contact-container ${bgColor}">
                <div class="single-contact-name-container">
                    <div class="contact-name-initials-container" style="background-color: ${colorForActiveUser[y]};">
                        <span class="user-initials-span">${activeUserInitialsUpdated}</span>
                    </div>
                    <span id="logged-in-user-name">${activeUserName}</span><span>(You)</span>
                </div>
                <div>
                    <img id="checkbox-active-user" src=${checkBox} alt="Checkbox">
                </div>
            </div>`;
    
            for (let i = 0; i < contacts.length; i++) {
                const color = colors[i];
                const userName = userNames[i];
                const userNameInitial = userNamesInitials[i];
                let checkBoxContacts = renderCheckBox(i);
                let bgColor = assignedContactsId.indexOf(i) !== -1 ? 'bg-navy' : 'bg-white'
                container.innerHTML += /*html*/`
        <div id="${i}" onclick="assignTaskToContact(${i})"  class="single-contact-container ${bgColor}">
            <div class="single-contact-name-container">
                <div class="contact-name-initials-container" style="background-color: ${color};">
                    <span class="user-initials-span">${userNameInitial}</span>
                </div>
                <span id="assigned-contact-name${i}">${userName}</span>
            </div>
            <div>
                <img id="checkbox${i}" src=${checkBoxContacts} alt="Checkbox">
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
             let checkBoxContacts = renderCheckBox(i);
            let bgColor = assignedContactsId.indexOf(i) !== -1 ? 'bg-navy' : 'bg-white'
            container.innerHTML += /*html*/`
     <div id="${i}" onclick="assignTaskToContact(${i})"  class="single-contact-container ${bgColor}">
        <div class="single-contact-name-container">
            <div class="contact-name-initials-container" style="background-color: ${color};">
                <span class="user-initials-span">${userNameInitial}</span>
            </div>
            <span id="assigned-contact-name${i}">${userName}</span>
        </div>
        <div>
            <img id="checkbox${i}" src=${checkBoxContacts} alt="Checkbox">
        </div>
    </div>`;
    }
 

}

}

function assignTaskToLoggedInUser(i) {
    let container = document.getElementById(i);
    let loggedInUserName = document.getElementById('logged-in-user-name').innerHTML;
    let index = assignedContactsId.indexOf(i);
    let checkbox = document.getElementById('checkbox-active-user');
    if (index === -1) {
        container.classList.add('bg-navy');
        assignedContactsColors.push(colorForActiveUser[0]);
        assignedContactsId.push(i);
        assignedContactsNames.push(loggedInUserName)
        console.log(assignedContactsId);
        console.log(assignedContactsNames);
        console.log(assignedContactsColors);
        checkbox.src = "img/filled-check-box-white.svg"
    }
    else {
        container.classList.remove('bg-navy');
        assignedContactsColors.splice(index,1);
        assignedContactsNames.splice(index, 1);
        assignedContactsId.splice(index, 1);
        console.log(assignedContactsId);
        console.log(assignedContactsNames);
        console.log(assignedContactsColors);
        checkbox.src = "img/empty-check-box.svg"
    }
}

function assignTaskToContact(i) {
    let container = document.getElementById(i);
    let contactName = document.getElementById(`assigned-contact-name${i}`).innerHTML;
    let index = assignedContactsId.indexOf(i);
    let checkbox = document.getElementById(`checkbox${i}`);
    if (index === -1) {
        container.classList.add('bg-navy');
        assignedContactsColors.push(colors[i]);
        assignedContactsId.push(i);
        assignedContactsNames.push(contactName)
        console.log(assignedContactsId);
        console.log(assignedContactsNames);
        console.log(assignedContactsColors);
        checkbox.src = "img/filled-check-box-white.svg"
    }
    else {
        container.classList.remove('bg-navy');
        assignedContactsColors.splice(index,1);
        assignedContactsNames.splice(index, 1);
        assignedContactsId.splice(index, 1);
        console.log(assignedContactsId);
        console.log(assignedContactsNames);
        console.log(assignedContactsColors);
        checkbox.src = "img/empty-check-box.svg";
    }
}


function renderCheckBox(id) {
    if(assignedContactsId.length === 0) {
        return "img/empty-check-box.svg";
    }
    else if(assignedContactsId.indexOf(id) !== -1) {
        return "img/filled-check-box-white.svg"
    }
    else {
        return "img/empty-check-box.svg";
    }
}

function renderAssignedContacts() {
    getInitialsAssignedContactsId();
    let assignedContactsContainer = document.getElementById('show-assigned-contacts');
    assignedContactsContainer.innerHTML = "";
    for (let i = 0; i < assignedContactsInitials.length; i++) {
        const initials = assignedContactsInitials[i];
        const color = assignedContactsColors[i];
        assignedContactsContainer.innerHTML += /*html*/`
        <div class="contact-name-initials-container" style="background-color: ${color}">
            <span class="user-initials-span">${initials}</span>
        </div>`;
        
    }
}

function getInitialsAssignedContactsId() {
        assignedContactsInitials.length = 0;
    let initials = assignedContactsNames.map(name => {
        let nameParts = name.split(/[\s-]+/); // Split by space or hyphen
        let initial = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
        if(assignedContactsInitials.indexOf(initial) === -1) {
            assignedContactsInitials.push(initial);
        }
    });
    console.log(assignedContactsInitials);
}


// Hier weiter
function searchContacts() {
    let search = document.getElementById('search-contact-inputfield').value.toLowerCase().trim();
    let content = document.getElementById('choose-contacts-container');
    content.innerHTML = '';

    for (let i = 0; i < userNames.length; i++) {
        let checkBox = renderCheckBox(i);
        const userName = userNames[i];
        const userNameLowerCase = userNames[i].toLowerCase();
        const color = colors[i];
        const userNameInitial = userNamesInitials[i];

        if (userNameLowerCase.includes(search)) {
            content.innerHTML += /*html*/`
            <div id="${i}"onclick="assignTaskToContact(${i})" class="single-contact-container">
                <div class="single-contact-name-container">
                    <div class="contact-name-initials-container" style="background-color: ${color};">
                        <span class="user-initials-span">${userNameInitial}</span>
                    </div>
                    <span id="assigned-contact-name${i}">${userName}</span>
                </div>
                <div>
                    <img id="checkbox-active-user" src=${checkBox} alt="Checkbox">
                </div>
            </div>`;
        }
    }
}



function getInitials() {
    let initials = userNames.map(name => {
        let nameParts = name.split(/[\s-]+/); // Split by space or hyphen
        let initial = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
        userNamesInitials.push(initial);
        return initial;
    });
    console.log(userNamesInitials);
}

function sortAlphabetically() {
    // Erstelle ein Array von Objekten mit Namen und Initialen
    let combinedArray = userNames.map((name, index) => {
        return { name: name, initial: userNamesInitials[index], color: colors[index] };
    });

    // Sortiere das kombinierte Array nach den Namen
     let sortedCombinedArray = combinedArray.sort((a, b) => a.name.localeCompare(b.name));

    // Extrahiere die sortierten Namen und Initialen in separate Arrays
    userNames = sortedCombinedArray.map(item => item.name);
    userNamesInitials = sortedCombinedArray.map(item => item.initial);
    colors = sortedCombinedArray.map(item => item.color);

}

function loadAndGetNameOfActiveUser() {
    let userAsText = localStorage.getItem('user');
    if (userAsText) {
        let user = JSON.parse(userAsText);
        console.log(user);
        activeUser.push(user.name);
        activeUser.push(user.surname);
        console.log(activeUser);
        let initials = activeUser.map(name => name.charAt(0));
        activeUserInitials = initials;
        console.log(activeUserInitials);

        return user; // User zurückgeben
    } else {
        console.log("user not found");
        return null; // Null zurückgeben, wenn kein Benutzer gefunden wird
    }
}

async function postTask(path = "", data={}) {
    let taskTitle = document.getElementById('title').value;
    let taskDescription = document.getElementById('description-of-task').value;
    let date = document.getElementById('date').value;

    data = {
        title: taskTitle,
        description: taskDescription,
        deadline: date,
        priority: priority,
        subtasks: JSON.stringify(subtasks),
        assignedContacts: JSON.stringify(assignedContactsNames),
        assignedContactsColors: JSON.stringify(assignedContactsColors),
        category: assignedCategory,
    };

    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    console.log(response);
    return responseToJson = await response.json();

}


//----------------------------------- Drag-and-Drop --------------------------------------//

function updateHTML() {
    updateCategory('todo', 'To Do');
    updateCategory('progress', 'in Progress');
    updateCategory('feedback', 'Awaiting Feedback');
    updateCategory('done', 'Done');
}

function updateCategory(category, displayText) {
    let tasks = todos.filter(t => t['status'] === category);

    let container = document.getElementById(category);
    container.innerHTML = '';

    if (tasks.length === 0) {
        container.innerHTML = `<div class="create-task-container">No tasks ${displayText}</div>`;
    } else {
        for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            container.innerHTML += generateTodoHTML(element);
        }
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element) {
    return `
        <div draggable="true" ondragstart="startDragging(${element['id']})" class="new-task-container">
            <div class="user-story-container">
                <span>User Story</span>
            </div>
            <div class="title-content-container">
                <h2>${element['title']}</h2>
                <span>${element['content']}</span>
            </div>
        </div>
    `;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    todos[currentDraggedElement]['status'] = category;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

//----------------------------------- Drag-and-Drop Ende --------------------------------------//