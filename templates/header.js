let open = false;

/**
 * Toggles the visibility of the submenu based on the current state.
 * 
 * This function checks the `open` flag to determine whether the submenu should be
 * shown or hidden. If `open` is `false`, the function will call `showMenu()` to display
 * the submenu. If `open` is `true`, the function will call `closeMenu()` to hide the submenu.
 * 
 * The function targets the DOM element with the ID 'sub-menu' and uses it as the submenu
 * to be toggled.

 * @name isOpen
 */
function isOpen() {
    const subMenu = document.getElementById('sub-menu');
    if (!open) {
        showMenu(subMenu);
    } else {
        closeMenu(subMenu);
    }
}

/**
 * Displays the specified submenu by updating its CSS classes and setting the `open` flag.
 * 
 * This function makes the submenu visible by removing the 'd-none' class and adding
 * the 'sub-menu' class to the provided submenu element. It also sets the `open` flag to `true`
 * to indicate that the menu is currently open. Additionally, it attaches an event listener to
 * the document to handle clicks outside the submenu.
 * 
 * @param {HTMLElement} subMenu - The DOM element representing the submenu to be displayed.
 */
function showMenu(subMenu) {
    subMenu.classList.remove("d-none");
    subMenu.classList.add("sub-menu");
    open = true;
    document.addEventListener('click', handleClickOutside, true);
}

/**
 * Hides the specified submenu by updating its CSS classes and resetting the `open` flag.
 * 
 * This function hides the submenu by adding the 'd-none' class and removing the 'sub-menu'
 * class from the provided submenu element. It also sets the `open` flag to `false` to indicate
 * that the menu is currently closed. Additionally, it removes the event listener for clicks
 * outside the submenu.
 * 
 * @param {HTMLElement} subMenu - The DOM element representing the submenu to be hidden.
 */
function closeMenu(subMenu) {
    subMenu.classList.add("d-none");
    subMenu.classList.remove("sub-menu");
    open = false;
    document.removeEventListener('click', handleClickOutside, true);
}

/**
 * Handles clicks outside of the submenu and profile container to close the submenu.
 * 
 * This function is used as an event handler to detect clicks outside the submenu and
 * the profile container. If a click occurs outside both elements, it calls the `closeMenu`
 * function to hide the submenu.
 * 
 * @param {Event} event - The click event object, which contains information about the click event and the target element that was clicked.
 * 
 */
function handleClickOutside(event) {
    const subMenu = document.getElementById('sub-menu');
    const profileContainer = document.getElementById('profile-container');
    if (!subMenu.contains(event.target) && !profileContainer.contains(event.target)) {
        closeMenu(subMenu);
    }
}

/**
 * Clears local storage and redirects the user to the home page.
 * 
 * This function is used to log out the user by clearing all data stored in the local
 * storage and then redirecting the user to the home page (`index.html`).
 */
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

/**
 * Toggles the visibility of the mobile submenu based on its current state.
 * 
 * This function checks the current state of the `open` flag and either shows or hides
 * the mobile submenu. It calls `showMobileMenu` to display the submenu if it is currently
 * closed, or `closeMobileMenu` to hide it if it is currently open.
 */
function showMobileMenu(subMenu) {
    subMenu.classList.remove("d-none");
    subMenu.classList.add("visible");
    subMenu.classList.add("mobile-sub-menu");
    open = true;
    document.addEventListener('click', handleClickOutsideMobile, true);
}

/**
 * Closes the mobile submenu and hides it from view.
 * 
 * This function hides the mobile submenu by adding the `d-none` class and removing
 * the `mobile-sub-menu` and `visible` classes from the `subMenu` element. It also
 * sets the `open` flag to `false` to indicate that the menu is closed, and removes
 * the event listener for detecting clicks outside the mobile menu by calling
 * `handleClickOutsideMobile`.
 *
 * @param {HTMLElement} subMenu - The HTML element representing the mobile submenu to be closed.
 */
function closeMobileMenu(subMenu) {
    subMenu.classList.add("d-none");
    subMenu.classList.remove("mobile-sub-menu");
    subMenu.classList.remove("visible");
    open = false;
    document.removeEventListener('click', handleClickOutsideMobile, true);
}

/**
 * Handles click events outside the mobile submenu and profile container.
 * 
 * This function checks if a click event occurred outside the mobile submenu or
 * the mobile profile container. If the click happened outside of these elements,
 * it closes the mobile submenu by calling the `closeMobileMenu` function.
 * 
 * @param {MouseEvent} event - The click event object containing details of the click.
 */
function handleClickOutsideMobile(event) {
    const subMenu = document.getElementById('mobile-sub-menu');
    const profileContainer = document.getElementById('mobile-profile-container');
    if (!subMenu.contains(event.target) && !profileContainer.contains(event.target)) {
        closeMobileMenu(subMenu);
    }
}