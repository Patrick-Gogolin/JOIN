function renderEditTaskSlideHtml(task, urgentClass, mediumClass, lowClass, index,urgentClassSvg, mediumClassSvg, lowClassSvg) {
    return /*html*/`
    <div class="popup-content-edit-task">
        <img onclick="closeEditTaskOverlay('edit-task-popup')" class="close-overlayer-sign-edit-task" src="img/cancel.svg" alt="Cross">
        <div class="edit-task-content">
        <div class="title-input-container">
                <span class="headline-input">Title<span class="red-star-required">*</span></span>
                <input id="title-edit-task" onblur="newTitle()" type="text" value="${task.title}" required>
                <span id="title-required-span-edit-task" class="this-field-required-span d-none">This field is required</span>
        </div>
        <div class="description-input-container">
        <span class="headline-input">Description</span>
        <textarea id="description-of-task-edit-task" onblur="newDescription()" class="task-description-textarea" name="" id="">${task.description}</textarea>
        </div>
        <div class="date-container">
            <span class="headline-input">Due Date<span class="red-star-required">*</span></span>
            <input id="date-edit-task" onblur="newDate()" type="date" value=${task.deadline} required>
            <span id="date-required-span-edit-task" class="this-field-required-span d-none">This field is required</span>
        </div>
        <div class="priority-container">
            <span class="headline-input">Prio</span>
            <div class="priority-button-container">
                <button onclick="urgentPriorityEditTask()" id="urgent-button-edit-task" class="urgent-button ${urgentClass}">Urgent <img id="urgent-prio-sign-edit-task" src=${urgentClassSvg} alt=""></button>
                <button onclick="mediumPriorityEditTask()" id="medium-button-edit-task" class="medium-button ${mediumClass}">Medium <img id="medium-prio-sign-edit-task" src=${mediumClassSvg} alt=""></button>
                <button onclick="lowPriorityEditTask()" id="low-button-edit-task" class="low-button ${lowClass}">Low <img id="low-prio-sign-edit-task" src=${lowClassSvg} alt=""></button>
            </div>
        </div>
        <div class="assigned-to-input-container">
            <span class="headline-input">Assigned to</span>
            <div class="select-contacts-container">
                <input onkeyup="searchContactsEditTask()" id="search-contact-inputfield-edit-task" type="text" placeholder="Select contacts to assign">
                <div class="arrow-drop-down">
                    <img onclick="openSelectContactsContainerEditTask(event)" src="img/arrow-drop-down-contacts.svg"alt="">
                </div>
            </div>
            <div id="choose-contacts-container-edit-task" class="choose-contacts-container d-none">
                <div id="active-user-container-edit-task" class="d-none">
                </div>
                <div class="contacts-to-select-container" id="select-contact-container-edit-task">
                </div>
            </div>
        </div>
        <div id="show-assigned-contacts-edit-task" class="show-assigned-contacts">
        </div>
        <div class="subtask-area-container">
            <div class="add-subtask-container">
                <span class="headline-input">Subtask</span>
                <div class="add-subtask-input-container">
                    <input id="add-subtask-input-container-inputfield-edit-task" oninput="changeIconsSubtasksEditTask()" type="text" placeholder="Add new subtask">
                    <div id="add-subtask-svg-container-edit-task" class="add-subtask-svg-container">
                        <img id="add-subtask-svg" class="add-subtask-svg" src="img/addsubtask.svg" alt="">
                    </div>
                    <div id="cancel-or-confirm-subtask-container-edit-task" class="cancel-or-confirm-subtask-container d-none">
                        <img onclick="clearSubtaskEditTask()" src="img/cancel.svg" alt="">
                        <div class="seperator"></div>
                        <img onclick="addSubtaskEditTask()" src="img/check-grey.svg" alt="">
                    </div>
                </div>
            </div>
            <div id="added-subtask-main-container-edit-task" class="added-subtask-main-container">
            </div>
        </div>
        </div>
        <div class="update-task-button-container">
            <button onclick= "finalUpdateTask(${index})">Ok <img src="img/check.svg" alt=""></button>
        </div>
    </div>`;
}

function renderActiveUserInEditTaskHtml(bgColor, colorForActiveUser, activeUserInitialsUpdated, activeUserName, checkBox) {
 return /*html*/`
 <div id="logged-in-user-edit-task" onclick="assignTaskToLoggedInUserEditTask('logged-in-user-edit-task')" class="single-contact-container ${bgColor}">
                <div class="single-contact-name-container">
                    <div class="contact-name-initials-container" style="background-color: ${colorForActiveUser[0]};">
                        <span class="user-initials-span">${activeUserInitialsUpdated}</span>
                    </div>
                    <span id="logged-in-user-name-edit-task">${activeUserName}</span><span>(You)</span>
                </div>
                <div>
                    <img id="checkbox-active-user-edit-task" src=${checkBox} alt="Checkbox">
                </div>
            </div>`;
}

