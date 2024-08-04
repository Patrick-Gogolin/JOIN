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

 function closeOverlayer() {
    let subtaskContent = document.getElementById('added-subtask-main-container');
    let title = document.getElementById('title');
    let description = document.getElementById('description-of-task');
    let date = document.getElementById('date');
    let contactsContent = document.getElementById('show-assigned-contacts');
    let category = document.getElementById('selected-task-headline');
    let addSubtaskInputfield = document.getElementById('add-subtask-input-container-inputfield');
    let searchInputfield = document.getElementById('search-contact-inputfield');
    document.getElementById('overlayer').classList.add('d-none');
    document.body.style.overflow = 'auto';
    resetAddTaskSlide(title, description, date, category, contactsContent, subtaskContent, addSubtaskInputfield, searchInputfield);
    setSubtaskInputAreaToDefault();
}

async function addTask() {
    let subtaskContent = document.getElementById('added-subtask-main-container');
    let title = document.getElementById('title');
    let description = document.getElementById('description-of-task');
    let date = document.getElementById('date');
    let contactsContent = document.getElementById('show-assigned-contacts');
    let category = document.getElementById('selected-task-headline');
    let addSubtaskInputfield = document.getElementById('add-subtask-input-container-inputfield');
    let searchInputfield = document.getElementById('search-contact-inputfield');
    
    setSubtaskInputAreaToDefault();
    messageIfRequiredFieldsAreNotFilled();

    if (title.value !== "" && date.value !== "" && category.innerHTML !== "Select task category") {
        await createTaskAndRefresh(title, description, date, category, contactsContent, subtaskContent, addSubtaskInputfield, searchInputfield);
    }
}

async function createTaskAndRefresh(title, description, date, category, contactsContent, subtaskContent, addSubtaskInputfield, searchInputfield) {
    await postTask('/tasks/');
    const successContainer = document.getElementById('task-successfull-created-container');
    successContainer.classList.remove('d-none');
    setTimeout(async () => {
        closeOverlayer();
        successContainer.classList.add('d-none');
        resetAddTaskSlide(title, description, date, category, contactsContent, subtaskContent, addSubtaskInputfield, searchInputfield);
        await getTasks('/tasks');
    }, 900);
}

function resetAddTaskSlide(title, description, date, category, contacts, subtasksContent, addSubtaskInputfield, searchInputfield) {
    resetRequiredFieldMessages();
    resetButtons();
    title.value = "";
    description.value = "";
    date.value = "";
    searchInputfield.value = "";
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

function setSubtaskInputAreaToDefault(){
    let content = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container');
    content.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');
}

function messageIfRequiredFieldsAreNotFilled() {
    let titleRequiredSpan = document.getElementById('title-required-span');
    let dateRequiredSpan = document.getElementById('date-required-span');
    let categoryRequiredSpan = document.getElementById('category-required-span');
    let selectContactsContainer = document.getElementById('select-contacts-container');
    let category = document.getElementById('selected-task-headline');

    checkField(title, titleRequiredSpan);
    checkField(date, dateRequiredSpan);
    checkCategoryField(category, categoryRequiredSpan, selectContactsContainer);
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

function checkCategoryField(category, requiredSpan, container) {
    if (category.innerHTML === "Select task category"){
        container.classList.add('this-field-required-border');
        requiredSpan.classList.remove('d-none');
    }
    else {
        container.classList.remove('this-field-required-border');
        requiredSpan.classList.add('d-none');
    }
}

function resetRequiredFieldMessages() {
    document.getElementById('title-required-span').classList.add('d-none');
    document.getElementById('date-required-span').classList.add('d-none');
    document.getElementById('category-required-span').classList.add('d-none');
    document.getElementById('date').classList.remove('this-field-required-border');
    document.getElementById('title').classList.remove('this-field-required-border');
    document.getElementById('select-contacts-container').classList.remove('this-field-required-border');
}

function openSelectCategoryContainer(event) {
    event.stopPropagation();
    let categoryContainer = document.getElementById('choose-category-container');

    if (assignOptionsContactsContainer) {
        closeContactsContainerToAssign()
    }
    if (!assignCategoryContainer) {
        categoryContainer.classList.remove('d-none');
        assignCategoryContainer = true;
    } else {
        categoryContainer.classList.add('d-none');
        assignCategoryContainer = false;
    }
}

document.addEventListener('click', function(event) {
    let contactsContainer = document.getElementById('choose-contacts-container');
    let categoryContainer = document.getElementById('choose-category-container');

    if (!contactsContainer.contains(event.target)) {
        closeContactsContainerToAssign()
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
}

function getInitialsAssignedContactsId() {
        assignedContactsInitials.length = 0;
        assignedContactsNames.map(name => {
        let nameParts = name.split(/[\s-]+/);
        let initial = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
        assignedContactsInitials.push(initial);
    });
}

function getInitials() {
        userNames.map(name => {
        let nameParts = name.split(/[\s-]+/);
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
        activeUser.push(user.name);
        activeUser.push(user.surname);
        let initials = activeUser.map(name => name.charAt(0));
        activeUserInitials = initials;
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