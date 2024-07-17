function renderDetailTaskSlideHtml(task, imageSrc, index, bgColor, id) {
    return /*html*/`
    <div class="popup-content">
                    <div class="task-card-header">
                        <span class=${bgColor}>${task.category}</span><div onclick="closeEditTaskOverlay()" class="task-card-back-icon-boarder"><img class="task-card-back-icon" src="/img/x.png" alt=""></div>
                    </div>
                    <div class="task-card-title">${task.title}</div>
                    <div class="task-card-description">${task.description}</div>
                    <div class="task-card-date"><span class="edit-task-subheadline">Due date:</span><div>${task.deadline}</div></div>
                    <div class="task-card-priority"><span class="edit-task-subheadline">Priority:</span><div class="task-card-priority-icon">${task.priority}<img class="task-card-priority-sign" src=${imageSrc} alt="medium"></div></div>
                    <div class="task-card-assigned"><span class="edit-task-subheadline">Assigned To:</span>
                        <div id="assigned-contacts-edit-task-container" class="task-card-assigned-list">
                        </div>
                    </div>
                    <div class="task-card-subtasks"><span class="edit-task-subheadline">Subtasks</span>
                        <div id="task-card-subtasks-container" class="task-card-subtasks-list">
                        </div>
                    </div>
                    <div class="task-card-footer">
                        <div onmouseover="changeAddSignToBlue('delete-task-grey', 'delete-task-blue')" onmouseout="changeAddSingToDefault('delete-task-grey', 'delete-task-blue')" onclick="deleteTaskFromDatabase('/tasks/${taskKeys[index]}')" class="task-card-delete">
                            <img id="delete-task-grey" src="/img/delete.svg" alt="Trashbin">
                            <img id="delete-task-blue" class="d-none" src="/img/delete-blue.svg" alt="Trashbin">
                            <span>Delete</span>
                        </div>
                        <div class="task-card-separator"></div>
                        <div onclick = "editTask('${id}')" onmouseover="changeAddSignToBlue('edit-task-grey', 'edit-task-blue')" onmouseout="changeAddSingToDefault('edit-task-grey', 'edit-task-blue')" class="task-card-edit">
                            <img id="edit-task-grey" src="/img/edit.svg" alt="Pencil">
                            <img id="edit-task-blue" class="d-none" src="/img/edit-blue.svg" alt="Pencil">
                            <span>Edit</span>
                    </div>
                </div>`;
}

function renderDetailTaskSlideContactsHtml(initial, contact, contactColors) {
    return /*html*/`
    <div>
        <div class="rendered-task-assigned-contact-container" style="background-color:${contactColors}">
            <span>${initial}</span>
        </div>
        <div>
            <span>${contact}</span>
        </div>
    </div>`;
}

function renderDetailTaskSlideDoneSubtasksHtml(subtask) {
    return /*html*/`
     <div class="single-subtask-in-edit-slide-container">
        <div>
            <img src="/img/filled-check-box.svg">
        </div>
        <div>
            <span>${subtask}</span>
        </div>
    </div>`; 
}

function renderDetailTaskSlideNotDoneSubtasksHtml(subtask) {
    return /*html*/`
     <div class="single-subtask-in-edit-slide-container">
        <div>
            <img src="/img/empty-check-box.svg">
        </div>
        <div>
            <span>${subtask}</span>
        </div>
    </div>`; 
}

function renderEmptyTasksInToDoHtml() {
    return /*html*/`
    <div class="nothing-to-do-nothing-done-container">
        <span>No tasks To do</span>
    </div>`;
}

function renderTasksInToDoHtml(task, bgColor, subtasks, doneSubtasks, imageSrc, i) {
    return /*html*/`
    <div onclick="renderDetailTaskSlide('${task.id}')" draggable="true" ondragstart="startDragging('${task.id}')" onclick="editTask(${i})" id="${task.id}" class="task-container">
        <div class="category-container ${bgColor}">
            <span class="category-span" id="category${i}">${task.category}</span>
        </div>
        <div class="title-container">
            <span class="title-span" id="title${i}">${task.title}</span>
        </div>
        <div class="description-container">
            <p id="description${i}">${task.description}</p> 
        </div>
        <div class="subtasks-container">
            <label for="file">${doneSubtasks}/${subtasks} Subtasks</label>
            <progress id="file" value=${doneSubtasks} max=${subtasks}> 1 </progress>
        </div>
        <div class="contacts-and-priority-container">
            <div id="contacts-todo-container${i}" class="contacts-container">

            </div>
            <div id="priority-container${i}" class="priority-container">
                <img src=${imageSrc} alt="">
            </div>   
        </div>
    </div>`;
}

