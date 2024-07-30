async function addTaskMain() {
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
    statusOfTask = "todo";
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
            document.getElementById('task-successfull-created-container').classList.add('d-none');
            resetAddTaskSlide(title, description, date, category, contactsContent, subtaskContent, addSubtaskInputfield)
            window.location.href = 'board.html';
        }, 900);
        }
}

function clearAddTaskMasque() {
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
    resetAddTaskSlide(title, description, date, category, contactsContent, subtaskContent, addSubtaskInputfield)
}

function addSubtaskMain() {;
    let addSignContainer = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container')
    let inputField = document.getElementById('add-subtask-input-container-inputfield');
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