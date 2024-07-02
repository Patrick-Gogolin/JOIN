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
    const profileContainer = document.getElementById('profile-container'); // Adjust the ID if necessary
    if (!subMenu.contains(event.target) && !profileContainer.contains(event.target)) {
        closeMenu(subMenu);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        const subMenu = document.getElementById('sub-menu');
        if (!subMenu.contains(event.target) && !event.target.matches('.profile-container, .profile-container *')) {
            closeMenu(subMenu);
        }
    });
});

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
    open = true;
    document.addEventListener('click', handleClickOutside, true);
}

function closeMobileMenu(subMenu) {
    subMenu.classList.add("d-none");
    subMenu.classList.remove("visible");
    open = false;
    document.removeEventListener('click', handleClickOutside, true);
}

function handleClickOutside(event) {
    const subMenu = document.getElementById('mobile-sub-menu');
    const profileContainer = document.getElementById('mobile-profile-container');
    if (!subMenu.contains(event.target) && !profileContainer.contains(event.target)) {
        closeMobileMenu(subMenu);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (event) => {
        const subMenu = document.getElementById('mobile-sub-menu');
        if (!subMenu.contains(event.target) && !event.target.matches('.mobile-profile-container, .mobile-profile-container *')) {
            closeMobileMenu(subMenu);
        }
    });
});

// function adjustMobileHeaderVisibility() {
//     var mobileHeader = document.getElementById('mobile-header');

//     // Überprüfen, ob das Element existiert, bevor darauf zugegriffen wird
//     if (mobileHeader) {
//         var screenWidth = window.innerWidth;

//         if (screenWidth <= 920) {
//             mobileHeader.classList.remove('d-none');
//         } else {
//             mobileHeader.classList.add('d-none');
//         }
//     }
// }

// // Aufruf in DOMContentLoaded-Event einbetten, wenn notwendig
// document.addEventListener('DOMContentLoaded', function() {
//     adjustMobileHeaderVisibility();
//     window.addEventListener('resize', adjustMobileHeaderVisibility);
// });