function renderContactsInEditTaskHtml(i, bgColor, color, userNameInitial, checkBoxContacts, userName) {
    return /*html*/`
    <div id="assign-contact-to-task${i}" onclick="assignTaskToContactEditTask(${i})"  class="single-contact-container ${bgColor}">
            <div class="single-contact-name-container">
                <div class="contact-name-initials-container" style="background-color: ${color};">
                    <span class="user-initials-span">${userNameInitial}</span>
                </div>
                <span id="assigned-contact-name-edit-task${i}">${userName}</span>
            </div>
            <div>
                <img id="checkbox-edit-task${i}" src=${checkBoxContacts} alt="Checkbox">
            </div>
        </div>`;
}

function renderActiveUserInEditTaskHtmlAfterSearch(bgColor, color, activeUserInitialsUpdated, activeUserUpdated, checkBox) {
    return /*html*/`
    <div id="logged-in-user-edit-task" onclick="assignTaskToLoggedInUserEditTask('logged-in-user-edit-task')" class="single-contact-container ${bgColor}">
                <div class="single-contact-name-container">
                    <div class="contact-name-initials-container" style="background-color: ${color};">
                        <span class="user-initials-span">${activeUserInitialsUpdated}</span>
                    </div>
                    <span id="logged-in-user-name-edit-task">${activeUserUpdated}</span><span>(You)</span>
                </div>
                <div>
                    <img id="checkbox-active-user-edit-task" src=${checkBox} alt="Checkbox">
                </div>
            </div>`;
}

function renderContactsInEditTaskHtmlAfterSearch(i, bgColor, color, userNameInitial, userName, checkBoxContacts) {
    return /*html*/`
    <div id="assign-contact-to-task${i}" onclick="assignTaskToContactEditTask(${i})"  class="single-contact-container ${bgColor}">
    <div class="single-contact-name-container">
        <div class="contact-name-initials-container" style="background-color: ${color};">
            <span class="user-initials-span">${userNameInitial}</span>
        </div>
        <span id="assigned-contact-name-edit-task${i}">${userName}</span>
    </div>
    <div>
        <img id="checkbox-edit-task${i}" src=${checkBoxContacts} alt="Checkbox">
    </div>
</div>`;
}

function renderAssignedContactsInEditTaskHtml(color, initials) {
    return /*html*/`
    <div class="contact-name-initials-container" style="background-color: ${color}">
        <span class="user-initials-span">${initials}</span>
    </div>`;
}

function renderSubtasksFromEditTaskHtml(i, subtask) {
    return /*html*/`
     <div id="single-subtask-container-edit-task${i}" class="single-subtask-container bg-grey-hover" onmouseout="hoverExitFunctionEditTask(${i})" onmouseover="hoverFunctionEditTask(${i})">
                <ul>
                    <li id="list-content-edit-task${i}" class="list-element">${subtask}</li>
                </ul>
                <div id="edit-delete-created-subtask-container-edit-task${i}" class="edit-delete-created-subtask-container d-none">
                    <img id="single-subtask-edit-edit-task${i}" class="edit-sign" onclick="openEditSubtaskMenuInEditTask(${i})" src="img/edit.svg" alt="">
                    <div class="seperator"></div>
                    <img id="single-subtask-delete-edit-task${i}" class="delete-sign" onclick="deleteSubtaskInEditTask(${i})" src="img/delete.svg" alt="">
                </div>
            </div>`;
}

function renderOpenEditSubtaskMenuInEditTaskHtml(i, listValue) {
    return /*html*/`
    <div class="edit-subtask-container">
                <input id="edit-task-input-edit-task${i}" class="edit-subtask-inputfield" value="${listValue}">
                <div id="delete-confirm-edit-subtask-edit-task" class="delete-confirm-edit-subtask-container">
                    <img class="delete-sign" onclick="deleteOpenEditSubtaskInEditTask(${i})" src="img/delete.svg" alt="">
                    <div class="seperator"></div>
                    <img class="confirm-edit" onclick="editSubtaskInEditTask(${i})" src="img/check-grey.svg" alt="">
                </div>
        </div>`;
}

function renderAddSubtaskEditTaskHtml(i, subtask) {
    return /*html*/`
      <div id="single-subtask-container-edit-task${i}" class="single-subtask-container bg-grey-hover" onmouseout="hoverExitFunctionEditTask(${i})" onmouseover="hoverFunctionEditTask(${i})">
            <ul>
                <li id="list-content-edit-task${i}" class="list-element">${subtask}</li>
            </ul>
            <div id="edit-delete-created-subtask-container-edit-task${i}" class="edit-delete-created-subtask-container d-none">
                <img id="single-subtask-edit-edit-task${i}" class="edit-sign" onclick="openEditSubtaskMenuInEditTask(${i})" src="img/edit.svg" alt="">
                <div class="seperator"></div>
                <img id="single-subtask-delete-edit-task${i}" class="delete-sign" onclick="deleteSubtaskInEditTask(${i})" src="img/delete.svg" alt="">
            </div>
        </div>`;
}