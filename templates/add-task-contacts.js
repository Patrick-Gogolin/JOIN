/**
 * Toggles the visibility of the select contacts container.
 *
 * This function handles the opening and closing of the container for selecting contacts. It stops the propagation
 * of the click event to prevent unintended side effects. It also ensures that the category container is hidden
 * if it is currently open. Depending on the current state of the contacts container, it either opens or closes it.
 *
 * @param {Event} event - The click event that triggered the function. The event propagation is stopped to prevent the event from bubbling up to parent elements.
 */


function openSelectContactsContainer(event) {
    event.stopPropagation();
    let categoryContainer = document.getElementById('choose-category-container');

    if (assignCategoryContainer) {
        categoryContainer.classList.add('d-none');
        assignCategoryContainer = false;
    }
    if (!assignOptionsContactsContainer) {
        openContactsContainerToAssign()
    } else {
        closeContactsContainerToAssign()
    }
}

/**
 * Toggles the visibility of the select contacts container and handles category container visibility.
 *
 * This function manages the display state of the container used to select contacts. It stops the propagation of the
 * click event to prevent other event handlers from executing. It ensures that the category selection container is
 * closed if it is open. Then, it toggles the visibility of the contacts selection container based on its current state.
 *
 * @param {Event} event - The click event that triggered the function. The event propagation is stopped to prevent
 *                        the event from bubbling up to parent elements.
 */
function openContactsContainerToAssign() {
    let contactsContainer = document.getElementById('choose-contacts-container');
    let assignedContacts = document.getElementById('show-assigned-contacts');
    contactsContainer.classList.remove('d-none');
    assignOptionsContactsContainer = true;
    renderContacts();
    assignedContacts.classList.add('d-none');
}

/**
 * Closes the contacts selection container and updates the assigned contacts display.
 *
 * This function hides the contacts selection container and sets the corresponding state variable to false.
 * It then calls the `renderAssignedContacts` function to update the displayed list of assigned contacts
 * and ensures that the assigned contacts container is visible.
 */
function closeContactsContainerToAssign() {
    let contactsContainer = document.getElementById('choose-contacts-container');
    let assignedContacts = document.getElementById('show-assigned-contacts');
    contactsContainer.classList.add('d-none');
    assignOptionsContactsContainer = false;
    renderAssignedContacts();
    assignedContacts.classList.remove('d-none');
}

/**
 * Renders the active user and contacts into their respective containers.
 *
 * This function clears the inner HTML of the active user and contact containers. 
 * If there is an active user that is not a guest, it calls `renderActiveUserAndContacts` 
 * to display the active user and their contacts. Otherwise, it iterates over all contacts 
 * and renders each one individually using `renderSingleContact`.
 */
function renderContacts() {
    let activeUserContainer = document.getElementById('active-user-container');
    let container = document.getElementById('select-contact-container');
    activeUserContainer.innerHTML = "";
    container.innerHTML = "";

    if (activeUser != "" && activeUser[0] != "Guest" ) {
        renderActiveUserAndContacts(activeUserContainer, container);
    }
    else {
        for (let i = 0; i < contacts.length; i++) {
            renderSingleContact(i, container);
        }
    }
}

/**
 * Renders the active user and their contacts into the provided containers.
 *
 * This function makes the active user container visible and updates the active user's
 * name and initials. It then iterates over the active user array to render the active user,
 * followed by iterating over all contacts to render each one individually.
 *
 * @param {HTMLElement} activeUserContainer - The container element for displaying the active user.
 * @param {HTMLElement} container - The container element for displaying the contacts.
 */

function renderActiveUserAndContacts(activeUserContainer, container) {
    activeUserContainer.classList.remove('d-none');
    let activeUserUpdated = [activeUser.join(" ")];
    let activeUserInitialsUpdated = [activeUserInitials.join("")];

    for (let y = 0; y < activeUserUpdated.length; y++) {
        renderActiveUser(y, activeUserUpdated, activeUserContainer, activeUserInitialsUpdated);

        for (let i = 0; i < contacts.length; i++) {
            renderSingleContact(i, container);
        }
    }
}

/**
 * Renders the active user's information into the specified container.
 *
 * This function generates the HTML content for the active user based on their name,
 * initials, and other properties. It also determines the background color for the active
 * user container based on whether the active user is included in the assigned contacts.
 *
 * @param {number} y - The index of the active user in the activeUserUpdated array.
 * @param {string[]} activeUserUpdated - An array containing the active user's updated name.
 * @param {HTMLElement} activeUserContainer - The container element for displaying the active user.
 * @param {string[]} activeUserInitialsUpdated - An array containing the active user's updated initials.
 */
function renderActiveUser(y, activeUserUpdated, activeUserContainer, activeUserInitialsUpdated) {
    const activeUserName = activeUserUpdated[y];
    let checkBox = renderCheckBox("logged-in-user");
    let bgColor = assignedContactsId.indexOf('logged-in-user') !== -1 ? 'bg-navy' : 'bg-white';
    activeUserContainer.innerHTML = renderActiveUserHtml(activeUserName, activeUserInitialsUpdated, y, checkBox, bgColor, colorForActiveUser);
}

/**
 * Renders a single contact's information into the specified container.
 *
 * This function generates the HTML content for a contact based on their color,
 * name, initials, and other properties. It also determines the background color for
 * the contact container based on whether the contact is included in the assigned contacts.
 *
 * @param {number} index - The index of the contact in the contacts array.
 * @param {HTMLElement} container - The container element for displaying the contact.
 */
