function renderAddedSubtasksHtml(i, subtask) {
    return /*html*/`
    <div id="single-subtask-container${i}" class="single-subtask-container bg-grey-hover" onmouseout="hoverExitFunction(${i})" onmouseover="hoverFunction(${i})">
            <ul>
                <li id="list-content${i}" class="list-element">${subtask}</li>
            </ul>
            <div id="edit-delete-created-subtask-container${i}" class="edit-delete-created-subtask-container d-none">
                    <img id="single-subtask-edit${i}" class="edit-sign" onclick="OpenEditTask(${i})" src="img/edit.svg" alt="">
                    <div class="seperator"></div>
                    <img id="single-subtask-delete${i}" class="delete-sign" onclick="deleteTask(${i})" src="img/delete.svg" alt="">
            </div>
        </div>
        `;
}

function renderOpenEditHtml(i, listValue) {
    return /*html*/`
    <div class="edit-subtask-container">
            <input id="edit-task-input${i}" class="edit-subtask-inputfield" value="${listValue}">
            <div id="delete-confirm-edit-subtask" class="delete-confirm-edit-subtask-container">
                <img class="delete-sign" onclick="deleteOpenEditTask(${i})" src="img/delete.svg" alt="">
                <div class="seperator"></div>
                <img class="confirm-edit" onclick="editTask(${i})" src="img/check-grey.svg" alt="">
            </div>
        </div>`;
    }