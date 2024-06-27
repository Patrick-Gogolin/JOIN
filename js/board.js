let urgentActive = false; // für Die Buttons beim Addtask Formular
let mediumActive = false;
let lowActive = false;

function openAddTaskOverlayer() {
    document.getElementById('overlayer').classList.remove('d-none');
}

function closeOverlayer() {
    document.getElementById('overlayer').classList.add('d-none');

}

// vorübergehende Funktion zum Überprüfen der benötigen Inputfelder
function addTask() {
    let title = document.getElementById('title');
    let date = document.getElementById('date');
    let category = document.getElementById('category');
    let titleRequiredSpan = document.getElementById('title-required-span');
    let dateRequiredSpan = document.getElementById('date-required-span');
    let categoryRequiredSpan = document.getElementById('category-required-span');
    
    let hasError = false;

    if (checkField(title, titleRequiredSpan))
        {
            hasError = true;
        }
    if (checkField(date, dateRequiredSpan))
        {
            hasError = true;
        }
    if (checkField(category, categoryRequiredSpan))
        {
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
    urgentPrioSign.src= 'img/urgent-prio.svg';
    urgentActive = false; 

    let mediumButton = document.getElementById('medium-button');
    let mediumPrioSign = document.getElementById('medium-prio-sign');
    mediumButton.classList.remove('medium');
    mediumPrioSign.src= 'img/medium-prio-orange.svg';
    mediumActive = false;

    let lowButton = document.getElementById('low-button');
    let lowPrioSign = document.getElementById('low-prio-sign');
    lowButton.classList.remove('low');
    lowPrioSign.src= 'img/low-prio.svg';
    lowActive = false;
}

function changeIcons() {
    let content = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container')
    let input = document.getElementById('add-subtask-input-container-inputfield');
    if(input.value === ''){
        content.classList.remove('d-none');
        cancelAndConfirm.classList.add('d-none');
    }
    else{
        content.classList.add('d-none');
        cancelAndConfirm.classList.remove('d-none');
    }
}

function addSubtask() {
    let addSignContainer = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container')
    let inputField = document.getElementById('add-subtask-input-container-inputfield');
    let inputFieldContent = inputField.value;
    let content = document.getElementById('added-subtask-list');
    content.innerHTML += /*html*/`
    <ul id="list" onmouseout="hoverExitFunction()" onmouseover="hoverFunction()">
        <li class="list-element">
            <input id="subtask-inputfield" type="text" value="${inputFieldContent}">
            <div id="edit-delete-created-subtask-container" class="edit-delete-created-subtask-container d-none">
                <img class="edit-sign" onclick="editTask()" src="img/edit.svg" alt="">
                <div class="seperator"></div>
                <img src="img/delete.svg" alt="">
            </div>
        </li>
    </ul>
    `;

    inputField.value = '';
    addSignContainer.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');
}

function clearSubtask() {
    let addSignContainer = document.getElementById('add-subtask-svg-container');
    let cancelAndConfirm = document.getElementById('cancel-or-confirm-subtask-container')
    let inputField = document.getElementById('add-subtask-input-container-inputfield');

    inputField.value = '';
    addSignContainer.classList.remove('d-none');
    cancelAndConfirm.classList.add('d-none');

}

function hoverFunction() {
    editContainer = document.getElementById('edit-delete-created-subtask-container');
    editContainer.classList.remove('d-none');
}

function hoverExitFunction() {
    editContainer = document.getElementById('edit-delete-created-subtask-container');
    editContainer.classList.add('d-none');

}

function editTask() {
    let list = document.getElementById('list');
    let inputValue = document.getElementById('subtask-inputfield');
    
    list.innerHTML = /*html*/`
    <div class="edit-subtask-container">
    <input value="${inputValue.value}">
    <div id="delete-confirm-edit-subtask" class="delete-confirm-edit-subtask-container">
                <img class="edit-sign" src="img/delete.svg" alt="">
                <div class="seperator"></div>
                <img src="img/check-grey.svg" alt="">
            </div>

    </div>`;

    // MIT FOR SCHLEIFE UND ARRAY ARBEITEN FPR DIE SUBTASK
}