const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"
let assignOptionsContactsContainer = false;
let editMenuSubtaskIsOpen = false;
let subtasks = [];
let urgentActive = false; // für Die Buttons beim Addtask Formular
let mediumActive = false;
let lowActive = false;
let contacts = [];
let userNames = [];
let userNamesInitials = [];
let colors = [];
let activeUser = [];
let activeUserInitials = [];
let colorForActiveUser = ["rgb(0,190,232)"];

async function getContacts(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
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

    console.log(contactsKeys);
    console.log(contacts);
    console.log(userNames);
    console.log(colors);
    loadAndGetNameOfActiveUser();
    getInitials();
    sortAlphabetically();
    console.log(activeUser);
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
        urgentButton.classList.add('urgent');
        urgentPrioSign.src = 'img/urgent-prio-white.svg';
        urgentActive = true;
    } else {
        let urgentButton = document.getElementById('urgent-button');
        let urgentPrioSign = document.getElementById('urgent-prio-sign');
        urgentButton.classList.remove('urgent');
        urgentPrioSign.src = 'img/urgent-prio.svg';
        urgentActive = false;
    }
}

function mediumPriority() {
    if (!mediumActive) {
        resetButtons();
        let mediumButton = document.getElementById('medium-button');
        let mediumPrioSign = document.getElementById('medium-prio-sign');
        mediumButton.classList.add('medium');
        mediumPrioSign.src = 'img/medium-prio.svg';
        mediumActive = true;
    } else {
        let mediumButton = document.getElementById('medium-button');
        let mediumPrioSign = document.getElementById('medium-prio-sign');
        mediumButton.classList.remove('medium');
        mediumPrioSign.src = 'img/medium-prio-orange.svg';
        mediumActive = false;
    }
}

function lowPriority() {
    if (!lowActive) {
        resetButtons();
        let lowButton = document.getElementById('low-button');
        let lowPrioSign = document.getElementById('low-prio-sign');
        lowButton.classList.add('low');
        lowPrioSign.src = 'img/low-prio-white.svg';
        lowActive = true;
    } else {
        let lowButton = document.getElementById('low-button');
        let lowPrioSign = document.getElementById('low-prio-sign');
        lowButton.classList.remove('low');
        lowPrioSign.src = 'img/low-prio.svg';
        lowActive = false;
    }
}

function resetButtons() {
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
    if (assignOptionsContactsContainer === false) {
        container.classList.remove('d-none');
        assignOptionsContactsContainer = true;
        renderContacts();
    }
    else {
        container.classList.add('d-none');
        assignOptionsContactsContainer = false;
    }
}

function renderContacts() {
    let activeUserUpdated = [activeUser.join(" ")];
    let activeUserContainer = document.getElementById('active-user-container');
    let container = document.getElementById('choose-contacts-container');
    for (let y = 0; y < activeUserUpdated.length; y++) {
        const activeUserName = activeUserUpdated[y];
        activeUserContainer.innerHTML = /*html*/`
        <div id="${y}" class="single-contact-container">
            <div class="single-contact-name-container">
                <div class="contact-name-initials-cotainer" style="background-color: ${colorForActiveUser[y]};">
                    <span class="user-initials-span">PG</span>
                </div>
                <span>${activeUserName} (You) </span>
            </div>
            <div><input type="checkbox"></div>
        </div>`;

        for (let i = 0; i < contacts.length; i++) {
            const color = colors[i];
            const userName = userNames[i];
            const userNameInitial = userNamesInitials[i];
            container.innerHTML += /*html*/`
    <div id="${i}" class="single-contact-container">
        <div class="single-contact-name-container">
            <div class="contact-name-initials-cotainer" style="background-color: ${color};">
                <span class="user-initials-span">${userNameInitial}</span>
            </div>
            <span>${userName}</span>
        </div>
        <div><input type="checkbox"></div>
    </div>`;

        }
    }

    console.log(activeUser);
    console.log(activeUserUpdated);
}

function getInitials() {
    let initials = userNames.map(name => {
        let nameParts = name.split(/[\s-]+/); // Split by space or hyphen
        let initial = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
        userNamesInitials.push(initial);
        return initial;
    });

    console.log(initials); // Die Initials von Anfang an erstelllen lassen mit der Async Funtion ist sinnvoller !!!
}

function sortAlphabetically() {
    // Erstelle ein Array von Objekten mit Namen und Initialen
    let combinedArray = userNames.map((name, index) => {
        return { name: name, initial: userNamesInitials[index], color: colors[index] };
    });

    // Sortiere das kombinierte Array nach den Namen
    combinedArray.sort((a, b) => a.name.localeCompare(b.name));

    // Extrahiere die sortierten Namen und Initialen in separate Arrays
    userNames = combinedArray.map(item => item.name);
    userNamesInitials = combinedArray.map(item => item.initial);
    colors = combinedArray.map(item => item.color);

    console.log(userNames);
    console.log(userNamesInitials);
    console.log(colors);
}

function loadAndGetNameOfActiveUser() {
    let userAsText = localStorage.getItem('user');
    if (userAsText) {
        let user = JSON.parse(userAsText);
        console.log(user);
        activeUser.push(user.name);
        activeUser.push(user.surname);
        let initials = activeUser.map(name => name.charAt(0));
        activeUserInitials.push(initials);
        console.log(activeUserInitials);

        return user; // User zurückgeben
    } else {
        console.log("user not found");
        return null; // Null zurückgeben, wenn kein Benutzer gefunden wird
    }
}
