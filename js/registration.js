const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"

const dataTemplate = {
    id: "",
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: ""
};

/**
 * Event Listener: DOMContentLoaded
 *
 * Sets up an event listener for the email input field to validate the email domain.
 * This event listener waits for the DOM content to be fully loaded, then checks if the email input field exists.
 * If it exists, it attaches an 'input' event listener to the input field. When the user types in the email field,
 * the email address is validated to ensure it ends with `.de` or `.com`. If the email address does not match the
 * required format, a custom validity message is set. If it matches, the custom validity message is cleared.
 *
 * @param {Event} event - The event object.
 */
document.addEventListener('DOMContentLoaded', (event) => {
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('input', function(event) {
        const emailValue = emailInput.value;
        const regex = /^[^\s@]+@[^\s@]+\.(de|com)$/;
        
        if (!regex.test(emailValue)) {
            emailInput.setCustomValidity('Invalid email domain. Please use .de or .com');
        } else {
            emailInput.setCustomValidity('');
        }
    });
});


/**
 * Posts user data to the specified path.
 * 
 * This function retrieves user data from form input fields, checks if the passwords match,
 * and sends a POST request to the specified path with the user data. If the passwords do not
 * match, it handles the mismatch. If the request is successful, it handles the successful signup.
 * 
 * @param {string} path - The path to send the POST request to.
 * @returns {Promise<Object|undefined>} The response data from the server if the request is successful.
 */
async function postData(path = "") {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
    let name = document.getElementById('first-name').value;
    let surname = document.getElementById('last-name').value;

    if (password !== confirmPassword) {
        handlePasswordMismatch();
        return;
    }

    let data = { ...dataTemplate, email, password, name, surname };

    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        handleSuccessfulSignUp();
        return await response.json();
    } else {
        console.error('Failed to sign up');
    }
}

/**
 * Handles the case when the password and confirm password do not match.
 * 
 * This function adds a CSS class to indicate the password mismatch and makes the
 * mismatch message visible.
 */
function handlePasswordMismatch() {
    document.getElementById('confirm-password').classList.add('password-not-the-same');
    document.getElementById('not-same-password-container').classList.remove('d-none');
}

/**
 * Handles the successful sign up process.
 * 
 * This function removes the CSS class indicating a password mismatch, hides the mismatch message,
 * shows a successful sign up banner, and redirects to the index page after a short delay.
 */
function handleSuccessfulSignUp() {
    document.getElementById('confirm-password').classList.remove('password-not-the-same');
    document.getElementById('not-same-password-container').classList.add('d-none');
    showSuccessfullSignUpBanner();
    setTimeout(() => window.location.href = 'index.html', 2000);
}

/**
 * This Functions gives feedback to the user that he signed up sucessfully
 * 
 */
function showSuccessfullSignUpBanner() {
    document.getElementById('overlayer-successful-sign-up').classList.remove('d-none');
}

  function disableScroll() {
    document.body.style.overflow = 'hidden';
}