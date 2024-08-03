const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"
let allTasks = [];
let taskKeys = null;
let taskStatuses = ["todo", "progress", "feedback", "done"];

/**
 * Fetches tasks from a specified path and updates the `allTasks` array.
 *  
 * @param {string} path - The path appended to the `BASE_URL` to fetch tasks. This should be a relative path, for example, 'tasks' or 'projects/tasks'.
 *
 */
async function getTasks(path = "") {
    allTasks.length = 0;
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();;
    let keys = Object.keys(responseToJson);
    taskKeys = keys;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const task = responseToJson[key];
        data = {
            id: key,
            title: task['title'],
            description: task['description'],
            deadline: task['deadline'],
            priority: task['priority'],
            subtasks: JSON.parse(task['subtasks']),
            doneSubtasks: JSON.parse(task['doneSubtasks']),
            assignedContacts: JSON.parse(task['assignedContacts']),
            assignedContactsColors: JSON.parse(task['assignedContactsColors']),
            assignedContactsId: JSON.parse(task['assignedContactsId']),
            category: task['category'],
            status: task['status']
        };
        allTasks.push(data);
    }
    updateHTML();
}

/**
 * Opens the add task overlayer to be able to add a task and prevents body from scrolling when open
 * 
 * @param {string} id - This is the id which is used to define the status of the task which will be created
 */
function openAddTaskOverlayer(id) {
    if(id === "todo") {
     statusOfTask = "todo"
    }
    else if(id === "progress") {
     statusOfTask = "progress"
    }
    else if(id === "feedback") {
     statusOfTask = "feedback"
    }

    document.getElementById('overlayer').classList.remove('d-none');
    document.body.style.overflow = 'hidden';
 }

 /**
 * Renders the detail view of a task and updates the UI with task information.
 * 
 * @param {string} id - The unique identifier of the task to be rendered. This ID is used to locate the task within the `allTasks` array.

 */
function renderDetailTaskSlide(id) {
    let content = document.getElementById('edit-task-overlayer');
    let index = taskKeys.indexOf(id);
    let task = allTasks[index];
    emptyTask = JSON.parse(JSON.stringify(task));
    let imageSrc = renderPriorityImage(task);
    let initials = getInitialsOfFetchedData(task.assignedContacts);
    let bgColor = task.category === "User Story" ? 'bg-blue' : 'bg-green';
    openEditTaskOverlayer('edit-task-overlayer');
    content.innerHTML = renderDetailTaskSlideHtml(task, imageSrc, index, bgColor, id);

    forLoopContactsForDetailTaskSlide(task, initials)
    forLoopSubtasksForDetailTaskSlide(task)
}

/**
 * Opens the specified edit task overlay by removing the 'd-none' class
 * and preventing page scrolling.
 * 
 * @param {string} id - The ID of the overlay element to be opened. This ID is used to locate the element within the DOM.
 */
function openEditTaskOverlayer(id) {
    document.getElementById(`${id}`).classList.remove('d-none');
    document.body.style.overflow = 'hidden';
}

/**
 * Closes the specified edit task overlay by adding the 'd-none' class
 * and re-enabling page scrolling.
 * 
 * @param {string} id - The ID of the overlay element to be closed. This ID is used to locate the element within the DOM.
 */
function closeEditTaskOverlay(id) {
    document.getElementById(`${id}`).classList.add('d-none');
    document.body.style.overflow = 'hidden';
}

/**
 * Renders and appends HTML content for each assigned contact in the task
 * to the specified container element.
 * 
 * @param {Object} task - The task object containing details of the assigned contacts.
 * @param {Array<string>} initials - An array of initials corresponding to each assigned contact.
 */
function forLoopContactsForDetailTaskSlide(task, initials,) {
    for (let i = 0; i < task['assignedContacts'].length; i++) {
        let assignedContactsContent = document.getElementById('assigned-contacts-edit-task-container');
        let contact = task['assignedContacts'][i];
        let initial = initials[i];
        let contactColors = task.assignedContactsColors[i]
        assignedContactsContent.innerHTML += renderDetailTaskSlideContactsHtml(initial, contact, contactColors);
    }
}

/**
 * Renders and appends HTML content for each subtask of the given task to the specified container element, based on whether each subtask is done or not.
 * 
 * @param {Object} task - The task object containing details of the subtasks.        
 */
