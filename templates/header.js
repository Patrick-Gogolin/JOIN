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
    subMenu.classList.add("sub-menu");
    open = true;
}

function closeMenu(subMenu) {
    subMenu.classList.add("d-none");
    subMenu.classList.remove("sub-menu");
    open = false;
}