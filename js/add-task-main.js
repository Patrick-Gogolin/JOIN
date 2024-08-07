/**
 *
 * Adds a new task with its associated subtasks, description, date, contacts, and category.
 * This function validates the required fields (title, date, and category) and creates the task if valid.
 * It refreshes the task view after creation.
 * 
 */
async function addTaskMain() {
    let subtaskContent = document.getElementById('added-subtask-main-container');
    let title = document.getElementById('title');
    let description = document.getElementById('description-of-task');
    let date = document.getElementById('date');
    let contactsContent = document.getElementById('show-assigned-contacts');
    let category = document.getElementById('selected-task-headline');
    statusOfTask = "todo";
    let addSubtaskInputfield = document.getElementById('add-subtask-input-container-inputfield-main');
    let searchInputfield = document.getElementById('search-contact-inputfield-main');
    
    setSubtaskInputAreaInEditTaskToDefault();
    messageIfRequiredFieldsAreNotFilledInEditTask();

    if (title.value !== "" && date.value !== "" && category.innerHTML !== "Select task category") {
        await createTaskAndRefreshEditTask(title, description, date, category, contactsContent, subtaskContent, addSubtaskInputfield, searchInputfield);
        }
}

/**
 *
 * Creates a new task by sending a POST request and refreshes the edit task view upon success.
 * This function displays a success message, waits for a short duration, redirects to the board page,
 * hides the success message, resets the add task form, and retrieves the updated list of tasks.
 *
 * @function createTaskAndRefreshEditTask
 * @param {HTMLElement} title - The title of the task.
 * @param {HTMLElement} description - The description of the task.
 * @param {HTMLElement} date - The due date of the task.
 * @param {HTMLElement} category - The category of the task.
 * @param {HTMLElement} contactsContent - The container showing the assigned contacts.
 * @param {HTMLElement} subtaskContent - The container holding the subtasks.
 * @param {HTMLElement} addSubtaskInputfield - The input field for adding a subtask.
 * @param {HTMLElement} searchInputfield - The input field for searching contacts.
 */
async function createTaskAndRefreshEditTask(title, description, date, category, contactsContent, subtaskContent, addSubtaskInputfield, searchInputfield) {
    await postTask('/tasks/');
    const successContainer = document.getElementById('task-successfull-created-container');
    successContainer.classList.remove('d-none');
    setTimeout(async () => {
        window.location.href = 'board.html';
        successContainer.classList.add('d-none');
        resetAddTaskSlide(title, description, date, category, contactsContent, subtaskContent, addSubtaskInputfield, searchInputfield);
        await getTasks('/tasks');
    }, 900);
}

/**
 *
 * Clears the subtask input field and updates the visibility of related UI elements.
 * This function resets the value of the subtask input field to an empty string and adjusts the visibility
 * of the UI elements associated with adding a subtask. Specifically, it makes the "add subtask" icon visible
 * and hides the "cancel or confirm" container, which typically contains buttons for canceling or confirming the
 * addition of a subtask.
 */
function setSubtaskInputAreaInEditTaskToDefault() {
    let content = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container');
    content.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');
}

/**
 *
 * Displays warning messages if required fields are not filled in the edit task form.
 * This function checks if the title, date, and category fields are filled. If any of these fields are empty,
 * it displays the corresponding warning message.
 */
function messageIfRequiredFieldsAreNotFilledInEditTask() {
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
 *
 * Clears the add task form and resets all related input fields and UI elements to their default states.
 * This function retrieves various elements from the DOM, such as the title, description, date, contacts,
 * and category, and resets their values. It also calls functions to reset the subtask input area and the
 * entire add task slide to their default states.
 */
function clearAddTaskMasque(searchInputfieldId) {
    let subtaskContent = document.getElementById('added-subtask-main-container');
    let title = document.getElementById('title');
    let description = document.getElementById('description-of-task');
    let date = document.getElementById('date');
    let contactsContent = document.getElementById('show-assigned-contacts');
    let category = document.getElementById('selected-task-headline');
    let addSubtaskInputfield = document.getElementById('add-subtask-input-container-inputfield-main');
    let searchInputfield = document.getElementById(searchInputfieldId);
    setSubtaskInputAreaInEditTaskToDefault();
    resetAddTaskSlide(title, description, date, category, contactsContent, subtaskContent, addSubtaskInputfield, searchInputfield);
}

/**
 *
 * Adds a subtask to the main task and updates the UI accordingly.
 * This function retrieves the input value for the subtask, appends it to the subtasks array, and updates the
 * subtask container with the new list of subtasks. It also resets the input field and adjusts the visibility
 * of the "add subtask" and "cancel or confirm" UI elements.
 */
function addSubtaskMain() {;
    let addSignContainer = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container')
    let inputField = document.getElementById('add-subtask-input-container-inputfield-main');
    let content = document.getElementById('added-subtask-main-container');
    subtasks.push(inputField.value);
    content.innerHTML = "";
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        content.innerHTML += renderAddedSubtasksHtmlMain(i, subtask);
    }
    inputField.value = '';
    addSignContainer.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');
    editMenuSubtaskIsOpen = false;
}

