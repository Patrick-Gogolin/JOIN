let assignOptionsContactsContainer = false;
let assignCategoryContainer = false;
let editMenuSubtaskIsOpen = false;
let assignedCategory = "";
let subtasks = [];
let doneSubtasks = [];
let urgentActive = false;
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
let statusOfTask = null;

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
    
    loadAndGetNameOfActiveUser();
    getInitials();
    sortAlphabetically();
}

function openAddTaskOverlayer(id) {
    if(id === "todo") {
     statusOfTask = "todo"
    }
    else if(id === "progress") {
     statusOfTask = "progress"
    }
    else if(id === "feedback") {
     statusOfTask = "feedback"
    }

    document.getElementById('overlayer').classList.remove('d-none');
    document.body.style.overflow = 'hidden';
 }

 function closeOverlayer() {
    let subtaskContent = document.getElementById('added-subtask-main-container');
    let title = document.getElementById('title');
    let description = document.getElementById('description-of-task');
    let date = document.getElementById('date');
    let contactsContent = document.getElementById('show-assigned-contacts');
    let category = document.getElementById('selected-task-headline');
    let addSubtaskInputfield = document.getElementById('add-subtask-input-container-inputfield');
    let content = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container');
    content.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');
    document.getElementById('overlayer').classList.add('d-none');
    document.body.style.overflow = 'auto';
    resetAddTaskSlide(title, description, date, category, contactsContent, subtaskContent, addSubtaskInputfield);
}

async function addTask() {
    let subtaskContent = document.getElementById('added-subtask-main-container');
    let title = document.getElementById('title');
    let description = document.getElementById('description-of-task');
    let date = document.getElementById('date');
    let contactsContent = document.getElementById('show-assigned-contacts');
    let category = document.getElementById('selected-task-headline');
    let selectContactsContainer = document.getElementById('select-contacts-container');
    let titleRequiredSpan = document.getElementById('title-required-span');
    let dateRequiredSpan = document.getElementById('date-required-span');
    let categoryRequiredSpan = document.getElementById('category-required-span');
    let addSubtaskInputfield = document.getElementById('add-subtask-input-container-inputfield');
    let content = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container');
    content.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');
    
    checkField(title, titleRequiredSpan);
    checkField(date, dateRequiredSpan);

    if (category.innerHTML === "Select task category") {
        selectContactsContainer.classList.add('this-field-required-border');
        categoryRequiredSpan.classList.remove('d-none');
    }

    else {
        selectContactsContainer.classList.remove('this-field-required-border');
        categoryRequiredSpan.classList.add('d-none');
    }

    if (title.value !== "" && date.value !== "" && category.innerHTML !== "Select task category") {
        await postTask('/tasks/')
        document.getElementById('task-successfull-created-container').classList.remove('d-none');
        setTimeout(async function() {
            closeOverlayer();
            document.getElementById('task-successfull-created-container').classList.add('d-none');
            resetAddTaskSlide(title, description, date, category, contactsContent, subtaskContent, addSubtaskInputfield);
            await getTasks('/tasks');
        }, 900);
        }
}

function resetAddTaskSlide(title, description, date, category, contacts, subtasksContent, addSubtaskInputfield) {
    resetButtons();
    title.value = "";
    description.value = "";
    date.value = "";
    category.innerHTML = "Select task category";
    contacts.innerHTML = "";
    subtasksContent.innerHTML = "";
    addSubtaskInputfield.value = "";
    assignedCategory = "";
    assignedContactsNames.length = 0;
    assignedContactsInitials.length = 0;
    assignedContactsId.length = 0;
    assignedContactsColors.length = 0;
    subtasks.length = 0;
}

function checkField(field, requiredSpan) {
    if (field.value === '') {
        field.classList.add('this-field-required-border');
        requiredSpan.classList.remove('d-none');
    } else {
        requiredSpan.classList.add('d-none');
        field.classList.remove('this-field-required-border')
    }
}

function urgentPriority() {
    let urgentButton = document.getElementById('urgent-button');
    let urgentPrioSign = document.getElementById('urgent-prio-sign');

    if (!urgentActive) {
        resetButtons();
        urgentButton.classList.add('urgent');
        urgentPrioSign.src = 'img/urgent-prio-white.svg';
        priority = urgentButton.innerText;
    } else {
        urgentButton.classList.remove('urgent');
        urgentPrioSign.src = 'img/urgent-prio.svg';
        priority = "";
    }

    urgentActive = !urgentActive;
    console.log(priority);
}

