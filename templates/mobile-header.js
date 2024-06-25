document.addEventListener("DOMContentLoaded", function() {
    const profileContainer = document.querySelector(".profile-container");
    const subMenu = document.getElementById("sub-menu");

    profileContainer.addEventListener("click", function() {
        subMenu.classList.toggle("visible");
    });

    // Add click event listeners to all buttons in the sub-menu
    const buttons = subMenu.querySelectorAll(".button");
    buttons.forEach(button => {
        button.addEventListener("click", function(event) {
            const link = button.dataset.link;
            if (link) {
                window.location.href = link;
            }
        });
    });
});