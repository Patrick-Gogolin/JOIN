const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"
let allTasks = [];
let taskKeys = null;
let currentDraggedElement;

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

function openEditTaskOverlayer(id) {
    document.getElementById(`${id}`).classList.remove('d-none');
    document.body.style.overflow = 'hidden';
}

function closeEditTaskOverlay(id) {
    document.getElementById(`${id}`).classList.add('d-none');
    document.body.style.overflow = 'hidden';
}

function renderDetailTaskSlide(id) {
    let content = document.getElementById('edit-task-overlayer');
    let index = taskKeys.indexOf(id);
    let task = allTasks[index];
    emptyTask = JSON.parse(JSON.stringify(task));
    console.log(emptyTask);
    let imageSrc = renderPriorityImage(task);
    let initials = getInitialsOfFetchedData(task.assignedContacts);
    let bgColor = task.category === "User Story" ? 'bg-blue' : 'bg-green';
    openEditTaskOverlayer('edit-task-overlayer');
    console.log(task);
    content.innerHTML = renderDetailTaskSlideHtml(task, imageSrc, index, bgColor, id);

    forLoopContactsForDetailTaskSlide(task, initials)

    forLoopSubtasksForDetailTaskSlide(task)
}

function forLoopContactsForDetailTaskSlide(task, initials,) {
    for (let i = 0; i < task['assignedContacts'].length; i++) {
        let assignedContactsContent = document.getElementById('assigned-contacts-edit-task-container');
        let contact = task['assignedContacts'][i];
        let initial = initials[i];
        let contactColors = task.assignedContactsColors[i]
        assignedContactsContent.innerHTML += renderDetailTaskSlideContactsHtml(initial, contact, contactColors);
    }
}

function forLoopSubtasksForDetailTaskSlide(task) {
    for (let i = 0; i < task['subtasks'].length; i++) {
        let subtaskContent = document.getElementById('task-card-subtasks-container');
        let subtask = task['subtasks'][i];
        let index = task['doneSubtasks'].indexOf(subtask);
        console.log(index);
        if (index !== -1) {
            subtaskContent.innerHTML += renderDetailTaskSlideDoneSubtasksHtml(subtask, i);
        }
        else {
            subtaskContent.innerHTML += renderDetailTaskSlideNotDoneSubtasksHtml(subtask, i);
        }
    }
}

async function changeSubtaskStatusEditTask(i) {
    let subtask = document.getElementById(`subtask-of-edit-task${i}`).innerHTML;
    let checkBoxClickable = document.getElementById(`checkbox-subtask-edit-task-clickable${i}`);
    let indexOfTaskKeys = taskKeys.indexOf(emptyTask.id);
    allTasks[indexOfTaskKeys] = emptyTask;
    
    let emptyCheckBoxSrc = "img/empty-check-box.svg";
    let filledCheckBoxSrc = "img/filled-check-box.svg";
    
    if (checkBoxClickable.src.endsWith(emptyCheckBoxSrc)) {
        checkBoxClickable.src = filledCheckBoxSrc;
        emptyTask.doneSubtasks.push(subtask);
        console.log(emptyTask);
        await updateTask(`/tasks/${allTasks[indexOfTaskKeys].id}`);
        updateHTML();
    } else {
        checkBoxClickable.src = emptyCheckBoxSrc;
        let index = emptyTask.doneSubtasks.indexOf(subtask);
        if (index !== -1) {
            emptyTask.doneSubtasks.splice(index, 1);
            console.log(emptyTask);
            await updateTask(`/tasks/${allTasks[indexOfTaskKeys].id}`);
            updateHTML();
        }
    }
}

async function deleteTaskFromDatabase(path = "") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    });
    setTimeout(async function () {
        closeEditTaskOverlay('edit-task-overlayer')
        await getTasks('/tasks');
    }, 300);
    return responseToJson = await response.json();

}

function changeAddSignToBlue(idDefault, idBlue) {
    let addButtonGrey = document.getElementById(idDefault);
    let addButtonBlue = document.getElementById(idBlue);
    addButtonGrey.classList.add('d-none');
    addButtonBlue.classList.remove('d-none');
}

function changeAddSingToDefault(idDefault, idBlue) {
    let addButtonGrey = document.getElementById(idDefault);
    let addButtonBlue = document.getElementById(idBlue);
    addButtonGrey.classList.remove('d-none');
    addButtonBlue.classList.add('d-none');
}

function getInitialsOfFetchedData(namesArray) {
    return namesArray.map(name => {
        let nameParts = name.split(" ");
        let initials = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
        return initials;
    });
}

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
        return null;
    }

}

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

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(status) {
    let index = taskKeys.indexOf(currentDraggedElement);
    allTasks[index].status = status;
    let subtasks = JSON.stringify(allTasks[index].subtasks);
    let doneSubtasks = JSON.stringify(allTasks[index].doneSubtasks);
    let contacts = JSON.stringify(allTasks[index].assignedContacts);
    let colors = JSON.stringify(allTasks[index].assignedContactsColors);
    let ids = JSON.stringify(allTasks[index].assignedContactsId);
    allTasks[index].subtasks = subtasks;
    allTasks[index].assignedContacts = contacts;
    allTasks[index].assignedContactsColors = colors;
    allTasks[index].doneSubtasks = doneSubtasks;
    allTasks[index].assignedContactsId = ids;
    await updateData(`/tasks/${taskKeys[index]}`, data, index);
    allTasks.length = 0;
    await getTasks('/tasks');
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
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

function enableDrawing() {
    const sliders = document.querySelectorAll('.rendered-tasks-area-to-do, .rendered-tasks-area-in-progress, .rendered-tasks-area-await-feedback, .rendered-tasks-area-done');

    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX);
            slider.scrollLeft = scrollLeft - walk;
            console.log(walk);
        });
    });
}

let taskStatuses = ["todo", "progress", "feedback", "done"];

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