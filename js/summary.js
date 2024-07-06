// Diese Funktion wird aufgerufen, um die Begrüßung und den Benutzernamen zu aktualisieren
function updateGreeting() {
    hideContentForTwoSeconds(); // Versteckt den gesamten Inhalt für 2 Sekunden
    checkScreenWidthAndShowGreeting(); // Überprüft die Bildschirmbreite und zeigt die Begrüßung an
    updateLoginGreetingText()
    initLoginUserName()
    updateGreetingText(); // Aktualisiert die Begrüßung (Guten Morgen/Tag/Abend)
    initUserName(); // Initialisiert den Benutzernamen und zeigt ihn an
}

// Funktion zum Laden des Benutzernamens aus dem localStorage
function loadUserName() {
    let userAsText = localStorage.getItem('user');
    if (userAsText) {
        let user = JSON.parse(userAsText);
        console.log("Loaded user:", user); // Debug-Ausgabe des geladenen Benutzers
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