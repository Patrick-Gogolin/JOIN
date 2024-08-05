/**
 * Includes HTML content into elements with the `w3-include-html` attribute.
 * 
 * This asynchronous function searches for all elements with the attribute `w3-include-html`,
 * fetches the HTML content from the file specified in the attribute, and inserts that content
 * into the element. If the fetch request fails, it sets the element's inner HTML to 'Page not found'.
 * 
 * After all HTML content has been included, it calls the `init` function.
 * 
 * @returns {Promise<void>} A promise that resolves when the function has completed.
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        let file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    init();
}
}

/**
 * Checks if a user is stored in localStorage and redirects to the login page if not.
 * 
 * This function retrieves the item associated with the key 'user' from localStorage. 
 * If the item does not exist (i.e., the user is not logged in), the function redirects 
 * the browser to 'index.html' (typically the login page).
 */
function checkUserAndRedirect() {
    let userKey = 'user';
    let user = localStorage.getItem(userKey);
    
    if (!user) {
        window.location.href = 'index.html';
    }
}

/**
 * Loads and parses the user data from localStorage.
 * 
 * This function retrieves the user data stored in localStorage under the key 'user'. 
 * If the user data is found, it is parsed from JSON format and returned as an object. 
 * If no user data is found, a message is logged to the console and the function returns `null`.
 * 
 * @returns {Object|null} The user object if found and successfully parsed, otherwise `null`.
 */
function load() {
    let userAsText = localStorage.getItem('user');
    if (userAsText) {
        let user = JSON.parse(userAsText);
        return user;
    } else {
        console.log("user not found");
        return null;
    }
}

/**
 * Initializes user initials and displays them in specified elements.
 * 
 * This function retrieves the user data from localStorage using the `load` function.
 * It extracts the initials from the user's name and surname, and then updates
 * the innerHTML of the elements with IDs 'user-initials' and 'mobile-user-initials'
 * to display these initials. If no user data is available, it defaults to the initials "G".
 * 
 * The function assumes that the user's name and surname are stored in the `user` object
 * with keys 'name' and 'surname' respectively, and that the `showUserInitials` function
 * is used to format the initials.
 */
function init() {
    let userInitials = document.getElementById('user-initials');
    let mobileUserInitials = document.getElementById('mobile-user-initials');
    let user = load();
    let initials = "G";
    
    if (user) {
        let firstLetterOfName = user['name'][0];
        let firstLetterOfSurname = user['surname'][0];
        initials = showUserInitials(firstLetterOfName, firstLetterOfSurname);
    }
    
    if (userInitials) {
        userInitials.innerHTML = initials;
    }
    if (mobileUserInitials) {
        mobileUserInitials.innerHTML = initials;
    }
}

/**
 * Generates a string with the initials of a user.
 * 
 * This function takes the first letters of the user's name and surname, and formats
 * them into a string with a space between the initials.
 * 
 * @param {string} firstLetterOfName - The first letter of the user's first name.
 * @param {string} firstLetterOfSurname - The first letter of the user's surname.
 * @returns {string} A string representing the user's initials, formatted as "N S", where "N" is the first letter of the first name and "S" is the  first letter of the surname.
 */
function showUserInitials(firstLetterOfName, firstLetterOfSurname) {
    return `${firstLetterOfName} ${firstLetterOfSurname}`;
}

/**
 * Event listener for the 'DOMContentLoaded' event.
 * 
 * This function is executed when the DOM content has been fully loaded and parsed,
 * but before all external resources (like images) have finished loading. It initializes
 * the process of including external HTML content into the current document by calling 
 * the `includeHTML` function.
 * 
 * @event document#DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function() {
    includeHTML();
})