function mediumPriority() {
    let mediumButton = document.getElementById('medium-button');
    let mediumPrioSign = document.getElementById('medium-prio-sign');

    if (!mediumActive) {
        resetButtons();
        mediumButton.classList.add('medium');
        mediumPrioSign.src = 'img/medium-prio.svg';
        priority = mediumButton.innerText;
    } else {
        mediumButton.classList.remove('medium');
        mediumPrioSign.src = 'img/medium-prio-orange.svg';
        priority = "";
    }

    mediumActive = !mediumActive;
    console.log(priority);
}

function lowPriority() {
    let lowButton = document.getElementById('low-button');
    let lowPrioSign = document.getElementById('low-prio-sign');

    if (!lowActive) {
        resetButtons();
        lowButton.classList.add('low');
        lowPrioSign.src = 'img/low-prio-white.svg';
        priority = lowButton.innerText;
    } else {
        lowButton.classList.remove('low');
        lowPrioSign.src = 'img/low-prio.svg';
        priority = "";
    }

    lowActive = !lowActive;
    console.log(priority);
}

function resetButtons() {
    priority = "";
    resetUrgentButton();
    resetMediumButton();
    resetLowButton();
}

function resetUrgentButton() {
    let urgentButton = document.getElementById('urgent-button');
    let urgentPrioSign = document.getElementById('urgent-prio-sign');
    urgentButton.classList.remove('urgent');
    urgentPrioSign.src = 'img/urgent-prio.svg';
    urgentActive = false;
}

function resetMediumButton() {
    let mediumButton = document.getElementById('medium-button');
    let mediumPrioSign = document.getElementById('medium-prio-sign');
    mediumButton.classList.remove('medium');
    mediumPrioSign.src = 'img/medium-prio-orange.svg';
    mediumActive = false;
}

function resetLowButton() {
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

document.addEventListener('DOMContentLoaded', (event) => {
    let inputField = document.getElementById('add-subtask-input-container-inputfield');
    
    if (inputField) {
        inputField.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                event.stopPropagation();
                addSubtask();
            }
        });
    }
});


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

function openEditSubtaskMenu(i) {
    let content = document.getElementById(`single-subtask-container${i}`);
    let listValue = document.getElementById(`list-content${i}`).innerHTML;

    if (editMenuSubtaskIsOpen === false) {
        content.classList.remove('bg-grey-hover');
        content.classList.add('blue-underline');
        content.innerHTML = renderEditSubtaskHtml(i, listValue);
        editMenuSubtaskIsOpen = true;
    }
}

function editSubtask(i) {
    let task = document.getElementById(`edit-task-input${i}`);
    subtasks.splice(i, 1, task.value);
    renderSubtasks();
    editMenuSubtaskIsOpen = false;
}

function deleteSubtaskInEditSubtaskMenu(i) {
    subtasks.splice(i, 1);
    renderSubtasks();
    editMenuSubtaskIsOpen = false;
}

function deleteSubtask(i) {
    if (editMenuSubtaskIsOpen === false) {
        subtasks.splice(i, 1);
        renderSubtasks();
    }
}

function openSelectContactsContainer(event) {
    event.stopPropagation();
    let contactsContainer = document.getElementById('choose-contacts-container');
    let assignedContacts = document.getElementById('show-assigned-contacts');
    let categoryContainer = document.getElementById('choose-category-container');

    // Schließen Sie den Kategorie-Container, wenn er geöffnet ist
    if (assignCategoryContainer) {
        categoryContainer.classList.add('d-none');
        assignCategoryContainer = false;
    }

    // Öffnen oder schließen Sie den Kontakte-Container
    if (!assignOptionsContactsContainer) {
        contactsContainer.classList.remove('d-none');
        assignOptionsContactsContainer = true;
        renderContacts();
        assignedContacts.classList.add('d-none');
    } else {
        contactsContainer.classList.add('d-none');
        assignOptionsContactsContainer = false;
        renderAssignedContacts();
        assignedContacts.classList.remove('d-none');
    }
}

function openSelectCategoryContainer(event) {
    event.stopPropagation();
    let categoryContainer = document.getElementById('choose-category-container');
    let contactsContainer = document.getElementById('choose-contacts-container');
    let assignedContacts = document.getElementById('show-assigned-contacts');

    // Schließen Sie den Kontakte-Container, wenn er geöffnet ist
    if (assignOptionsContactsContainer) {
        contactsContainer.classList.add('d-none');
        assignOptionsContactsContainer = false;
        renderAssignedContacts();
        assignedContacts.classList.remove('d-none');
    }

    // Öffnen oder schließen Sie den Kategorie-Container
    if (!assignCategoryContainer) {
        categoryContainer.classList.remove('d-none');
        assignCategoryContainer = true;
    } else {
        categoryContainer.classList.add('d-none');
        assignCategoryContainer = false;
    }
}

