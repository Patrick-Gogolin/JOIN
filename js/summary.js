/**
 * Base URL for Firebase database.
 * @constant {string}
 */
const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/";

/**
 * Initializes the page by hiding content, checking screen width,
 * updating greetings, and initializing user names.
 */
function initializePage() {
    hideContentForTwoSeconds(); 
    checkScreenWidthAndShowGreeting(); 
    updateLoginGreetingText(); 
    initLoginUserName(); 
    updateGreetingText(); 
    initUserName(); 
    updateTaskCounts(); 
    updateNextUrgentDeadline();
}

/**
 * Loads the user from localStorage.
 * @returns {Object|null} The user object or null if not found.
 */
function loadUserName() {
    let userAsText = localStorage.getItem('user');
    if (userAsText) {
        let user = JSON.parse(userAsText);
        return user;
    } else {
        console.log("User not found in localStorage");
        return null;
    }
}

/**
 * Initializes and displays the user's name.
 */
function initUserName() {
    let userNameElement = document.getElementById('greeting-name');
    let user = loadUserName();

    if (user) {
        let name = user['name'];
        let surname = user['surname'];
        userNameElement.textContent = showUserName(name, surname);
    } else {
        userNameElement.textContent = "";
    }
}

/**
 * Initializes and displays the user's name in the login greeting.
 */
function initLoginUserName() {
    let userNameElement = document.getElementById('log-in-greeting-name');
    let user = loadUserName();

    if (user) {
        let name = user['name'];
        let surname = user['surname'];
        userNameElement.textContent = showUserName(name, surname);
    } else {
        userNameElement.textContent = "";
    }
}

/**
 * Updates the greeting text based on the current time.
 */
function updateGreetingText() {
    const greetingElement = document.getElementById('greeting-text');
    const now = new Date();
    const hours = now.getHours();
    let greeting = 'Good morning';

    if (hours >= 12 && hours < 18) {
        greeting = 'Good afternoon';
    } else if (hours >= 18) {
        greeting = 'Good evening';
    }

    const user = loadUserName();

    if (user && user.name.toLowerCase() !== 'guest') {
        greeting += ',';
    }

    greetingElement.textContent = greeting;
}

/**
 * Updates the login greeting text based on the current time.
 */
function updateLoginGreetingText() {
    const greetingElement = document.getElementById('log-in-greeting-text');
    const now = new Date();
    const hours = now.getHours();
    let greeting = 'Good morning';

    if (hours >= 12 && hours < 18) {
        greeting = 'Good afternoon';
    } else if (hours >= 18) {
        greeting = 'Good evening';
    }

    const user = loadUserName();

    if (user && user.name.toLowerCase() !== 'guest') {
        greeting += ',';
    }

    greetingElement.textContent = greeting;
}

/**
 * Checks the screen width and shows the greeting if required.
 */
function checkScreenWidthAndShowGreeting() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 920) {
        setTimeout(showGreetingForTwoSeconds, 1000);
        setTimeout(showContent, 1000);
    } else {
        showContent();
    }
}

/**
 * Hides the content for 2 seconds.
 */
function hideContentForTwoSeconds() {
    const contentElement = document.getElementById('content');
    contentElement.classList.add('d-none');
    document.getElementById('mobile-header').classList.add('d-none');
    document.getElementById('mobile-sidebar').classList.add('d-none');

    setTimeout(function() {
        contentElement.classList.remove('d-none');
        document.getElementById('mobile-header').classList.remove('d-none');
        document.getElementById('mobile-sidebar').classList.remove('d-none');
    }, 1000);
}

/**
 * Shows the greeting for 2 seconds.
 */
function showGreetingForTwoSeconds() {
    const greetingContainer = document.getElementById('log-in-greeting');

    setTimeout(function() {
        greetingContainer.style.display = 'none';
        showContent();
    }, 0);
}

/**
 * Shows the content by setting its opacity to 1.
 */
function showContent() {
    const contentElement = document.getElementById('content');
    const headerElement = document.getElementById('mobile-header');
    const sidebarElement = document.getElementById('mobile-sidebar');

    contentElement.style.opacity = '1';
    headerElement.style.opacity = '1';
    sidebarElement.style.opacity = '1';
}

