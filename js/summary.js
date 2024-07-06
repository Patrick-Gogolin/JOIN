function updateGreeting() {
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
    initUserName();
}

function loadUserName() {
    let userAsText = localStorage.getItem('user');
    if (userAsText) {
        let user = JSON.parse(userAsText);
        console.log(user);
        return user; // User zurückgeben
    } else {
        console.log("user not found");
        return null; // Null zurückgeben, wenn kein Benutzer gefunden wird
    }
}

function initUserName() {
    let userNameElement = document.getElementById('greeting-name');
    let user = loadUserName(); // Benutzer aus der Load-Funktion abrufen
    if (user) {
        let name = user['name'];
        let surname = user['surname'];
        userNameElement.innerHTML = showUserName(name, surname); // Namen anzeigen
    } else {
        userNameElement.innerHTML = "";
    }
}

function showUserName(name, surname) {
    return `${name} ${surname}`; // Namen zurückgeben
}