// Schließen Sie die Container, wenn außerhalb davon geklickt wird
document.addEventListener('click', function(event) {
    let contactsContainer = document.getElementById('choose-contacts-container');
    let categoryContainer = document.getElementById('choose-category-container');
    let assignedContacts = document.getElementById('show-assigned-contacts');

    if (!contactsContainer.contains(event.target)) {
        contactsContainer.classList.add('d-none');
        assignOptionsContactsContainer = false;
        renderAssignedContacts();
        assignedContacts.classList.remove('d-none');
    }

    if (!categoryContainer.contains(event.target)) {
        categoryContainer.classList.add('d-none');
        assignCategoryContainer = false;
    }
});

function selectCategory(id, i) {
    let container = document.getElementById('choose-category-container');
    category = document.getElementById(id).innerHTML;
    categoryHeadline = document.getElementById(i);
    categoryHeadline.innerHTML = category;
    container.classList.add('d-none');
    assignCategoryContainer = false;
    assignedCategory = category;
    console.log(assignedCategory);
}

function renderContacts() {
    let activeUserContainer = document.getElementById('active-user-container');
    let container = document.getElementById('select-contact-container');
    activeUserContainer.innerHTML = "";
    container.innerHTML = "";

    if (activeUser != "" && activeUser[0] != "Guest" ) {
        activeUserContainer.classList.remove('d-none');
        let activeUserUpdated = [activeUser.join(" ")];
        let activeUserInitialsUpdated = [activeUserInitials.join("")];

        for (let y = 0; y < activeUserUpdated.length; y++) {
            renderActiveUser(y, activeUserUpdated, activeUserContainer, activeUserInitialsUpdated);
    
            for (let i = 0; i < contacts.length; i++) {
                renderSingleContact(i, container);
            }
        }
    }
    else {
        for (let i = 0; i < contacts.length; i++) {
            renderSingleContact(i, container);
        }
    }
}

function renderActiveUser(y, activeUserUpdated, activeUserContainer, activeUserInitialsUpdated) {
    const activeUserName = activeUserUpdated[y];
    let checkBox = renderCheckBox("logged-in-user");
    let bgColor = assignedContactsId.indexOf('logged-in-user') !== -1 ? 'bg-navy' : 'bg-white';
    activeUserContainer.innerHTML = renderActiveUserHtml(activeUserName, activeUserInitialsUpdated, y, checkBox, bgColor, colorForActiveUser);
}

function renderSingleContact(index, container) {
    const color = colors[index];
    const userName = userNames[index];
    const userNameInitial = userNamesInitials[index];
    let checkBoxContacts = renderCheckBox(index);
    let bgColor = assignedContactsId.indexOf(index) !== -1 ? 'bg-navy' : 'bg-white';
    container.innerHTML += renderContactsHtml(color, userName, userNameInitial, bgColor, checkBoxContacts, index);
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
        checkbox.src = "img/filled-check-box-white.svg"
    }
    else {
        container.classList.remove('bg-navy');
        assignedContactsColors.splice(index,1);
        assignedContactsNames.splice(index, 1);
        assignedContactsId.splice(index, 1);
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
        checkbox.src = "img/filled-check-box-white.svg"
    }
    else {
        container.classList.remove('bg-navy');
        assignedContactsColors.splice(index,1);
        assignedContactsNames.splice(index, 1);
        assignedContactsId.splice(index, 1);
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
        assignedContactsContainer.innerHTML += renderAssignedContactsHtml(color, initials);
    }
}

function getInitialsAssignedContactsId() {
        assignedContactsInitials.length = 0;
    let initials = assignedContactsNames.map(name => {
        let nameParts = name.split(/[\s-]+/);
        let initial = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
         assignedContactsInitials.push(initial);
    });
}