function renderSingleContact(index, container) {
    const color = colors[index];
    const userName = userNames[index];
    const userNameInitial = userNamesInitials[index];
    let checkBoxContacts = renderCheckBox(index);
    let bgColor = assignedContactsId.indexOf(index) !== -1 ? 'bg-navy' : 'bg-white';
    container.innerHTML += renderContactsHtml(color, userName, userNameInitial, bgColor, checkBoxContacts, index);
}

function assignTaskToLoggedInUser(i) {
    let container = document.getElementById(i);
    let loggedInUserName = document.getElementById('logged-in-user-name').innerHTML;
    let index = assignedContactsId.indexOf(i);
    let checkbox = document.getElementById('checkbox-active-user');
    if (index === -1) {
        markActiveUserAndAssignTaskToHim(container,loggedInUserName, i, checkbox);
    }
    else {
        unmarkAndTakeTaskAway(container, index, checkbox);
    }
}

function markActiveUserAndAssignTaskToHim(container, loggedInUserName, i, checkbox)  {
    container.classList.add('bg-navy');
    assignedContactsColors.push(colorForActiveUser[0]);
    assignedContactsId.push(i);
    assignedContactsNames.push(loggedInUserName)
    checkbox.src = "img/filled-check-box-white.svg"
}

function unmarkAndTakeTaskAway(container, index, checkbox) {
    container.classList.remove('bg-navy');
    assignedContactsColors.splice(index,1);
    assignedContactsNames.splice(index, 1);
    assignedContactsId.splice(index, 1);
    checkbox.src = "img/empty-check-box.svg"
}

function assignTaskToContact(i) {
    let container = document.getElementById(i);
    let contactName = document.getElementById(`assigned-contact-name${i}`).innerHTML;
    let index = assignedContactsId.indexOf(i);
    let checkbox = document.getElementById(`checkbox${i}`);
    if (index === -1) {
        markContactAndAssignTaskToHim(container, contactName, i, checkbox);
    }
    else {
        unmarkAndTakeTaskAway(container, index, checkbox);
    }
}

function markContactAndAssignTaskToHim(container, contactName, i, checkbox) {
    container.classList.add('bg-navy');
    assignedContactsColors.push(colors[i]);
    assignedContactsId.push(i);
    assignedContactsNames.push(contactName)
    checkbox.src = "img/filled-check-box-white.svg"
}

function renderCheckBox(id) {
    if(assignedContactsId.length === 0) {
        return "img/empty-check-box.svg";
    }
    else if(assignedContactsId.indexOf(id) !== -1) {
        return "img/filled-check-box-white.svg"
    }
    else {
        return "img/empty-check-box.svg";
    }
}

function renderAssignedContacts() {
    getInitialsAssignedContactsId();
    let assignedContactsContainer = document.getElementById('show-assigned-contacts');
    assignedContactsContainer.innerHTML = "";
    for (let i = 0; i < assignedContactsInitials.length; i++) {
        const initials = assignedContactsInitials[i];
        const color = assignedContactsColors[i];
        assignedContactsContainer.innerHTML += renderAssignedContactsHtml(color, initials);
    }
}

function searchContacts() {
    let search = document.getElementById('search-contact-inputfield').value.toLowerCase().trim();
    let content = document.getElementById('select-contact-container');
    let activeUserContainer = document.getElementById('active-user-container');
    let contactsContainer = document.getElementById('choose-contacts-container');
    let assignedContacts = document.getElementById('show-assigned-contacts');
    content.innerHTML = '';

    if(search.length > 0) {
        contactsContainer.classList.remove('d-none');
        assignOptionsContactsContainer = true;
        assignedContacts.classList.add('d-none');
    }
    else {
        closeContactsContainerToAssign()
    }

    renderActiveUserIfLoggedIn(activeUserContainer, search);
    renderContactsAfterSearch(content, search);
}

function renderActiveUserIfLoggedIn(activeUserContainer, search) {
    if (activeUser.length > 0 && activeUser[0] != "Guest") { 
        let activeUserUpdated = activeUser.join(" ");
        let activeUserInitialsUpdated = activeUserInitials.join("");
        let checkBox = renderCheckBox("logged-in-user");
        let bgColor = assignedContactsId.includes('logged-in-user') ? 'bg-navy' : 'bg-white';
        let color = colorForActiveUser;

        if (activeUserUpdated.toLowerCase().includes(search)) {
            activeUserContainer.classList.remove('d-none');
            activeUserContainer.innerHTML = renderActiveUserAfterSearchHtml(bgColor, color, activeUserInitialsUpdated, activeUserUpdated, checkBox);
        } else {
            activeUserContainer.innerHTML = '';
        }
    } else {
        activeUserContainer.classList.add('d-none');
    }
}

function renderContactsAfterSearch(content, search) {
    for (let i = 0; i < userNames.length; i++) {
        let checkBox = renderCheckBox(i);
        const userName = userNames[i];
        const userNameLowerCase = userName.toLowerCase();
        const color = colors[i];
        const userNameInitial = userNamesInitials[i];
        let bgColor = assignedContactsId.includes(i) ? 'bg-navy' : 'bg-white';

        if (userNameLowerCase.includes(search)) {
            content.innerHTML += renderContactsAfterSearchHtml(i, bgColor, color, userNameInitial, userName, checkBox);
        }
    }
}