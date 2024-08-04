/**
 * Toggles the visibility of icons based on the input field's value.
 *
 * This function checks the value of the input field with the ID 'add-subtask-input-container-inputfield'.
 * - If the input field is empty, it ensures that the 'add-subtask-svg-container' is visible and the
 *   'cancel-or-confirm-subtask-container' is hidden.
 * - If the input field contains any value, it hides the 'add-subtask-svg-container' and shows the
 *   'cancel-or-confirm-subtask-container'.
 *
 */
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

/**
 * Adds a new subtask to the list and updates the displayed subtask list.
 *
 * This function retrieves the value from the input field with the ID 'add-subtask-input-container-inputfield',
 * adds it to the `subtasks` array, and updates the DOM to reflect the new list of subtasks.
 * - The input field's value is appended to the `subtasks` array.
 * - The content of the container with the ID 'added-subtask-main-container' is cleared and then
 *   repopulated with the updated list of subtasks.
 * - The input field is cleared.
 * - The 'add-subtask-svg-container' is made visible again, while the 'cancel-or-confirm-subtask-container'
 *   is hidden.
 * - The flag `editMenuSubtaskIsOpen` is set to `false`, indicating that the subtask editing menu is closed.
 * 
 */
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

/**
 * Initializes event listeners once the DOM content has fully loaded.
 *
 * This function waits for the DOM content to be fully loaded before attaching event listeners to the input field
 * with the ID 'add-subtask-input-container-inputfield'. Specifically:
 * - It checks if the input field exists.
 * - If it does, it attaches a 'keyup' event listener to the input field.
 * - When the 'Enter' key is pressed, the event's default propagation is stopped, and the `addSubtask` function is called.
 *
 * @param {Event} event - The DOMContentLoaded event object.
 * @returns {void}
 */
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

/**
 * Clears the subtask input field and updates the visibility of related UI elements.
 * 
 * This function resets the value of the subtask input field to an empty string and adjusts the visibility
 * of the UI elements associated with adding a subtask. Specifically, it makes the "add subtask" icon visible
 * and hides the "cancel or confirm" container, which typically contains buttons for canceling or confirming the
 * addition of a subtask.
 * 
 */
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

/**
 * Displays the edit/delete container for a specific subtask when hovered over.
 * 
 * This function reveals the edit/delete container associated with a subtask by removing the 'd-none' class,
 * which makes it visible. It targets the container based on the provided index `i`. If the container exists,
 * it will be shown.
 *
 */
function hoverExitFunction(i) {
    let editContainer = document.getElementById(`edit-delete-created-subtask-container${i}`);
    if (editContainer) {
        editContainer.classList.add('d-none');
    }
}

/**
 * Opens the edit menu for a specific subtask and updates its content
 * 
 * This function displays the edit menu for the specified subtask by updating its HTML content with
 * the edit menu layout. It also updates the visual appearance of the subtask container by removing
 * a 'bg-grey-hover' class and adding a 'blue-underline' class. The function ensures that the edit menu
 * is only opened if it is not already open.
 * 
 * @param {number} i - The index of the subtask for which the edit menu should be opened.
 */
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

/**
 * Edits a subtask by updating its value and re-rendering the subtasks list.
 * 
 * This function replaces the value of a specific subtask in the `subtasks` array with the new value
 * entered in the input field. It then re-renders the list of subtasks to reflect the updated value.
 * Finally, it marks the edit menu for subtasks as closed.
 * 
 * @param {number} i - - The index of the subtask to be edited.
 */
function editSubtask(i) {
    let task = document.getElementById(`edit-task-input${i}`);
    subtasks.splice(i, 1, task.value);
    renderSubtasks();
    editMenuSubtaskIsOpen = false;
}

/**
 * Deletes a subtask from the list and updates the display in the edit subtask menu.
 * 
 * This function removes a subtask from the `subtasks` array at the specified index and then
 * re-renders the list of subtasks to reflect the deletion. After updating the list, it also
 * closes the edit menu for subtasks.
 * 
 * @param {number} i - The index of the subtask to be deleted.
 */
function deleteSubtaskInEditSubtaskMenu(i) {
    subtasks.splice(i, 1);
    renderSubtasks();
    editMenuSubtaskIsOpen = false;
}

/**
 * Deletes a subtask from the list if the edit menu is not open.
 * 
 * This function removes a subtask from the `subtasks` array at the specified index, but only if
 * the edit menu for subtasks is not currently open. After deleting the subtask, it updates the
 * display of the subtasks list to reflect the change.
 * 
 * @param {number} i - The index of the subtask to be deleted.
 */
function deleteSubtask(i) {
    if (editMenuSubtaskIsOpen === false) {
        subtasks.splice(i, 1);
        renderSubtasks();
    }
}