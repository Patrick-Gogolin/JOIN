// Funktion zur Navigation und Speichern der aktiven Seite
function goToPage(page, id) {
    // Speichere die aktive Element-ID in localStorage
    localStorage.setItem('activePage', id);
    // Navigiere zur angegebenen Seite
    window.location.href = page;
}