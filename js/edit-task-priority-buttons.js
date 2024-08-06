/**
 * Toggles the urgent priority status for the task being edited.
 * 
 */
function urgentPriorityEditTask() {
    let urgentButton = document.getElementById('urgent-button-edit-task');
    let urgentPrioSign = document.getElementById('urgent-prio-sign-edit-task');
    if (!urgentActiveEditTask) {
        resetButtonsEditTask();
        let taskPriority = urgentButton.innerText;
        urgentButton.classList.add('urgent');
        urgentPrioSign.src = 'img/urgent-prio-white.svg';
        emptyTask.priority = taskPriority;
    } else {
        urgentButton.classList.remove('urgent');
        urgentPrioSign.src = 'img/urgent-prio.svg';
        emptyTask.priority = "";
    }

    urgentActiveEditTask = !urgentActiveEditTask;
}

/**
 * Toggles the medium priority status for the task being edited.
 * 
 */
function mediumPriorityEditTask() {
    let urgentButton = document.getElementById('medium-button-edit-task');
    let urgentPrioSign = document.getElementById('medium-prio-sign-edit-task');
    if (!mediumActiveEditTask) {
        resetButtonsEditTask();
        let taskPriority = urgentButton.innerText;
        urgentButton.classList.add('medium');
        urgentPrioSign.src = 'img/medium-prio.svg';
        emptyTask.priority = taskPriority;
    } else {
        urgentButton.classList.remove('medium');
        urgentPrioSign.src = 'img/medium-prio-orange.svg';
        emptyTask.priority = "";
    }

    mediumActiveEditTask = !mediumActiveEditTask;
}

/**
 * Toggles the low priority status for the task being edited.
 * 
 */
function lowPriorityEditTask() {
    let urgentButton = document.getElementById('low-button-edit-task');
    let urgentPrioSign = document.getElementById('low-prio-sign-edit-task');
    if (!lowActiveEditTask) {
        resetButtonsEditTask();
        let taskPriority = urgentButton.innerText;
        urgentButton.classList.add('low');
        urgentPrioSign.src = 'img/low-prio-white.svg';
        emptyTask.priority = taskPriority;
    } else {
        urgentButton.classList.remove('low');
        urgentPrioSign.src = 'img/low-prio.svg';
        emptyTask.priority = "";
    }

    lowActiveEditTask = !lowActiveEditTask;
}

/**
 * Resets the priority buttons in the task editing interface.
 * 
 */
function resetButtonsEditTask() {
    emptyTask.Priority = "";
    resetUrgentButtonEditTask();
    resetMediumButtonEditTask();
    resetLowButtonEditTask();
}

/**
 * Resets the appearance and state of the 'Urgent' priority button in the task editing interface.
 * 
 */
function resetUrgentButtonEditTask() {
    let urgentButton = document.getElementById('urgent-button-edit-task');
    let urgentPrioSign = document.getElementById('urgent-prio-sign-edit-task');
    urgentButton.classList.remove('urgent');
    urgentPrioSign.src = 'img/urgent-prio.svg';
    urgentActiveEditTask = false;
}

/**
 * Resets the appearance and state of the 'Medium' priority button in the task editing interface.
 * 
 */
function resetMediumButtonEditTask() {
    let mediumButton = document.getElementById('medium-button-edit-task');
    let mediumPrioSign = document.getElementById('medium-prio-sign-edit-task');
    mediumButton.classList.remove('medium');
    mediumPrioSign.src = 'img/medium-prio-orange.svg';
    mediumActiveEditTask = false;
}

/**
 * Resets the appearance and state of the 'Low' priority button in the task editing interface.
 * 
 */
function resetLowButtonEditTask() {
    let lowButton = document.getElementById('low-button-edit-task');
    let lowPrioSign = document.getElementById('low-prio-sign-edit-task');
    lowButton.classList.remove('low');
    lowPrioSign.src = 'img/low-prio.svg';
    lowActiveEditTask = false;
}