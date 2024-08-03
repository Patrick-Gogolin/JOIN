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

/**
 * This Function checks for screenmode and gives warning if user is turning phone to landscape mode
 * 
 */
document.addEventListener('DOMContentLoaded', function() {
    const mobileWidthPortrait = 768;
    const mobileHeightPortrait = 1024;
    const mobileWidthLandscape = 1024;
    const mobileHeightLandscape = 768; 
    const maxMobileWidth = 932;
  
    function checkOrientation() {
      const isLandscape = window.innerWidth > window.innerHeight;
      const isMobile = window.innerWidth <= maxMobileWidth;
      const isMobilePortrait = isMobile && window.innerWidth <= mobileWidthPortrait && window.innerHeight <= mobileHeightPortrait;
      const isMobileLandscape = isMobile && window.innerWidth <= mobileWidthLandscape && window.innerHeight <= mobileHeightLandscape;

      if (isLandscape && (isMobilePortrait || isMobileLandscape)) {
        document.getElementById('landscape-warning').classList.add('visible');
      } else {
        document.getElementById('landscape-warning').classList.remove('visible');
      }
    }
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
  });

  function disableScroll() {
    document.body.style.overflow = 'hidden';
}