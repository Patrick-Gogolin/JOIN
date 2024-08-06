let emptyTask = null;
let urgentActiveEditTask = false;
let mediumActiveEditTask = false;
let lowActiveEditTask = false;
let assignOptionsContactsContainerEditTask = false;
let assignedContactsInitialsEditTask = [];
let editMenuSubtaskIsOpenInEditTask = false;
let currentSubtask = null;

/**
 * Opens the edit task window with the provided task ID.
 * 
 * @param {string} id - The ID of the task to edit.
 */
function OpenEditTaskWindow(id) {
    closeEditTaskOverlay('edit-task-overlayer');
    openEditTaskOverlayer('edit-task-popup');
    let content = document.getElementById('edit-task-popup');
    let index = taskKeys.indexOf(id);
    let task = allTasks[index];
    emptyTask = JSON.parse(JSON.stringify(task));
    checkStatusOfPriority(emptyTask);
    let {urgentClass, mediumClass, lowClass} = getPriorityClasses(task.priority);
    let {urgentClassSvg, mediumClassSvg, lowClassSvg} = getPrioritySvgPaths(task.priority);
    content.innerHTML = renderEditTaskSlideHtml(task, urgentClass, mediumClass, lowClass, index,urgentClassSvg, mediumClassSvg, lowClassSvg);

    eventListenerForSubtaskInputField('add-subtask-input-container-inputfield-edit-task')
    renderAssignedContactsEditTask();
    renderSubtasksFromEditTask();
}

/**
 * Checks the priority status of the given task and sets the corresponding flags.
 *
 * @param {Object} emptyTask - The task object to check the priority status of.
 */
function checkStatusOfPriority(emptyTask) {
    if(emptyTask.priority === "Medium") {
        mediumActiveEditTask = true;
    }
    if(emptyTask.priority === "Urgent") {
        urgentActiveEditTask = true;
    }
    if(emptyTask.priority === "Low") {
        lowActiveEditTask = true;
    }
}

/**
 * Adds an event listener to a subtask input field to handle 'Enter' key press.
 *
 * @param {string} id - The ID of the input field element.
 */
function eventListenerForSubtaskInputField(id) {
    let inputField = document.getElementById(id);
    if (inputField) {
        inputField.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                event.stopPropagation();
                addSubtaskEditTask();
            }
        });
    }
}

/**
 * Returns the appropriate SVG paths based on the priority level.
 *
 * @param {string} priority - The priority level ('Urgent', 'Medium', 'Low').
 * @returns {Object} An object containing SVG paths for urgent, medium, and low priorities.
 */
function getPrioritySvgPaths(priority) {
    return {
        urgentClassSvg: priority === 'Urgent' ? 'img/urgent-prio-white.svg' : 'img/urgent-prio.svg',
        mediumClassSvg: priority === 'Medium' ? 'img/medium-prio.svg' : 'img/medium-prio-orange.svg',
        lowClassSvg: priority === 'Low' ? 'img/low-prio-white.svg' : 'img/low-prio.svg'
    };
}

/**
 * Returns an object with CSS class names based on the priority level.
 *
 * @param {string} priority - The priority level ('Urgent', 'Medium', 'Low').
 * @returns {Object} An object containing CSS class names for urgent, medium, and low priorities.
 */
function getPriorityClasses(priority) {
    return {
        urgentClass: priority === 'Urgent' ? 'urgent' : '',
        mediumClass: priority === 'Medium' ? 'medium' : '',
        lowClass: priority === 'Low' ? 'low' : '',
    };
}

/**
 * Extracts the initials of assigned contacts for the edit task and updates the global array `assignedContactsInitialsEditTask`.
 *
 */
function getInitialsAssignedContactsIdEditTask() {
    assignedContactsInitialsEditTask.length = 0;
    emptyTask.assignedContacts.map(name => {
    let nameParts = name.split(/[\s-]+/);
    let initial = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
    assignedContactsInitialsEditTask.push(initial);
    });
}

/**
 * Determines the appropriate checkbox image URL for a contact in the edit task based on their assignment status.
 *
 * @param {string} id - The identifier of the contact to check for assignment.
 * @returns {string} The URL of the appropriate checkbox image.
 */
function renderCheckBoxEditTask(id) {
    if(emptyTask.assignedContacts.length === 0) {
        return "img/empty-check-box.svg";
    }
    else if(emptyTask.assignedContacts.indexOf(id) !== -1) {
        return "img/filled-check-box-white.svg"
    }
    else {
        return "img/empty-check-box.svg";
    }
}

/**
 * Assigns or unassigns a task to the currently logged-in user in the edit task view.
 *
 * @param {string} i - The ID of the HTML element representing the contact in the task assignment view.
 */
function assignTaskToLoggedInUserEditTask(i) {
    let container = document.getElementById(i);
    let loggedInUserName = document.getElementById('logged-in-user-name-edit-task').innerHTML;
    let index = emptyTask.assignedContacts.indexOf(loggedInUserName);
    let checkbox = document.getElementById('checkbox-active-user-edit-task');
    if (index === -1) {
        markActiveUserAndAssignTaskToHimInEditTask(container, loggedInUserName, checkbox);
    }
    else {
        unmarkAndTakeTaskAwayInEditTask(container, index, checkbox);
    }
}

/**
 * Marks the currently logged-in user as assigned to the task in the edit task view.
 *
 * @param {HTMLElement} container - The HTML element representing the contact in the task assignment view.
 * @param {string} loggedInUserName - The name of the currently logged-in user who is being assigned the task.
 * @param {HTMLImageElement} checkbox - The image element representing the checkbox icon that indicates assignment status.
 */
