let currentDraggedElement;

/**
 * Initiates the dragging of a task element.
 *
 * This function sets the `currentDraggedElement` to the specified task ID,
 * indicating that the task with the given ID is being dragged.
 *
 * @param {string} id - The ID of the task element that is being dragged.
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * Allows an element to be dropped.
 *
 * This function prevents the default behavior to allow a drop operation
 * to occur when dragging and dropping elements.
 *
 * @param {DragEvent} ev - The drag event object.
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * Updates the status of a task and re-fetches all tasks from the server.
 *
 * This function updates the status of the task identified by the
 * `currentDraggedElement` to the provided status. It then serializes
 * various properties of the task (subtasks, done subtasks, assigned
 * contacts, assigned contact colors, and contact IDs) and sends an
 * update request to the server. After the update, it clears the local
 * task list and re-fetches the updated list of tasks from the server.
 *
 * @param {string} status - The new status to set for the task. It should be one of the predefined task statuses.
 *
 * @returns {Promise<void>} A promise that resolves when the task status has been updated and the tasks have been re-fetched.
 */
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

/**
 * Highlights the HTML element with the specified ID by adding a CSS class.
 *
 * This function adds the `drag-area-highlight` class to the HTML element
 * identified by the provided ID. This is typically used to visually indicate
 * that the element is a valid drop target during drag-and-drop operations.
 *
 * @param {string} id - The ID of the HTML element to highlight. The element
 *                      with this ID will have the `drag-area-highlight` class
 *                      added to it.
 *
 * @returns {void} This function does not return any value.
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

/**
 * Removes the highlight from the HTML element with the specified ID by removing a CSS class.
 *
 * This function removes the `drag-area-highlight` class from the HTML element
 * identified by the provided ID. This is typically used to remove visual indications
 * that an element was a valid drop target during drag-and-drop operations.
 *
 * @param {string} id - The ID of the HTML element from which to remove the highlight.
 *                      The element with this ID will have the `drag-area-highlight` class
 *                      removed from it.
 *
 * @returns {void} This function does not return any value.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

/**
 * Enables horizontal scrolling of task containers using a drag-to-scroll mechanism.
 *
 * This function attaches event listeners to task containers with specific classes to
 * enable horizontal scrolling when the user clicks and drags. It adds `mousedown`, `mouseleave`,
 * `mouseup`, and `mousemove` event listeners to the containers, allowing users to scroll horizontally
 * by dragging their mouse.
 *
 * The following task containers are affected:
 * - `.rendered-tasks-area-to-do`
 * - `.rendered-tasks-area-in-progress`
 * - `.rendered-tasks-area-await-feedback`
 * - `.rendered-tasks-area-done`
 *
 * When the mouse button is pressed down (`mousedown`), the function records the initial position
 * and scroll position of the container. As the mouse moves (`mousemove`), it calculates the distance
 * moved and updates the scroll position of the container. When the mouse is released (`mouseup`) or leaves
 * the container (`mouseleave`), it stops the dragging action.
 *
 * @returns {void} This function does not return any value.
 */
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