function searchContacts() {
    let search = document.getElementById('search-contact-inputfield').value.toLowerCase().trim();
    let content = document.getElementById('select-contact-container');
    let activeUserContainer = document.getElementById('active-user-container');
    let container = document.getElementById('choose-contacts-container');
    let assignedContacts = document.getElementById('show-assigned-contacts');
    content.innerHTML = '';

    if(search.length > 0) {
        container.classList.remove('d-none');
        assignOptionsContactsContainer = true;
        assignedContacts.classList.add('d-none');
    }
    else {
        container.classList.add('d-none');
        assignOptionsContactsContainer = false;
        assignedContacts.classList.remove('d-none');
        renderAssignedContacts();
    }

    if (activeUser.length > 0 && activeUser[0] != "Guest") { 
        let activeUserUpdated = activeUser.join(" ");
        let activeUserInitialsUpdated = activeUserInitials.join("");
        let checkBox = renderCheckBox("logged-in-user");
        let bgColor = assignedContactsId.includes('logged-in-user') ? 'bg-navy' : 'bg-white';
        let color = colorForActiveUser;

        if (activeUserUpdated.toLowerCase().includes(search)) {
            activeUserContainer.classList.remove('d-none');
            activeUserContainer.innerHTML = /*html*/`
            <div id="logged-in-user" onclick="assignTaskToLoggedInUser('logged-in-user')" class="single-contact-container ${bgColor}">
                <div class="single-contact-name-container">
                    <div class="contact-name-initials-container" style="background-color: ${color};">
                        <span class="user-initials-span">${activeUserInitialsUpdated}</span>
                    </div>
                    <span id="logged-in-user-name">${activeUserUpdated}</span><span>(You)</span>
                </div>
                <div>
                    <img id="checkbox-active-user" src=${checkBox} alt="Checkbox">
                </div>
            </div>`;
        } else {
            activeUserContainer.innerHTML = '';
        }
    } else {
        activeUserContainer.classList.add('d-none');
    }

    for (let i = 0; i < userNames.length; i++) {
        let checkBox = renderCheckBox(i);
        const userName = userNames[i];
        const userNameLowerCase = userName.toLowerCase();
        const color = colors[i];
        const userNameInitial = userNamesInitials[i];
        let bgColor = assignedContactsId.includes(i) ? 'bg-navy' : 'bg-white';

        if (userNameLowerCase.includes(search)) {
            content.innerHTML += /*html*/`
            <div id="${i}" onclick="assignTaskToContact(${i})" class="single-contact-container ${bgColor}">
                <div class="single-contact-name-container">
                    <div class="contact-name-initials-container" style="background-color: ${color};">
                        <span class="user-initials-span">${userNameInitial}</span>
                    </div>
                    <span id="assigned-contact-name${i}">${userName}</span>
                </div>
                <div>
                    <img id="checkbox${i}" src=${checkBox} alt="Checkbox">
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
}

function sortAlphabetically() {
    let combinedArray = userNames.map((name, index) => {
        return { name: name, initial: userNamesInitials[index], color: colors[index] };
    });

    let sortedCombinedArray = combinedArray.sort((a, b) => a.name.localeCompare(b.name));
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

        return user;
    } else {
        console.log("user not found");
        return null;
    }
}

async function postTask(path = "", data={}) {
    let taskTitle = document.getElementById('title').value;
    let taskDescription = document.getElementById('description-of-task').value;
    let date = document.getElementById('date').value;

    data = {
        id: "",
        title: taskTitle,
        description: taskDescription,
        deadline: date,
        priority: priority,
        subtasks: JSON.stringify(subtasks),
        doneSubtasks: JSON.stringify(doneSubtasks),
        assignedContacts: JSON.stringify(assignedContactsNames),
        assignedContactsColors: JSON.stringify(assignedContactsColors),
        assignedContactsId: JSON.stringify(assignedContactsId),
        category: assignedCategory,
        status: statusOfTask
    };

    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseToJson = await response.json();
}

document.addEventListener('DOMContentLoaded', function() {
    // Set default mobile width and height thresholds
    const mobileWidthPortrait = 768;  // Width threshold for mobile portrait mode
    const mobileHeightPortrait = 1024; // Height threshold for mobile portrait mode
  
    const mobileWidthLandscape = 1024; // Width threshold for mobile landscape mode
    const mobileHeightLandscape = 768; // Height threshold for mobile landscape mode
  
    // Define a maximum width to distinguish between mobile and desktop
    const maxMobileWidth = 932;  // This should be the upper limit for mobile devices
  
    // Function to check orientation and display the warning if needed
    function checkOrientation() {
      const isLandscape = window.innerWidth > window.innerHeight;
  
      // Check if the screen width is less than or equal to the maxMobileWidth
      const isMobile = window.innerWidth <= maxMobileWidth;
  
      // Conditions for showing the warning
      const isMobilePortrait = isMobile && window.innerWidth <= mobileWidthPortrait && window.innerHeight <= mobileHeightPortrait;
      const isMobileLandscape = isMobile && window.innerWidth <= mobileWidthLandscape && window.innerHeight <= mobileHeightLandscape;
  
      // Show the warning if the device is in landscape mode and fits mobile dimensions
      if (isLandscape && (isMobilePortrait || isMobileLandscape)) {
        document.getElementById('landscape-warning').classList.add('visible');
      } else {
        document.getElementById('landscape-warning').classList.remove('visible');
      }
    }
  
    // Initial check
    checkOrientation();
  
    // Check orientation on resize/orientation change
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
  });