function markActiveUserAndAssignTaskToHimInEditTask(container, loggedInUserName, checkbox) {
    container.classList.add('bg-navy');
    emptyTask.assignedContactsColors.push(colorForActiveUser[0]);
    emptyTask.assignedContacts.push(loggedInUserName);
    checkbox.src = "img/filled-check-box-white.svg";
}

/**
 * Unmarks the currently logged-in user and removes the task assignment in the edit task view.
 *
 * @param {HTMLElement} container - The HTML element representing the contact in the task assignment view.
 * @param {number} index - The index of the logged-in user's name in the `emptyTask.assignedContacts` array.
 * @param {HTMLImageElement} checkbox - The image element representing the checkbox icon that indicates assignment status.
 */
function unmarkAndTakeTaskAwayInEditTask(container, index, checkbox) {
    container.classList.remove('bg-navy');
    emptyTask.assignedContacts.splice(index,1);
    emptyTask.assignedContactsColors.splice(index, 1);
    checkbox.src = "img/empty-check-box.svg";
}

/**
 * Assigns or unassigns a task to a contact in the edit task view.
 *
 * @param {number} i - The index or identifier used to locate the specific contact and associated elements.
 * @param {HTMLElement} container - The HTML element representing the contact's container in the task assignment view.
 * @param {string} contactName - The name of the contact being assigned or unassigned.
 * @param {HTMLImageElement} checkbox - The image element representing the checkbox icon for the contact's assignment status.
 */
function assignTaskToContactEditTask(i) {
    let container = document.getElementById(`assign-contact-to-task${i}`);
    let contactName = document.getElementById(`assigned-contact-name-edit-task${i}`).innerHTML;
    let index = emptyTask.assignedContacts.indexOf(contactName);
    let checkbox = document.getElementById(`checkbox-edit-task${i}`);
    if (index === -1) {
        markContactAndAssignTaskToHimInEditTask(container, contactName, i, checkbox);
    }
    else {
        unmarkAndTakeTaskAwayInEditTask(container, index, checkbox);
    }
}

/**
 * Marks a contact as assigned to a task and updates the UI accordingly.
 * 
 * @param {HTMLElement} container - The HTML element representing the contact's container.
 * @param {string} contactName - The name of the contact being assigned to the task.
 * @param {number} i - The index of the contact used to determine the color for the assignment.
 * @param {HTMLImageElement} checkbox - The image element representing the checkbox icon for the contact's assignment status.
 */
function markContactAndAssignTaskToHimInEditTask(container, contactName, i, checkbox) {
    container.classList.add('bg-navy');
    emptyTask.assignedContactsColors.push(colors[i]);
    emptyTask.assignedContacts.push(contactName);
    checkbox.src = "img/filled-check-box-white.svg"
}

/**
 * Updates the title of the current task with the value from the title input field.
 *
 */
function newTitle() {
    let title = document.getElementById("title-edit-task").value;
    emptyTask.title = title;
}

/**
 * Updates the description of the current task with the value from the description input field.
 *
 */
function newDescription() {
    let description = document.getElementById("description-of-task-edit-task").value;
    emptyTask.description = description;
}

/**
 * Updates the deadline of the current task with the value from the date input field.
 *
 */
function newDate() {
    let date = document.getElementById("date-edit-task").value;
    emptyTask.deadline = date;
}

/**
 * Sends an HTTP PUT request to update a task on the server with the current task data.
 *
 * @param {string} [path=""] - The endpoint path where the task update request will be sent.
 * @param {Object} [data={}] - An object containing the task's details. Defaults to an empty object.
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the server.
 * 
 */
async function updateTask(path = "", data={}) {
   data = {
        id: "",
        title: emptyTask['title'],
        description: emptyTask['description'],
        deadline: emptyTask['deadline'],
        priority: emptyTask['priority'],
        subtasks: JSON.stringify(emptyTask['subtasks']),
        doneSubtasks: JSON.stringify(emptyTask['doneSubtasks']),
        assignedContacts: JSON.stringify(emptyTask['assignedContacts']),
        assignedContactsColors: JSON.stringify(emptyTask['assignedContactsColors']),
        assignedContactsId: JSON.stringify(emptyTask['assignedContactsId']),
        category: emptyTask['category'],
        status: emptyTask['status']
    };
    let response = await fetch(BASE_URL + path + ".json",{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
  return responseToJson = await response.json();
  }

  /**
 * Finalizes and updates a task based on the current values in the edit form.
 *
 * @param {number} index - The index of the task in the `taskKeys` array to be updated.
 * @returns {Promise<void>} A promise that resolves when the task update is complete.
 *
 */
 async function finalUpdateTask(index) {
    let title = document.getElementById('title-edit-task');
    let date = document.getElementById('date-edit-task');
    let titleRequiredSpan = document.getElementById('title-required-span-edit-task');
    let dateRequiredSpan = document.getElementById('date-required-span-edit-task');
    let indexOfTaskKeys = taskKeys.indexOf(emptyTask.id);
    allTasks[indexOfTaskKeys] = emptyTask;
    let key = taskKeys[indexOfTaskKeys];

    checkField(title, titleRequiredSpan);
    checkField(date, dateRequiredSpan);

    if (title.value !== "" && date.value !== "") {
        await updateTask(`/tasks/${taskKeys[index]}`)
        closeEditTaskOverlay('edit-task-popup');
        updateHTML();
        renderDetailTaskSlide(key);
    }
}
