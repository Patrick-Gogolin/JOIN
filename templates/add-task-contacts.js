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

/**
 * Assigns or unassigns a task to the logged-in user.
 *
 * This function toggles the assignment of a task to the logged-in user based on the current state.
 * If the user is not already assigned to the task, it marks the user as assigned and updates the relevant UI elements.
 * If the user is already assigned, it unmarks the user and removes the task assignment.
 *
 * @param {number} i - The index or identifier for the task element.
 */
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

/**
 * Marks the active user and assigns the task to them.
 *
 * This function visually marks the active user as assigned to a task, updates the assigned contacts array,
 * and changes the checkbox to indicate that the task has been assigned to the active user.
 *
 * @param {HTMLElement} container - The HTML element representing the task container.
 * @param {string} loggedInUserName - The name of the logged-in user.
 * @param {number} i - The index or identifier for the task element.
 * @param {HTMLElement} checkbox - The checkbox element representing the task assignment status.
 */
function markActiveUserAndAssignTaskToHim(container, loggedInUserName, i, checkbox)  {
    container.classList.add('bg-navy');
    assignedContactsColors.push(colorForActiveUser[0]);
    assignedContactsId.push(i);
    assignedContactsNames.push(loggedInUserName)
    checkbox.src = "img/filled-check-box-white.svg"
}

/**
 * Unmarks the active user and removes the task assignment.
 *
 * This function visually unmarks the active user as assigned to a task, updates the assigned contacts array
 * by removing the user, and changes the checkbox to indicate that the task has been unassigned from the active user.
 *
 * @param {HTMLElement} container - The HTML element representing the task container.
 * @param {number} index - The index of the user in the assigned contacts arrays.
 * @param {HTMLElement} checkbox - The checkbox element representing the task assignment status.
 */
function unmarkAndTakeTaskAway(container, index, checkbox) {
    container.classList.remove('bg-navy');
    assignedContactsColors.splice(index,1);
    assignedContactsNames.splice(index, 1);
    assignedContactsId.splice(index, 1);
    checkbox.src = "img/empty-check-box.svg"
}

/**
 * Assigns or unassigns a task to a contact based on the current state.
 *
 * This function toggles the assignment of a task to a contact. It either marks the contact as assigned to the
 * task if they are not currently assigned, or unmarks them if they are already assigned. It updates the visual
 * representation and the assigned contacts arrays accordingly.
 *
 * @param {string} i - The ID of the HTML element representing the contact.
 */
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

/**
 * Marks a contact as assigned to the task and updates the visual representation.
 *
 * This function adds the contact to the list of assigned contacts and updates the associated visual elements
 * to reflect this assignment. It modifies the contact container's background color and updates the checkbox
 * to show the contact as selected. The contact's color, ID, and name are added to the respective arrays.
 *
 * @param {HTMLElement} container - The HTML element representing the contact container.
 * @param {string} contactName - The name of the contact being assigned.
 * @param {string} i - The ID of the contact.
 * @param {HTMLImageElement} checkbox - The checkbox element indicating the assignment status.
 */
function markContactAndAssignTaskToHim(container, contactName, i, checkbox) {
    container.classList.add('bg-navy');
    assignedContactsColors.push(colors[i]);
    assignedContactsId.push(i);
    assignedContactsNames.push(contactName)
    checkbox.src = "img/filled-check-box-white.svg"
}

/**
 * Returns the path to the checkbox image based on the assignment status of a contact.
 *
 * This function determines the appropriate image for a checkbox based on whether the contact ID is in the list
 * of assigned contact IDs. It returns a path to either a filled or empty checkbox image, depending on the contact's
 * assignment status.
 *
 * @param {string} id - The ID of the contact for which the checkbox image is to be determined.
 * @returns {string} The path to the checkbox image (`img/filled-check-box-white.svg` or `img/empty-check-box.svg`).
 */
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

/**
 * Renders the list of assigned contacts in the assigned contacts container.
 *
 * This function updates the HTML content of the assigned contacts container by rendering
 * each assigned contact with their initials and color. It retrieves the initials and color
 * information for each assigned contact, clears the existing content in the container, and
 * appends the new rendered HTML.
 */
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

/**
 * Searches for contacts based on the input value and updates the UI accordingly.
 *
 * This function performs a search operation based on the value entered in the search input field.
 * It updates the display of contacts in the `select-contact-container` based on the search term.
 * Additionally, it shows or hides various UI elements such as the contacts container and assigned contacts
 * based on whether there is a search query. If a search query is present, it reveals the contacts container 
 * and hides the assigned contacts. If no search query is present, it closes the contacts container and 
 * displays assigned contacts.

 */
function searchContacts() {
    let search = document.getElementById('search-contact-inputfield-main').value.toLowerCase().trim();
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

/**
 * Renders the active user in the UI if they are logged in and their name matches the search query.
 *
 * This function checks if there is an active user and if their name does not indicate a guest. 
 * If an active user is found, it creates a display for the user based on their name and initials,
 * and updates the UI to reflect the current state (e.g., assigned or not assigned). The active user's 
 * details are rendered only if their name matches the search query. If the search query does not match, 
 * the active user's container is cleared. If there is no active user or if the active user is a guest, 
 * the container is hidden.
 *
 * @param {HTMLElement} activeUserContainer - The DOM element that displays the active user's information.
 * @param {string} search - The search query used to filter the active user display.
 */
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

/**
 * Renders contact information in the UI based on the search query.
 *
 * This function iterates through all user names and displays contact information in the given container 
 * (`content`) only for those contacts whose names match the search query. Each contact is displayed with 
 * an associated checkbox, background color indicating whether they are assigned, and other relevant details.
 * If a contact's name includes the search query (case-insensitive), the contact is added to the `content` container.
 *
 * @param {HTMLElement} content - The DOM element where the contact information will be rendered.
 * @param {string} search - The search query used to filter the contacts displayed in the UI.
 */
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