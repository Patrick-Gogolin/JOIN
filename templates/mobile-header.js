let open = false;

function isOpen() {
    const subMenu = document.getElementById('sub-menu');
    if (!open) {
        showMenu(subMenu);
    } else {
        closeMenu(subMenu);
    }
}

function showMenu(subMenu) {
    subMenu.classList.remove("d-none");
    open = true;
}

function closeMenu(subMenu) {
    subMenu.classList.add("d-none");
    open = false;
}