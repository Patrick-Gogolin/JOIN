let assignOptionsContactsContainer = false;
let assignCategoryContainer = false;
let editMenuSubtaskIsOpen = false;
let assignedCategory = "";
let subtasks = [];
let doneSubtasks = [];
let urgentActive = false;
let mediumActive = true;
let lowActive = false;
let priority = "Medium";
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

/**
 * Fetches contact data from the specified path and processes the data to populate contacts and related arrays.
 *
 * @param {string} [path=""] - The path added to the BASE URL to fetch the contact data.
 * @returns {Promise<void>} A promise that resolves once the contact data is fetched and processed.
 */
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

/**
 * Closes the task overlay and resets all input fields.
 */
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

/**
 * Adds a new task and refreshes the task list.
 * 
 */
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

/**
 * Creates a new task and refreshes the task list.
 * 
 * @param {HTMLElement} title - The title input element for the new task.
 * @param {HTMLElement} description - The description input element for the new task.
 * @param {HTMLElement} date - The date input element for the new task.
 * @param {HTMLElement} category - The category display element for the new task.
 * @param {HTMLElement} contactsContent - The contacts display element for the new task.
 * @param {HTMLElement} subtaskContent - The subtask container element for the new task.
 * @param {HTMLElement} addSubtaskInputfield - The input field for adding subtasks.
 * @param {HTMLElement} searchInputfield - The input field for searching contacts.
 */
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

/**
 * Resets the add task slide to its default state.
 * 
 * @param {HTMLElement} title - The title input element to be reset.
 * @param {HTMLElement} description - The description input element to be reset.
 * @param {HTMLElement} date - The date input element to be reset.
 * @param {HTMLElement} category - The category display element to be reset.
 * @param {HTMLElement} contacts - The contacts display element to be reset.
 * @param {HTMLElement} subtasksContent - The subtask container element to be reset.
 * @param {HTMLElement} addSubtaskInputfield - The input field for adding subtasks to be reset.
 * @param {HTMLElement} searchInputfield - The input field for searching contacts to be reset.
 */
function resetAddTaskSlide(title, description, date, category, contacts, subtasksContent, addSubtaskInputfield, searchInputfield) {
    resetRequiredFieldMessages();
    resetPriorityToDefault();
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

/**
 * Resets the subtask input area to its default state.
 *
 */
function setSubtaskInputAreaToDefault(){
    let content = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container');
    content.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');
}

/**
 * Displays error messages if required fields are not filled.
 * 
 */
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

/**
 * Checks if a field is empty and toggles the required error message.
 *
 * @param {HTMLElement} field - The input field to be checked.
 * @param {HTMLElement} requiredSpan - The span element that displays the required error message.
 */
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

/**
 * Checks if the category field is set to the default value and toggles the required error message.
 *
 * @param {HTMLElement} category - The element displaying the selected category.
 * @param {HTMLElement} requiredSpan - The span element that displays the required error message.
 * @param {HTMLElement} container - The container element that wraps the category selection.
 */
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

/**
 * Handles click events on the document to close the contacts and category containers if the click is outside of them.
 *
 * This function adds an event listener to the document that listens for click events. 
 * If the click is outside the contacts or category containers, the corresponding containers are closed.
 *
 * @param {MouseEvent} event - The click event triggered on the document.
 */
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

/**
 * Selects a category from the given category container and updates the category display.
 *
 * @param {string} id - The ID of the element containing the selected category's name.
 * @param {string} i - The ID of the element where the selected category should be displayed.
 */
function selectCategory(id, i) {
    let container = document.getElementById('choose-category-container');
    category = document.getElementById(id).innerHTML;
    categoryHeadline = document.getElementById(i);
    categoryHeadline.innerHTML = category;
    container.classList.add('d-none');
    assignCategoryContainer = false;
    assignedCategory = category;
}

/**
 * Generates initials for each contact name in the `assignedContactsNames` array and stores them in the `assignedContactsInitials` array.
 * 
 */
function getInitialsAssignedContactsId() {
        assignedContactsInitials.length = 0;
        assignedContactsNames.map(name => {
        let nameParts = name.split(/[\s-]+/);
        let initial = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
        assignedContactsInitials.push(initial);
    });
}

/**
 * Generates initials for each name in the `userNames` array and stores them in the `userNamesInitials` array.
 *
 * @returns {string[]} An array of initials corresponding to the names in `userNames`.
 */
function getInitials() {
        userNames.map(name => {
        let nameParts = name.split(/[\s-]+/);
        let initial = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
        userNamesInitials.push(initial);
        return initial;
    });
}

/**
 * Sorts the `userNames`, `userNamesInitials`, and `colors` arrays alphabetically based on the names in the `userNames` array.
 * 
 */
function sortAlphabetically() {
    let combinedArray = userNames.map((name, index) => {
        return { name: name, initial: userNamesInitials[index], color: colors[index] };
    });

    let sortedCombinedArray = combinedArray.sort((a, b) => a.name.localeCompare(b.name));
    userNames = sortedCombinedArray.map(item => item.name);
    userNamesInitials = sortedCombinedArray.map(item => item.initial);
    colors = sortedCombinedArray.map(item => item.color);
}

/**
 * Loads the active user's information from local storage and updates related variables.
 *
 * @returns {Object|null} The user object if found, otherwise `null`.
 */
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

/**
 * Sends a POST request to create a new task with the specified data.
 *
 * @param {string} [path=""] - The endpoint path where the POST request is sent. This should be the relative URL  to the task resource on the server.
 * @param {Object} [data={}] - An optional object with additional data to be sent with the request. If provided,it will be merged with the default data.
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the server.
 */
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