function forLoopSubtasksForDetailTaskSlide(task) {
    for (let i = 0; i < task['subtasks'].length; i++) {
        let subtaskContent = document.getElementById('task-card-subtasks-container');
        let subtask = task['subtasks'][i];
        let index = task['doneSubtasks'].indexOf(subtask);
        if (index !== -1) {
            subtaskContent.innerHTML += renderDetailTaskSlideDoneSubtasksHtml(subtask, i);
        }
        else {
            subtaskContent.innerHTML += renderDetailTaskSlideNotDoneSubtasksHtml(subtask, i);
        }
    }
}

/**
 * Updates the status of a subtask in the edit task view based on the state of the associated checkbox.
 * 
 * @param {number} i - The index of the task being edited, used to identify the specific subtask and checkbox elements.
 * 
 */
async function changeSubtaskStatusEditTask(i) {
    let subtask = document.getElementById(`subtask-of-edit-task${i}`).innerHTML;
    let checkBoxClickable = document.getElementById(`checkbox-subtask-edit-task-clickable${i}`);
    let indexOfTaskKeys = taskKeys.indexOf(emptyTask.id);
    allTasks[indexOfTaskKeys] = emptyTask;
    let emptyCheckBoxSrc = "img/empty-check-box.svg";
    let filledCheckBoxSrc = "img/filled-check-box.svg";
    
    if (checkBoxClickable.src.endsWith(emptyCheckBoxSrc)) {
        await markSubtaskAsDone(subtask, checkBoxClickable, indexOfTaskKeys, filledCheckBoxSrc);
    } else {
       await markSubtaskAsNotDone(subtask, checkBoxClickable, indexOfTaskKeys, emptyCheckBoxSrc);
        }
}

/**
 * Marks a subtask as completed by updating its checkbox state and adding it to the list of done subtasks.
 * 
 * @param {string} subtask - The text of the subtask that is being marked as done.
 * @param {HTMLImageElement} checkBoxClickable - The HTML `<img>` element representing the checkbox for the subtask.
 * @param {number} indexOfTaskKeys - The index of the task in the `allTasks` array, used to identify which task to update.
 * @param {string} filledCheckBoxSrc - The URL of the image that represents a filled checkbox (completed state).
 */
async function markSubtaskAsDone(subtask, checkBoxClickable, indexOfTaskKeys, filledCheckBoxSrc) {
    checkBoxClickable.src = filledCheckBoxSrc;
    emptyTask.doneSubtasks.push(subtask);
    await updateTask(`/tasks/${allTasks[indexOfTaskKeys].id}`);
    updateHTML();
}

/**
 * Marks a subtask as not completed by updating its checkbox state and removing it from the list of done subtasks.
 * 
 * @param {string} subtask - The text of the subtask that is being marked as not done.
 * @param {HTMLImageElement} checkBoxClickable - The HTML `<img>` element representing the checkbox for the subtask.
 * @param {number} indexOfTaskKeys - The index of the task in the `allTasks` array, used to identify which task to update.
 * @param {string} emptyCheckBoxSrc - The URL of the image that represents an empty checkbox (not completed state).
 */
async function markSubtaskAsNotDone(subtask, checkBoxClickable, indexOfTaskKeys, emptyCheckBoxSrc) {
    checkBoxClickable.src = emptyCheckBoxSrc;
    const subtaskIndex = emptyTask.doneSubtasks.indexOf(subtask);
    if (subtaskIndex !== -1) {
        emptyTask.doneSubtasks.splice(subtaskIndex, 1);
        await updateTask(`/tasks/${allTasks[indexOfTaskKeys].id}`);
        updateHTML();
    }
}

/**
 * Deletes a task from the database by sending a DELETE request to the specified path.
 * 
 * @param {string} path - The path used to identify the specific task to delete.
 */
async function deleteTaskFromDatabase(path = "") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    });
    setTimeout(async () => {
        closeEditTaskOverlay('edit-task-overlayer');
        await getTasks('/tasks');
    }, 300);
    return responseToJson = await response.json();
}

/**
 * Changes the appearance of an add button by toggling between two versions of the button: a default (grey) version and a highlighted (blue) version.
 * 
 * @param {string} idDefault - The ID of the default grey button element that will be hidden.
 * @param {string} idBlue - The ID of the blue button element that will be displayed.
 */
function changeAddSignToBlue(idDefault, idBlue) {
    let addButtonGrey = document.getElementById(idDefault);
    let addButtonBlue = document.getElementById(idBlue);
    addButtonGrey.classList.add('d-none');
    addButtonBlue.classList.remove('d-none');
}

/**
 * Reverts the appearance of an add button to its default state by toggling between the default (grey) and highlighted (blue) versions.
 * 
 * @param {string} idDefault - The ID of the default grey button element that will be displayed.
 * @param {string} idBlue - The ID of the blue button element that will be hidden.
 */