function renderAssignedContactsInToDo(initial, contactColors) {
   return /*html*/`
   <div class="rendered-task-assigned-contact-container" style="background-color:${contactColors}">
        <span>${initial}
    </div>`;
}

function renderEmptyTasksInToInProgressHtml() {
    return /*html*/`
    <div class="nothing-to-do-nothing-done-container">
        <span>No tasks in Progress</span>
    </div>`;
}

function renderTasksInProgressHtml(task, bgColor, subtasks, doneSubtasks, imageSrc, i) {
    return /*html*/`
    <div onclick="renderDetailTaskSlide('${task.id}')" draggable="true" ondragstart="startDragging('${task.id}')" onclick="editTask(${i})" id="${task.id}" class="task-container">
        <div class="category-container ${bgColor}">
            <span class="category-span" id="category${i}">${task.category}</span>
        </div>
        <div class="title-container">
            <span class="title-span" id="title${i}">${task.title}</span>
        </div>
        <div class="description-container">
            <p id="description${i}">${task.description}</p> 
        </div>
        <div class="subtasks-container">
            <label for="file">${doneSubtasks}/${subtasks} Subtasks</label>
            <progress id="file" value=${doneSubtasks} max=${subtasks}> 1 </progress>
        </div>
        <div class="contacts-and-priority-container">
            <div id="contacts-progress-container${i}" class="contacts-container">
            </div>
            <div id="priority-container${i}" class="priority-container">
                <img src=${imageSrc} alt="">
            </div>   
        </div>
    </div>`;
}

function renderAssignedContactsInProgress(initial, contactColors) {
    return /*html*/`
    <div class="rendered-task-assigned-contact-container" style="background-color:${contactColors}">
         <span>${initial}
     </div>`;
 }

 function renderEmptyTasksInToAwaitFeedbackHtml() {
    return /*html*/`
    <div class="nothing-to-do-nothing-done-container">
        <span>No tasks waiting for Feedback</span>
    </div>`;
}

 function renderTasksInFeedbackHtml(task, bgColor, subtasks, doneSubtasks, imageSrc, i) {
    return /*html*/`
    <div onclick="renderDetailTaskSlide('${task.id}')" draggable="true" ondragstart="startDragging('${task.id}')" onclick="editTask(${i})" id="${task.id}" class="task-container">
        <div class="category-container ${bgColor}">
            <span class="category-span" id="category${i}">${task.category}</span>
        </div>
        <div class="title-container">
            <span class="title-span" id="title${i}">${task.title}</span>
        </div>
        <div class="description-container">
            <p id="description${i}">${task.description}</p> 
        </div>
        <div class="subtasks-container">
            <label for="file">${doneSubtasks}/${subtasks} Subtasks</label>
            <progress id="file" value=${doneSubtasks} max=${subtasks}> 1 </progress>
        </div>
        <div class="contacts-and-priority-container">
            <div id="contacts-feedback-container${i}" class="contacts-container">
            </div>
            <div id="priority-container${i}" class="priority-container">
                <img src=${imageSrc} alt="">
            </div>   
        </div>
    </div>`;
 }

 function renderAssignedContactsInFeedback(initial, contactColors) {
    return /*html*/`
    <div class="rendered-task-assigned-contact-container" style="background-color:${contactColors}">
        <span>${initial}
    </div>`;
 }

 function renderEmptyTasksInToDoneHtml() {
    return /*html*/`
    <div class="nothing-to-do-nothing-done-container">
        <span>No tasks Done</span>
    </div>`;
}

function renderTasksInDoneHtml(task, bgColor, subtasks, doneSubtasks, imageSrc, i) {
    return /*html*/`
    <div onclick="renderDetailTaskSlide('${task.id}')" draggable="true" ondragstart="startDragging('${task.id}')" onclick="editTask(${i})" id="${task.id}" class="task-container">
        <div class="category-container ${bgColor}">
            <span class="category-span" id="category${i}">${task.category}</span>
        </div>
        <div class="title-container">
            <span class="title-span" id="title${i}">${task.title}</span>
        </div>
        <div class="description-container">
            <p id="description${i}">${task.description}</p> 
        </div>
        <div class="subtasks-container">
            <label for="file">${doneSubtasks}/${subtasks} Subtasks</label>
            <progress id="file" value=${doneSubtasks} max=${subtasks}> 1 </progress>
        </div>
            <div class="contacts-and-priority-container">
                <div id="contacts-done-container${i}" class="contacts-container">

                </div>
                <div id="priority-container${i}" class="priority-container">
                    <img src=${imageSrc} alt="">
                </div>   
            </div>
        </div>`;
}

function renderAssignedContactsInDone(initial, contactColors) {
    return /*html*/`
    <div class="rendered-task-assigned-contact-container" style="background-color:${contactColors}">
        <span>${initial}
    </div>`;
    }