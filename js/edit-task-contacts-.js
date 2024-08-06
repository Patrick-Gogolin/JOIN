/**
 * Toggles the visibility of the contact assignment container in the task editing interface.
 * 
 */
function openSelectContactsContainerEditTask() {
    if (!assignOptionsContactsContainerEditTask) {
        openContactsContainerToAssignInEditTask();
    }
    else {
        closeContactsContainerToAssignInEditTask();
    }
}

/**
 * Opens the contact assignment container in the task editing interface.
 * 
 */
function openContactsContainerToAssignInEditTask() {
    let container = document.getElementById('choose-contacts-container-edit-task');
    let assignedContacts = document.getElementById('show-assigned-contacts-edit-task');
    container.classList.remove('d-none');
    assignOptionsContactsContainerEditTask = true;
    renderContactsEditTask();
    assignedContacts.classList.add('d-none')
}

/**
 * Closes the contact assignment container in the task editing interface.
 * 
 */
function closeContactsContainerToAssignInEditTask() {
    let container = document.getElementById('choose-contacts-container-edit-task');
    let assignedContacts = document.getElementById('show-assigned-contacts-edit-task');
    container.classList.add('d-none');
    assignOptionsContactsContainerEditTask = false;
    renderAssignedContactsEditTask();
    assignedContacts.classList.remove('d-none');
}

/**
 * Renders the contacts for the task editing interface.
 * 
 */
function renderContactsEditTask() {
    let activeUserContainer = document.getElementById('active-user-container-edit-task');
    let container = document.getElementById('select-contact-container-edit-task');
    activeUserContainer.innerHTML = "";
    container.innerHTML = "";

    if (activeUser != "" && activeUser[0] != "Guest") {
        renderActiveUserAndContactsInEditTask(activeUserContainer, container);
    }
    else {
        for (let i = 0; i < contacts.length; i++) {
        renderSingleContactsInEditTask(i, container);
        }
    }
}

/**
 * Renders the active user and their associated contacts in the edit task interface.
 *
 * @param {HTMLElement} activeUserContainer - The container for displaying the active user's information.
 * @param {HTMLElement} container - The container for displaying the list of contacts.
 */
function renderActiveUserAndContactsInEditTask(activeUserContainer, container) {
    activeUserContainer.classList.remove('d-none');
    let activeUserUpdated = activeUser.join(" ");
    let activeUserInitialsUpdated = [activeUserInitials.join("")];
    for (let y = 0; y < 1; y++) {
        renderActiveUserInEditTask(activeUserUpdated, activeUserContainer, activeUserInitialsUpdated)

        for (let i = 0; i < contacts.length; i++) {
            renderSingleContactsInEditTask(i, container);
        }
    }
}

/**
 * Renders the active user's information in the edit task interface.
 *
 * @param {string} activeUserUpdated - The updated name of the active user.
 * @param {HTMLElement} activeUserContainer - The container element where the active user's details will be rendered.
 * @param {string[]} activeUserInitialsUpdated - The updated initials of the active user.
 */
function renderActiveUserInEditTask(activeUserUpdated, activeUserContainer, activeUserInitialsUpdated) {
    const activeUserName = activeUserUpdated;
    let checkBox = renderCheckBoxEditTask(activeUserUpdated);
    let bgColor = emptyTask.assignedContacts.indexOf(activeUserUpdated) !== -1 ? 'bg-navy' : 'bg-white';
    activeUserContainer.innerHTML = renderActiveUserInEditTaskHtml(bgColor, colorForActiveUser, activeUserInitialsUpdated, activeUserName, checkBox);
}

/**
 * Renders a single contact's information in the edit task interface.
 *
 * @param {number} i - The index of the contact in the contacts array.
 * @param {HTMLElement} container - The container element where the contact's details will be appended.
 */
