let currentDraggedElement;
let todos = [{
    'id' : 0,
    'title': 'Implement Login Feature',
    'content': 'Create login page and integrate authentication.',
    'status': 'todo'
}, {
    'id' : 1,
    'title': 'Fix Bugs in Payment Module',
    'content': 'Resolve issues with payment processing and improve error handling.',
    'status': 'progress'
}, {
    'id' : 2,
    'title': 'Code Review for Registration Module',
    'content': 'Review the code for the registration module and provide feedback.',
    'status': 'feedback'
}, {
    'id' : 3,
    'title': 'Complete Unit Tests for User Profile',
    'content': 'Write and run unit tests for the user profile functionality.',
    'status': 'done'
}, {
    'id' : 4,
    'title': 'Optimize Query Performance',
    'content': 'Analyze and optimize slow database queries.',
    'status': 'done'
}, {
    'id' : 5,
    'title': 'Integrate Third-Party APIs',
    'content': 'Integrate third-party APIs for weather and news updates.',
    'status': 'progress'
},];

function updateHTML() {
    updateCategory('todo', 'To Do');
    updateCategory('progress', 'in Progress');
    updateCategory('feedback', 'Awaiting Feedback');
    updateCategory('done', 'Done');
}

function updateCategory(category, displayText) {
    let tasks = todos.filter(t => t['status'] === category);

    let container = document.getElementById(category);
    container.innerHTML = '';

    if (tasks.length === 0) {
        container.innerHTML = `<div class="create-task-container">No tasks ${displayText}</div>`;
    } else {
        for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            container.innerHTML += generateTodoHTML(element);
        }
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element) {
    return `
        <div draggable="true" ondragstart="startDragging(${element['id']})" class="new-task-container">
            <div class="user-story-container">
                <span>User Story</span>
            </div>
            <div class="title-content-container">
                <h2>${element['title']}</h2>
                <span>${element['content']}</span>
            </div>
        </div>
    `;
}

function updateHTML() {
    updateCategory('todo', 'To Do');
    updateCategory('progress', 'in Progress');
    updateCategory('feedback', 'Awaiting Feedback');
    updateCategory('done', 'Done');
}

function updateCategory(category, displayText) {
    let tasks = todos.filter(t => t['status'] === category);

    let container = document.getElementById(category);
    container.innerHTML = '';

    if (tasks.length === 0) {
        container.innerHTML = `<div class="create-task-container">No tasks ${displayText}</div>`;
    } else {
        for (let index = 0; index < tasks.length; index++) {
            const element = tasks[index];
            container.innerHTML += generateTodoHTML(element);
        }
    }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element) {
    return `
        <div draggable="true" ondragstart="startDragging(${element['id']})" class="new-task-container">
            <div class="user-story-container">
                <span>User Story</span>
            </div>
            <div class="title-content-container">
                <h2>${element['title']}</h2>
                <span>${element['content']}</span>
            </div>
        </div>
    `;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    todos[currentDraggedElement]['status'] = category;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}