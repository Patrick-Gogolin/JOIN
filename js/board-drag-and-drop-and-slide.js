let currentDraggedElement;

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
        });
    });
}