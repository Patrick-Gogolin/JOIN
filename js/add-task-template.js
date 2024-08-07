function renderAddedSubtasksHtml(i, subtask) {
    return /*html*/`
    <div id="single-subtask-container${i}" class="single-subtask-container bg-grey-hover" onmouseout="hoverExitFunction(${i})" onmouseover="hoverFunction(${i})">
        <ul>
            <li id="list-content${i}" class="list-element">${subtask}</li>
        </ul>
        <div id="edit-delete-created-subtask-container${i}" class="edit-delete-created-subtask-container d-none">
                <img id="single-subtask-edit${i}" class="edit-sign" onclick="openEditSubtaskMenu(${i})" src="img/edit.svg" alt="">
                <div class="seperator"></div>
                <img id="single-subtask-delete${i}" class="delete-sign" onclick="deleteSubtask(${i})" src="img/delete.svg" alt="">
        </div>
    </div>`;
}

function renderAddedSubtasksHtmlMain(i, subtask){
return /*html*/`
<div id="single-subtask-container${i}" class="single-subtask-container bg-grey-hover" onmouseout="hoverExitFunction(${i})" onmouseover="hoverFunction(${i})">
    <ul>
        <li id="list-content${i}" class="list-element">${subtask}</li>
    </ul>
    <div id="edit-delete-created-subtask-container${i}" class="edit-delete-created-subtask-container d-none">
            <img id="single-subtask-edit${i}" class="edit-sign" onclick="openEditSubtaskMenuMain(${i})" src="img/edit.svg" alt="">
            <div class="seperator"></div>
            <img id="single-subtask-delete${i}" class="delete-sign" onclick="deleteSubtask(${i})" src="img/delete.svg" alt="">
    </div>
</div>`;
}

function renderAddedSubtasksHtmlMain(i, subtask) {
    return /*html*/`
    <div id="single-subtask-container${i}" class="single-subtask-container bg-grey-hover" onmouseout="hoverExitFunction(${i})" onmouseover="hoverFunction(${i})">
        <ul>
            <li id="list-content${i}" class="list-element">${subtask}</li>
        </ul>
        <div id="edit-delete-created-subtask-container${i}" class="edit-delete-created-subtask-container d-none">
                <img id="single-subtask-edit${i}" class="edit-sign" onclick="openEditSubtaskMenuMain(${i})" src="img/edit.svg" alt="">
                <div class="seperator"></div>
                <img id="single-subtask-delete${i}" class="delete-sign" onclick="deleteSubtask(${i})" src="img/delete.svg" alt="">
        </div>
    </div>`;
}

function renderEditSubtaskHtmlMain(i, listValue) {
    return /*html*/`
    <div class="edit-subtask-container">
        <input id="edit-task-input${i}" class="edit-subtask-inputfield-add-task-main" value="${listValue}">
        <div id="delete-confirm-edit-subtask" class="delete-confirm-edit-subtask-container">
            <img class="delete-sign" onclick="deleteSubtaskInEditSubtaskMenu(${i})" src="img/delete.svg" alt="">
            <div class="seperator"></div>
            <img class="confirm-edit" onclick="editSubtaskMain(${i})" src="img/check-grey.svg" alt="">
        </div>
    </div>`;
}

function renderEditSubtaskHtml(i, listValue) {
    return /*html*/`
    <div class="edit-subtask-container">
        <input id="edit-task-input${i}" class="edit-subtask-inputfield" value="${listValue}">
        <div id="delete-confirm-edit-subtask" class="delete-confirm-edit-subtask-container">
            <img class="delete-sign" onclick="deleteSubtaskInEditSubtaskMenu(${i})" src="img/delete.svg" alt="">
            <div class="seperator"></div>
            <img class="confirm-edit" onclick="editSubtask(${i})" src="img/check-grey.svg" alt="">
        </div>
    </div>`;
}

function renderActiveUserHtml(activeUserName, activeUserInitialsUpdated, y, checkBox, bgColor, colorForActiveUser) {
    return /*html*/`
    <div id="logged-in-user" onclick="assignTaskToLoggedInUser('logged-in-user')" class="single-contact-container ${bgColor}">
        <div class="single-contact-name-container">
            <div class="contact-name-initials-container" style="background-color: ${colorForActiveUser[y]};">
                <span class="user-initials-span">${activeUserInitialsUpdated}</span>
            </div>
            <span id="logged-in-user-name">${activeUserName}</span><span>(You)</span>
        </div>
        <div>
            <img id="checkbox-active-user" src=${checkBox} alt="Checkbox">
        </div>
    </div>`;
}

function renderContactsHtml(color, userName, userNameInitial, bgColor, checkBoxContacts, i) {
    return /*html*/`
     <div id="${i}" onclick="assignTaskToContact(${i})"  class="single-contact-container ${bgColor}">
        <div class="single-contact-name-container">
            <div class="contact-name-initials-container" style="background-color: ${color};">
                <span class="user-initials-span">${userNameInitial}</span>
            </div>
            <span id="assigned-contact-name${i}">${userName}</span>
        </div>
        <div>
            <img id="checkbox${i}" src=${checkBoxContacts} alt="Checkbox">
        </div>
    </div>`;
}

function renderAssignedContactsHtml(color, initials) {
    return /*html*/`
    <div class="contact-name-initials-container" style="background-color: ${color}">
        <span class="user-initials-span">${initials}</span>
    </div>`;
}

function renderSignThatMoreContactsAreAssignedHtml(extraAssignedContacts) {
    return /*html*/`
    <span class="show-that-more-contacts-are-assigned-span">+${extraAssignedContacts}</span>`;
}

function renderActiveUserAfterSearchHtml(bgColor, color, activeUserInitialsUpdated, activeUserUpdated, checkBox) {
    return /*html*/`
    <div id="logged-in-user" onclick="assignTaskToLoggedInUser('logged-in-user')" class="single-contact-container ${bgColor}">
        <div class="single-contact-name-container">
            <div class="contact-name-initials-container" style="background-color: ${color};">
                <span class="user-initials-span">${activeUserInitialsUpdated}</span>
            </div>
            <span id="logged-in-user-name">${activeUserUpdated}</span><span>(You)</span>
        </div>
            <div>
                <img id="checkbox-active-user" src=${checkBox} alt="Checkbox">
            </div>
    </div>`;
}

function renderContactsAfterSearchHtml(i, bgColor, color, userNameInitial, userName, checkBox) {
    return /*html*/`
    <div id="${i}" onclick="assignTaskToContact(${i})" class="single-contact-container ${bgColor}">
        <div class="single-contact-name-container">
            <div class="contact-name-initials-container" style="background-color: ${color};">
                <span class="user-initials-span">${userNameInitial}</span>
            </div>
            <span id="assigned-contact-name${i}">${userName}</span>
        </div>
        <div>
            <img id="checkbox${i}" src=${checkBox} alt="Checkbox">
        </div>
    </div>`;
}