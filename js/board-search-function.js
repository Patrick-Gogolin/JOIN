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