/**
 *
 * Sets up an event listener for the subtask input field to add a subtask when the 'Enter' key is pressed.
 * This event listener waits for the DOM content to be fully loaded, then checks if the subtask input field exists.
 * If it exists, it attaches a 'keyup' event listener to the input field. When the 'Enter' key is pressed,
 * the event propagation is stopped and the `addSubtaskMain` function is called.
 * If the input field is not found, an error message is logged to the console.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    let inputField = document.getElementById('add-subtask-input-container-inputfield-main');
    
    if (inputField) {
        inputField.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                event.stopPropagation();
                addSubtaskMain();
            }
        });
    } else {
        console.error('Element mit ID "add-subtask-input-container-inputfield" wurde nicht gefunden.');
    }
});

/**
 *
 * Toggles the visibility of the "add subtask" and "cancel or confirm" UI elements based on the subtask input field's value.
 * This function checks the value of the subtask input field. If the input field is empty, it shows the "add subtask" icon
 * and hides the "cancel or confirm" container. If the input field contains text, it hides the "add subtask" icon and shows
 * the "cancel or confirm" container.
 */
function changeIconsMain() {
    let content = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container')
    let input = document.getElementById('add-subtask-input-container-inputfield-main');
    if (input.value === '') {
        content.classList.remove('d-none');
        cancelAndConfirm.classList.add('d-none');
    }
    else {
        content.classList.add('d-none');
        cancelAndConfirm.classList.remove('d-none');
    }
}

/**
 *
 * Opens the edit subtask menu for the specified subtask and updates the UI accordingly.
 * This function retrieves the container and content of the specified subtask based on the index.
 * If the edit menu is not already open, it removes the hover background, adds an underline,
 * and replaces the subtask's content with an editable form. It also sets a flag indicating that
 * the edit menu is open.
 *
 * @param {number} i - The index of the subtask to be edited.
 */
function openEditSubtaskMenuMain(i) {
    let content = document.getElementById(`single-subtask-container${i}`);
    let listValue = document.getElementById(`list-content${i}`).innerHTML;

    if (editMenuSubtaskIsOpen === false) {
        content.classList.remove('bg-grey-hover');
        content.classList.add('blue-underline');
        content.innerHTML = renderEditSubtaskHtmlMain(i, listValue);
        editMenuSubtaskIsOpen = true;
    }
}

/**
 *
 * Renders the list of subtasks in the main container.
 * This function clears the existing content of the subtask container and then iterates over the array of subtasks.
 * For each subtask, it appends the rendered HTML to the container, effectively updating the display of all subtasks.
 */
function renderSubtaskMain() {
    let content = document.getElementById('added-subtask-main-container');
    content.innerHTML = "";
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        content.innerHTML += renderAddedSubtasksHtmlMain(i, subtask);
    }
}

/**
 * Function: editSubtaskMain
 *
 * Edits a specific subtask and updates the display to reflect the changes.
 * This function retrieves the value from the edit input field for a subtask identified by its index.
 * It updates the subtasks array by replacing the existing subtask with the new value from the input field.
 * After updating the subtasks array, it calls `renderSubtaskMain` to refresh the display of all subtasks.
 * It also sets a flag indicating that the edit menu is closed.
 *
 * @param {number} i - The index of the subtask to be edited.
 */
function editSubtaskMain(i) {
    let task = document.getElementById(`edit-task-input${i}`);
    subtasks.splice(i, 1, task.value);
    renderSubtaskMain();
    editMenuSubtaskIsOpen = false;
}