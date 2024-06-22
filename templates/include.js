async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        let file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    init();
}
}

function load() {
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

function init() {
    let userInitials = document.getElementById('user-initials');
    let user = load(); // Benutzer aus der Load-Funktion abrufen
    if (user) {
        let firstLetterOfName = user['name'][0];
        let firstLetterOfSurname = user['surname'][0];
        userInitials.innerHTML = showUserInitials(firstLetterOfName, firstLetterOfSurname); // Initialen anzeigen
    }
    else{
        userInitials.innerHTML = "G";
    }
}

function showUserInitials(firstLetterOfName, firstLetterOfSurname) {
    return `${firstLetterOfName} ${firstLetterOfSurname}`; // Initialen zurückgeben
}

document.addEventListener('DOMContentLoaded', function() {
    includeHTML(); // HTML-Inhalte inkludieren
})
