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

function openContactsContainerToAssign() {
    let contactsContainer = document.getElementById('choose-contacts-container');
    let assignedContacts = document.getElementById('show-assigned-contacts');
    contactsContainer.classList.remove('d-none');
    assignOptionsContactsContainer = true;
    renderContacts();
    assignedContacts.classList.add('d-none');
}

function closeContactsContainerToAssign() {
    let contactsContainer = document.getElementById('choose-contacts-container');
    let assignedContacts = document.getElementById('show-assigned-contacts');
    contactsContainer.classList.add('d-none');
    assignOptionsContactsContainer = false;
    renderAssignedContacts();
    assignedContacts.classList.remove('d-none');
}

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

function renderActiveUser(y, activeUserUpdated, activeUserContainer, activeUserInitialsUpdated) {
    const activeUserName = activeUserUpdated[y];
    let checkBox = renderCheckBox("logged-in-user");
    let bgColor = assignedContactsId.indexOf('logged-in-user') !== -1 ? 'bg-navy' : 'bg-white';
    activeUserContainer.innerHTML = renderActiveUserHtml(activeUserName, activeUserInitialsUpdated, y, checkBox, bgColor, colorForActiveUser);
}

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
    renderContacts(content, search);
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

function renderContacts(content, search) {
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