/**
 * Displays the user's full name.
 * @param {string} name - The first name of the user.
 * @param {string} surname - The surname of the user.
 * @returns {string} The full name of the user.
 */
function showUserName(name, surname) {
    return `${name} ${surname}`;
}

/**
 * Fetches data from the Firebase database.
 * @async
 * @returns {Promise<Object|null>} The fetched data or null if an error occurred.
 */
async function fetchData() {
    try {
        const response = await fetch(`${BASE_URL}/tasks.json`);
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

/**
 * Counts the tasks by their status.
 * @param {Object} data - The task data.
 * @param {string} status - The status to count.
 * @returns {number} The number of tasks with the specified status.
 */
function countTasksByStatus(data, status) {
    let count = 0;
    for (const key in data) {
        if (data[key].status === status) {
            count++;
        }
    }
    return count;
}

/**
 * Counts the tasks by their priority.
 * @param {Object} data - The task data.
 * @param {string} priority - The priority to count.
 * @returns {number} The number of tasks with the specified priority.
 */
function countTasksByPriority(data, priority) {
    let count = 0;
    for (const key in data) {
        if (data[key].priority === priority) {
            count++;
        }
    }
    return count;
}

/**
 * Updates the text content of an HTML element by its ID.
 * @param {string} elementId - The ID of the element to update.
 * @param {string|number} text - The text to set as the content.
 */
function updateElementTextById(elementId, text) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = text.toString();
    } else {
        console.error(`Element with id "${elementId}" not found.`);
    }
}

/**
 * Gets the counts of tasks by their statuses.
 * @param {Object} data - The task data.
 * @returns {Object} An object containing the counts of tasks by status and priority.
 */
function getCounts(data) {
    const statuses = ['todo', 'done', 'progress', 'feedback'];
    const counts = {};

    statuses.forEach(status => {
        counts[status] = countTasksByStatus(data, status);
    });

    counts.urgency = countTasksByPriority(data, 'Urgent');
    counts.total = Object.keys(data).length;

    return counts;
}

/**
 * Updates the HTML elements with the task counts.
 * @param {Object} counts - The counts of tasks.
 */
function updateElements(counts) {
    const elementsToUpdate = {
        'todoCount': counts.todo,
        'doneCount': counts.done,
        'urgencyCount': counts.urgency,
        'task-in-board': counts.total,
        'task-in-progress': counts.progress,
        'awaiting-feedback': counts.feedback
    };

    Object.keys(elementsToUpdate).forEach(id => {
        updateElementTextById(id, elementsToUpdate[id]);
    });
}

/**
 * Updates the task counts by fetching the data and updating the elements.
 * @async
 */
async function updateTaskCounts() {
    try {
        const data = await fetchData();
        if (!data) return;

        const counts = getCounts(data);
        updateElements(counts);
    } catch (error) {
        console.error('Error updating task counts:', error);
    }
}

/**
 * Finds the next urgent task deadline.
 * @param {Object} data - The task data.
 * @returns {Object|null} The task with the next urgent deadline or null if not found.
 */
function findNextUrgentDeadline(data) {
    let nextDeadline = null;

    for (const key in data) {
        const task = data[key];
        if (task.priority === 'Urgent') {
            if (!nextDeadline || new Date(task.deadline) < new Date(nextDeadline.deadline)) {
                nextDeadline = task;
            }
        }
    }

    return nextDeadline;
}

/**
 * Displays the next urgent deadline in the HTML.
 * @param {Object|null} nextDeadline - The task with the next urgent deadline or null if not found.
 */
function displayNextUrgentDeadline(nextDeadline) {
    const dateElement = document.getElementById('date');

    if (dateElement) {
        if (nextDeadline) {
            const formattedDate = new Date(nextDeadline.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            dateElement.textContent = formattedDate;
        } else {
            dateElement.textContent = "Keine nächste Deadline gefunden.";
        }
    } else {
        console.error('Element with id "date" not found.');
    }
}

/**
 * Updates the next urgent deadline by fetching the data and displaying the next deadline.
 * @async
 */
async function updateNextUrgentDeadline() {
    try {
        const data = await fetchData();
        if (!data) return;

        const nextDeadline = findNextUrgentDeadline(data);
        displayNextUrgentDeadline(nextDeadline);

    } catch (error) {
        console.error('Error updating next urgent deadline:', error);
    }
}