function renderSingleContactsInEditTask(i, container) {
    const color = colors[i];
    const userName = userNames[i];
    const userNameInitial = userNamesInitials[i];
    let checkBoxContacts = renderCheckBoxEditTask(userName);
    let bgColor = emptyTask.assignedContacts.indexOf(userName) !== -1 ? 'bg-navy' : 'bg-white'
    container.innerHTML += renderContactsInEditTaskHtml(i, bgColor, color, userNameInitial, checkBoxContacts, userName);
}

/**
 * Searches for contacts in the edit task interface and updates the contact list based on the search input.
 * 
 */
function searchContactsEditTask() {
    let search = document.getElementById('search-contact-inputfield-edit-task').value.toLowerCase().trim();
    let content = document.getElementById('select-contact-container-edit-task');
    let activeUserContainer = document.getElementById('active-user-container-edit-task');
    let container = document.getElementById('choose-contacts-container-edit-task');
    let assignedContacts = document.getElementById('show-assigned-contacts-edit-task');
    content.innerHTML = '';

    if(search.length > 0) {
        container.classList.remove('d-none');
        assignOptionsContactsContainerEditTask = true;
        assignedContacts.classList.add('d-none');
    }
    else {
        closeContactsContainerToAssignInEditTask();
    }

    renderActiveUserIfLoggedInAfterSearchEditTask(activeUserContainer, search);
    renderContactsAfterSearchInEditTask(content, search)
}

/**
 * Renders the active user in the edit task interface if they are logged in and match the search query.
 *
 * @param {HTMLElement} activeUserContainer - The DOM element where the active user's information will be rendered.
 * @param {string} search - The search query entered by the user.
 */
function renderActiveUserIfLoggedInAfterSearchEditTask(activeUserContainer, search) {
    if (activeUser.length > 0 && activeUser[0] != "Guest") { 
        let activeUserUpdated = activeUser.join(" ");
        let activeUserInitialsUpdated = activeUserInitials.join("");
        let checkBox = renderCheckBoxEditTask(activeUserUpdated);
        let bgColor = emptyTask.assignedContacts.indexOf(activeUserUpdated) !== -1 ? 'bg-navy' : 'bg-white';
        let color = colorForActiveUser;

        if (activeUserUpdated.toLowerCase().includes(search)) {
            activeUserContainer.classList.remove('d-none');
            activeUserContainer.innerHTML = renderActiveUserInEditTaskHtmlAfterSearch(bgColor, color, activeUserInitialsUpdated, activeUserUpdated, checkBox);
        } else {
            activeUserContainer.innerHTML = '';
        }
    } else {
        activeUserContainer.classList.add('d-none');
    }
}

/**
 * Renders the contacts in the edit task interface that match the search query.
 *
 * @param {HTMLElement} content - The DOM element where the matching contacts will be rendered.
 * @param {string} search - The search query entered by the user.
 */
function renderContactsAfterSearchInEditTask(content, search) {
    for (let i = 0; i < contacts.length; i++) {
        const color = colors[i];
        const userName = userNames[i];
        const userNameLowerCase = userName.toLowerCase();
        const userNameInitial = userNamesInitials[i];
        let checkBoxContacts = renderCheckBoxEditTask(userName);
        let bgColor = emptyTask.assignedContacts.indexOf(userName) !== -1 ? 'bg-navy' : 'bg-white'

        if (userNameLowerCase.includes(search)) {
        content.innerHTML += renderContactsInEditTaskHtmlAfterSearch(i, bgColor, color, userNameInitial, userName, checkBoxContacts);
        }
    }
}

/**
 * Renders the assigned contacts in the edit task interface.
 * 
 */
function renderAssignedContactsEditTask() {
    getInitialsAssignedContactsIdEditTask();
    let assignedContactsContainer = document.getElementById('show-assigned-contacts-edit-task');
    assignedContactsContainer.innerHTML = "";
    for (let i = 0; i < assignedContactsInitialsEditTask.length; i++) {
        const initials = assignedContactsInitialsEditTask[i];
        const color = emptyTask.assignedContactsColors[i];
        assignedContactsContainer.innerHTML += renderAssignedContactsInEditTaskHtml(color, initials);
    }
}