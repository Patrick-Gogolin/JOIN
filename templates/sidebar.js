/**
 * Navigates to a specified page and stores the ID of the active page in local storage.
 * 
 * This function sets an item in local storage with the key 'activePage' and the value of the provided `id`.
 * Then, it changes the current page to the specified `page` URL.
 * 
 * @param {string} page - The URL or path of the page to navigate to.
 * @param {string} id - The identifier of the page to store in local storage as 'activePage'.
 */
function goToPage(page, id) {
    localStorage.setItem('activePage', id);
    window.location.href = page;
}