/**
 * Updates a task in the database with the provided data.
 *
 * @param {string} path - The path appended to the BASE_URL for the API endpoint.
 * @param {Object} data - An optional data object, which is overridden by the task details.
 * @param {Object} task -  The task object containing details of the task to be updated.
 * @returns {Promise<Object>} The JSON response from the server.
 */
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

/**
 * Advances the status of a task to the next stage in the workflow.
 *
 * @param {string} taskId - The ID of the task to be updated.
 * @returns {Promise<void>} A promise that resolves when the task status is updated and the HTML is refreshed.
 */
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

/**
 * Reverts the status of a task to the previous stage in the workflow.
 *
 * @param {string} taskId - The ID of the task to be updated.
 * @returns {Promise<void>} A promise that resolves when the task status is updated and the HTML is refreshed.
 */
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