function changeAddSingToDefault(idDefault, idBlue) {
    let addButtonGrey = document.getElementById(idDefault);
    let addButtonBlue = document.getElementById(idBlue);
    addButtonGrey.classList.remove('d-none');
    addButtonBlue.classList.add('d-none');
}

/**
 * Extracts the initials from an array of full names.
 * 
 * @param {string[]} namesArray - An array of full names, where each name is a string containing one or more words.
 * @returns {string[]} An array of initials corresponding to each name in the input array. Each initial is a string of uppercase letters.
 */
function getInitialsOfFetchedData(namesArray) {
    return namesArray.map(name => {
        let nameParts = name.split(" ");
        let initials = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
        return initials;
    });
}

/**
 * Determines the URL of the priority image based on the task's priority level.
 * 
 * @param {Object} task - An object representing a task. It should include a `priority` property.
 * @param {string} task.priority - The priority level of the task. Expected values are "Urgent", "Medium", or "Low".
 * 
 * @returns {string} The path to the image file representing the priority of the task. 
 */
function renderPriorityImage(task) {
    if (task.priority === "Urgent") {
        return 'img/urgent-prio.svg';
    }
    else if (task.priority === "Medium") {
        return 'img/medium-prio-orange.svg';
    }
    else if (task.priority === "Low") {
        return 'img/low-prio.svg';
    }
    else {
        return 'img/white.jpg';
    }
}

/**
 * Updates a resource on the server with the given data using a PUT request.
 * 
 * @param {string} path - The path to the resource to be updated, relative to the `BASE_URL`. 
 * @param {Object} [data={}] - An optional parameter for additional data to be included in the request body.
 * @param {number} i - The index of the task in the `allTasks` array that contains the data to be sent in the request.
 * 
 * @returns {Promise<Object>} A promise that resolves to the JSON response from the server after the update.
 */
async function updateData(path = "", data = {}, i) {
    data = allTasks[i];
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseToJson = await response.json();
}

/**
 * Updates the HTML content of the task management sections based on their statuses. It also calls the `renderContentIfAreaIsEmpty` function to handle empty sections, if necessary.
 * 
 */
function updateHTML() {
    let toDo = allTasks.filter(t => t['status'] == 'todo');
    let inProgress = allTasks.filter(t => t['status'] == 'progress');
    let awaitFeedback = allTasks.filter(t => t['status'] == 'feedback');
    let done = allTasks.filter(t => t['status'] == 'done');
    document.getElementById('todo').innerHTML = '';
    document.getElementById('progress').innerHTML = '';
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    renderContentIfAreaIsEmpty(toDo, inProgress, awaitFeedback, done);
    renderTasks(toDo, 'todo');
    renderTasks(inProgress, 'progress');
    renderTasks(awaitFeedback, 'feedback');
    renderTasks(done, 'done');
}

/**
 * Updates the HTML content of task sections if they are empty.
 * 
 * @param {Array} toDo - An array of tasks with the status 'todo'.
 * @param {Array} inProgress - An array of tasks with the status 'progress'.
 * @param {Array} awaitFeedback - An array of tasks with the status 'feedback'.
 * @param {Array} done - An array of tasks with the status 'done'.
 */
function renderContentIfAreaIsEmpty(toDo, inProgress, awaitFeedback, done) {
    if (toDo.length === 0) {
        let content = document.getElementById('todo');
        content.innerHTML = renderEmptyTasksInToDoHtml()
    }

    if (inProgress.length === 0) {
        let content = document.getElementById('progress');
        content.innerHTML = renderEmptyTasksInToInProgressHtml()
    }

    if (awaitFeedback.length === 0) {
        let content = document.getElementById('feedback');
        content.innerHTML = renderEmptyTasksInToAwaitFeedbackHtml();
    }

    if (done.length === 0) {
        let content = document.getElementById('done');
        content.innerHTML = renderEmptyTasksInToDoneHtml();
    }
}

function filterTasks() {
    let input = document.getElementById('filterInput').value.toLowerCase();
    let filteredTasks = allTasks.filter(task => task.title.toLowerCase().includes(input));

    updateFilteredHTML(filteredTasks);
}

