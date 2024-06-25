document.addEventListener("DOMContentLoaded", function() {
    // Select all sidebar menu div elements with IDs
    const summary = document.getElementById("summary");
    const addTask = document.getElementById("add-task");
    const board = document.getElementById("board");
    const contacts = document.getElementById("contacts");

    // Add click event listeners to each menu item
    summary.addEventListener("click", function() {
        window.location.href = "../summary.html";
    });

    addTask.addEventListener("click", function() {
        window.location.href = "./add-task.html";
    });

    board.addEventListener("click", function() {
        window.location.href = "../board.html";
    });

    contacts.addEventListener("click", function() {
        window.location.href = "../contacts.html";
    });
});