document.addEventListener("DOMContentLoaded", function() {
    const profileContainer = document.querySelector(".profile-container");
    const subMenu = document.getElementById("sub-menu");

    profileContainer.addEventListener("click", function() {
        if (subMenu.style.display === "none" || subMenu.style.display === "") {
            subMenu.style.display = "flex"; // Show the menu
        } else {
            subMenu.style.display = "none"; // Hide the menu
        }
    });

    // Add click event listeners to all buttons in the sub-menu
    const buttons = subMenu.querySelectorAll(".button");
    buttons.forEach(button => {
        button.addEventListener("click", function(event) {
            const link = button.querySelector("a");
            if (link) {
                window.location.href = link.href;
            }
        });
    });
});