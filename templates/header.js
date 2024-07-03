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
    document.addEventListener('click', handleClickOutside, true);
}

function closeMenu(subMenu) {
    subMenu.classList.add("d-none");
    subMenu.classList.remove("sub-menu");
    open = false;
    document.removeEventListener('click', handleClickOutside, true);
}

function handleClickOutside(event) {
    const subMenu = document.getElementById('sub-menu');
    const profileContainer = document.getElementById('profile-container');
    if (!subMenu.contains(event.target) && !profileContainer.contains(event.target)) {
        closeMenu(subMenu);
    }
}

function logOut() {
    localStorage.clear();
    window.location.href = 'index.html';
}

function isMobileOpen() {
    const subMenu = document.getElementById('mobile-sub-menu');
    if (!open) {
        showMobileMenu(subMenu);
    } else {
        closeMobileMenu(subMenu);
    }
}

function showMobileMenu(subMenu) {
    subMenu.classList.remove("d-none");
    subMenu.classList.add("visible");
    subMenu.classList.add("mobile-sub-menu");
    open = true;
    document.addEventListener('click', handleClickOutsideMobile, true);
}

function closeMobileMenu(subMenu) {
    subMenu.classList.add("d-none");
    subMenu.classList.remove("mobile-sub-menu");
    subMenu.classList.remove("visible");
    open = false;
    document.removeEventListener('click', handleClickOutsideMobile, true);
}

function handleClickOutsideMobile(event) {
    const subMenu = document.getElementById('mobile-sub-menu');
    const profileContainer = document.getElementById('mobile-profile-container');
    if (!subMenu.contains(event.target) && !profileContainer.contains(event.target)) {
        closeMobileMenu(subMenu);
    }
}