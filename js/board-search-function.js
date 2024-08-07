/**
 * Filters the list of tasks based on the user's input in the filter input field.
 * 
 */
function filterTasks() {
    let input = document.getElementById('filterInput').value.toLowerCase();
    let filteredTasks = allTasks.filter(task => 
        task.title.toLowerCase().includes(input) || task.description.toLowerCase().includes(input)
    );

    updateFilteredHTML(filteredTasks);
}

/**
 * Updates the HTML content to display the filtered tasks.
 *
 * This function takes an array of filtered tasks and updates the HTML content of various status
 * sections (todo, progress, feedback, done) to display the tasks that match the filter criteria.
 * It clears the current content in these sections and then calls helper functions to render
 * the tasks and handle empty sections.
 *
 * @param {Array} filteredTasks - An array of tasks that match the filter criteria.
 */
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
