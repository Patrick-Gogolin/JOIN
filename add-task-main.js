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

function setSubtaskInputAreaInEditTaskToDefault() {
    let content = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container');
    content.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');
}

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

function clearAddTaskMasque() {
    let subtaskContent = document.getElementById('added-subtask-main-container');
    let title = document.getElementById('title');
    let description = document.getElementById('description-of-task');
    let date = document.getElementById('date');
    let contactsContent = document.getElementById('show-assigned-contacts');
    let category = document.getElementById('selected-task-headline');
    let addSubtaskInputfield = document.getElementById('add-subtask-input-container-inputfield-main');
    let searchInputfield = document.getElementById('search-contact-inputfield-main');
    setSubtaskInputAreaInEditTaskToDefault();
    resetAddTaskSlide(title, description, date, category, contactsContent, subtaskContent, addSubtaskInputfield, searchInputfield);
}

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
function renderSubtaskMain() {
    let content = document.getElementById('added-subtask-main-container');
    content.innerHTML = "";
    for (let i = 0; i < subtasks.length; i++) {
        const subtask = subtasks[i];
        content.innerHTML += renderAddedSubtasksHtmlMain(i, subtask);
    }
}

function editSubtaskMain(i) {
    let task = document.getElementById(`edit-task-input${i}`);
    subtasks.splice(i, 1, task.value);
    renderSubtaskMain();
    editMenuSubtaskIsOpen = false;
}