function updateFilteredHTML(filteredTasks) {
    let todo = filteredTasks.filter(t => t['status'] == 'todo');
    let progress = filteredTasks.filter(t => t['status'] == 'progress');
    let feedback = filteredTasks.filter(t => t['status'] == 'feedback');
    let done = filteredTasks.filter(t => t['status'] == 'done');

    document.getElementById('todo').innerHTML = '';
    document.getElementById('progress').innerHTML = '';
    document.getElementById('feedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';

    renderContentIfAreaIsEmpty(todo, progress, feedback, done);

    renderTasks(todo, 'todo');
    renderTasks(progress, 'progress');
    renderTasks(feedback, 'feedback');
    renderTasks(done, 'done');
}

function renderTasks(tasks, status) {
    for (let i = 0; i < tasks.length; i++) {
        let content = document.getElementById(status);
        let task = tasks[i];
        let subtasks = task.subtasks.length;
        let doneSubtasks = task.doneSubtasks.length;
        let imageSrc = renderPriorityImage(task);
        let initials = getInitialsOfFetchedData(task.assignedContacts);
        let bgColor = task.category === "User Story" ? 'bg-blue' : 'bg-green';
        let currentStatusToDo = status === "todo" ? "d-none" : "d-block";
        let currentStatusDone = status === "done" ? "d-none" : "d-block";
        content.innerHTML += renderTasksHtml(task, bgColor, doneSubtasks, subtasks, i, status, imageSrc, currentStatusToDo, currentStatusDone);

        renderAssignedContactsInTaskCard(status, i, task, initials);
    }
    removeHighlight(status);
}

function renderAssignedContactsInTaskCard(status, i, task, initials) {
    for (let x = 0; x < initials.length; x++) {
        const initial = initials[x];
        let contactColors = task.assignedContactsColors[x];
        let contentForContacts = document.getElementById(`contacts-${status}-container${i}`);
        contentForContacts.innerHTML += assignedContactContainerHtml(initial, contactColors);
    }
}


async function nextStatus(taskId) {
    const taskIndex = allTasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        const task = allTasks[taskIndex];
        const currentIndex = taskStatuses.indexOf(task.status);
        if (currentIndex < taskStatuses.length - 1) {
            task.status = taskStatuses[currentIndex + 1];
            await updateTaskWithArrow(`/tasks/${task.id}`, data, task);
            updateHTML();
        }
    } else {
        console.error(`Task with id ${taskId} not found`);
    }
}

async function previousStatus(taskId) {
    const taskIndex = allTasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        const task = allTasks[taskIndex];
        const currentIndex = taskStatuses.indexOf(task.status);
        if (currentIndex > 0) {
            task.status = taskStatuses[currentIndex - 1];
            await updateTaskWithArrow(`/tasks/${task.id}`, data, task);
            updateHTML();
        }
    } else {
        console.error(`Task with id ${taskId} not found`);
    }
}

async function updateTaskWithArrow(path = "", data={}, task) {
    data = {
         id: "",
         title: task['title'],
         description: task['description'],
         deadline: task['deadline'],
         priority: task['priority'],
         subtasks: JSON.stringify(task['subtasks']),
         doneSubtasks: JSON.stringify(task['doneSubtasks']),
         assignedContacts: JSON.stringify(task['assignedContacts']),
         assignedContactsColors: JSON.stringify(task['assignedContactsColors']),
         assignedContactsId: JSON.stringify(task['assignedContactsId']),
         category: task['category'],
         status: task['status']
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

   document.addEventListener('DOMContentLoaded', function() {
    // Set default mobile width and height thresholds
    const mobileWidthPortrait = 768;  // Width threshold for mobile portrait mode
    const mobileHeightPortrait = 1024; // Height threshold for mobile portrait mode
  
    const mobileWidthLandscape = 1024; // Width threshold for mobile landscape mode
    const mobileHeightLandscape = 768; // Height threshold for mobile landscape mode
  
    // Define a maximum width to distinguish between mobile and desktop
    const maxMobileWidth = 932;  // This should be the upper limit for mobile devices
  
    // Function to check orientation and display the warning if needed
    function checkOrientation() {
      const isLandscape = window.innerWidth > window.innerHeight;
  
      // Check if the screen width is less than or equal to the maxMobileWidth
      const isMobile = window.innerWidth <= maxMobileWidth;
  
      // Conditions for showing the warning
      const isMobilePortrait = isMobile && window.innerWidth <= mobileWidthPortrait && window.innerHeight <= mobileHeightPortrait;
      const isMobileLandscape = isMobile && window.innerWidth <= mobileWidthLandscape && window.innerHeight <= mobileHeightLandscape;
  
      // Show the warning if the device is in landscape mode and fits mobile dimensions
      if (isLandscape && (isMobilePortrait || isMobileLandscape)) {
        document.getElementById('landscape-warning').classList.add('visible');
      } else {
        document.getElementById('landscape-warning').classList.remove('visible');
      }
    }
  
    // Initial check
    checkOrientation();
  
    // Check orientation on resize/orientation change
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
  });