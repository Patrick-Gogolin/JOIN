const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/";

function initializePage() {
    hideContentForTwoSeconds(); // Versteckt den gesamten Inhalt für 2 Sekunden
    checkScreenWidthAndShowGreeting(); // Überprüft die Bildschirmbreite und zeigt die Begrüßung an
    updateLoginGreetingText(); // Aktualisiert den Grußtext für die Login-Anzeige
    initLoginUserName(); // Initialisiert und zeigt den Benutzernamen für die Login-Anzeige an
    updateGreetingText(); // Aktualisiert die Begrüßung (Guten Morgen/Tag/Abend)
    initUserName(); // Initialisiert den Benutzernamen und zeigt ihn an
    updateDate(); // Aktualisiert das Datum
    updateTaskCounts(); // Aktualisiert die Task-Zähler
}

// Funktion zum Laden des Benutzernamens aus dem localStorage
function loadUserName() {
    let userAsText = localStorage.getItem('user');
    if (userAsText) {
        let user = JSON.parse(userAsText);
        return user; // Rückgabe des Benutzers
    } else {
        console.log("User not found in localStorage");
        return null; // Rückgabe null, wenn kein Benutzer gefunden wird
    }
}

// Funktion zum Initialisieren und Anzeigen des Benutzernamens
function initUserName() {
    let userNameElement = document.getElementById('greeting-name');
    let user = loadUserName(); // Benutzer aus localStorage laden

    if (user) {
        let name = user['name'];
        let surname = user['surname'];
        userNameElement.textContent = showUserName(name, surname); // Benutzernamen anzeigen
    } else {
        userNameElement.textContent = ""; // Benutzernamen leeren, falls kein Benutzer gefunden wurde
    }
}

function initLoginUserName() {
    let userNameElement = document.getElementById('log-in-greeting-name');
    let user = loadUserName(); // Benutzer aus localStorage laden

    if (user) {
        let name = user['name'];
        let surname = user['surname'];
        userNameElement.textContent = showUserName(name, surname); // Benutzernamen anzeigen
    } else {
        userNameElement.textContent = ""; // Benutzernamen leeren, falls kein Benutzer gefunden wurde
    }
}

// Funktion zum Anzeigen der Begrüßung (Guten Morgen/Tag/Abend)
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

// Diese Funktion überprüft die Bildschirmbreite und zeigt die Begrüßung an, falls erforderlich
function checkScreenWidthAndShowGreeting() {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 920) {
        setTimeout(showGreetingForTwoSeconds, 1000); // Zeigt die Begrüßung nach 2 Sekunden an
        setTimeout(showContent, 1000); // Zeigt den gesamten Inhalt nach 2 Sekunden an
    } else {
        showContent(); // Zeigt den gesamten Inhalt sofort an
    }
}

// Funktion zum Verstecken des Inhalts für 2 Sekunden
function hideContentForTwoSeconds() {
    const contentElement = document.getElementById('content');
    contentElement.classList.add('d-none'); // Fügt die Klasse 'd-none' hinzu, um den Inhalt zu verstecken
    document.getElementById('mobile-header').classList.add('d-none'); // Versteckt das mobile Header
    document.getElementById('mobile-sidebar').classList.add('d-none'); // Versteckt die mobile Sidebar

    setTimeout(function() {
        contentElement.classList.remove('d-none'); // Entfernt 'd-none' nach 2 Sekunden, um den Inhalt wieder anzuzeigen
        document.getElementById('mobile-header').classList.remove('d-none'); // Zeigt das mobile Header wieder an
        document.getElementById('mobile-sidebar').classList.remove('d-none'); // Zeigt die mobile Sidebar wieder an
    }, 1000); // 2000 Millisekunden = 2 Sekunden
}

// Funktion zum Anzeigen der Begrüßung für 2 Sekunden
function showGreetingForTwoSeconds() {
    const greetingContainer = document.getElementById('log-in-greeting');

    setTimeout(function() {
        greetingContainer.style.display = 'none'; // Versteckt die Begrüßung nach 2 Sekunden
        showContent(); // Zeigt den gesamten Inhalt wieder an
    }, 0); // 2000 Millisekunden = 2 Sekunden
}

function showContent() {
    const contentElement = document.getElementById('content');
    const headerElement = document.getElementById('mobile-header');
    const sidebarElement = document.getElementById('mobile-sidebar');

    contentElement.style.opacity = '1'; // Erhöht die Opazität auf 1 für den Inhalt
    headerElement.style.opacity = '1'; // Erhöht die Opazität auf 1 für das Header-Element
    sidebarElement.style.opacity = '1'; // Erhöht die Opazität auf 1 für die Sidebar
}

// Funktion zum Anzeigen des Benutzernamens
function showUserName(name, surname) {
    return `${name} ${surname}`; // Gibt den vollständigen Namen zurück
}

// Funktion, um Daten von Firebase abzurufen
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

// Hilfsfunktion, um die Anzahl der Tasks nach Status zu zählen
function countTasksByStatus(data, status) {
    let count = 0;
    for (const key in data) {
        if (data[key].status === status) {
            count++;
        }
    }
    return count;
}

// Hilfsfunktion, um die Anzahl der Tasks nach Priorität zu zählen
function countTasksByPriority(data, priority) {
    let count = 0;
    for (const key in data) {
        if (data[key].priority === priority) {
            count++;
        }
    }
    return count;
}

// Funktion, um die Anzahl der Tasks zu aktualisieren und im HTML anzuzeigen
async function updateTaskCounts() {
    try {
        const data = await fetchData();
        if (!data) return;

        // Zähle die Anzahl der Tasks nach Status
        const todoCount = countTasksByStatus(data, 'todo');
        const doneCount = countTasksByStatus(data, 'done');
        const progressCount = countTasksByStatus(data, 'progress');
        const feedbackCount = countTasksByStatus(data, 'feedback');

        // Zähle die Anzahl der Tasks nach Priorität
        const urgencyCount = countTasksByPriority(data, 'Urgent');

        // Gesamtanzahl der Tasks
        const totalCount = Object.keys(data).length;

        // Anzeige der Anzahl im HTML
        document.getElementById('todoCount').textContent = todoCount.toString();
        document.getElementById('doneCount').textContent = doneCount.toString();
        document.getElementById('urgencyCount').textContent = urgencyCount.toString();
        document.getElementById('task-in-board').textContent = totalCount.toString();
        document.getElementById('task-in-progress').textContent = progressCount.toString();
        document.getElementById('awaiting-feedback').textContent = feedbackCount.toString();

    } catch (error) {
        console.error('Error updating task counts:', error);
    }
}

// Funktion, um das aktuelle Datum im gewünschten Format zu formatieren
function getCurrentDateFormatted() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-US', options);
    return currentDate;
}

// Funktion, um das Datum im HTML zu aktualisieren
function updateDate() {
    const dateElement = document.getElementById('date');
    if (dateElement) {
        dateElement.textContent = getCurrentDateFormatted();
    } else {
        console.error('Element with id "date" not found.');
    }
}