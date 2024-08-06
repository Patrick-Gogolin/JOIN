function renderSubtasksFromEditTask() {
    let content = document.getElementById('added-subtask-main-container-edit-task');
    let subtasks = emptyTask.subtasks;
    content.innerHTML = "";
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        content.innerHTML += renderSubtasksFromEditTaskHtml(i, subtask);
        }
}

/**
 * Renders the subtasks associated with the current task and updates the UI.
 * 
 */
function hoverFunctionEditTask(i) {
    let editContainer = document.getElementById(`edit-delete-created-subtask-container-edit-task${i}`);
    if (editContainer) {
        editContainer.classList.remove('d-none');
    }
}

/**
 * Hides the edit/delete container for a specific subtask when the mouse leaves the area.
 *
 * @param {number} i - The index of the subtask for which the edit/delete container should be hidden.
 */
function hoverExitFunctionEditTask(i) {
    let editContainer = document.getElementById(`edit-delete-created-subtask-container-edit-task${i}`);
    if (editContainer) {
        editContainer.classList.add('d-none');
    }
}

/**
 * Opens the edit menu for a specific subtask and updates its display.
 *
 * @param {number} i - The index of the subtask for which the edit menu should be opened.
 */
function openEditSubtaskMenuInEditTask(i) {
    let content = document.getElementById(`single-subtask-container-edit-task${i}`);
    let listValue = document.getElementById(`list-content-edit-task${i}`).innerHTML;
    currentSubtask = listValue;

    if (editMenuSubtaskIsOpenInEditTask === false) {
        content.classList.remove('bg-grey-hover');
        content.classList.add('blue-underline');
        content.innerHTML = renderOpenEditSubtaskMenuInEditTaskHtml(i, listValue);
        editMenuSubtaskIsOpenInEditTask = true;
    }
}

/**
 * Edits the specified subtask with the new value entered by the user.
 *
 * @param {number} i - The index of the subtask to be edited.
 */
function editSubtaskInEditTask(i) {
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
    renderSubtasksFromEditTask();
    editMenuSubtaskIsOpenInEditTask = false;
}

function deleteOpenEditSubtaskInEditTask(i) {
    emptyTask.subtasks.splice(i, 1);
    emptyTask.doneSubtasks.splice(i, 1);
    renderSubtasksFromEditTask();
    editMenuSubtaskIsOpenInEditTask = false;
}

/**
 * Deletes the specified subtask from the `emptyTask` object and updates the display of subtasks.
 *
 * @param {number} i - The index of the subtask to be deleted.
 */
function deleteSubtaskInEditTask(i) {
    if (editMenuSubtaskIsOpenInEditTask === false) {
        emptyTask.subtasks.splice(i, 1);
        emptyTask.doneSubtasks.splice(i, 1);
        renderSubtasksFromEditTask();
    }
}

/**
 * Toggles the visibility of icons and containers related to subtasks based on the input field's value.
 * 
 */
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

/**
 * Clears the input field for subtasks and toggles the visibility of the related icons and containers.
 * 
 */
function clearSubtaskEditTask() {
    let addSignContainer = document.getElementById('add-subtask-svg-container-edit-task');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container-edit-task')
    let inputField = document.getElementById('add-subtask-input-container-inputfield-edit-task');

    inputField.value = '';
    addSignContainer.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');
}

/**
 * Adds a new subtask to the current task and updates the displayed list of subtasks.
 *
 */
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
        content.innerHTML += renderAddSubtaskEditTaskHtml(i, subtask);
    }
    inputField.value = '';
    addSignContainer.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');
    editMenuSubtaskIsOpenInEditTask = false;
}