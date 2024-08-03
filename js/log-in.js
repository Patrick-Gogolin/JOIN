const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"
let isValidUser = false;

/**
 * This Function adds click Event Listener to the log-in and guest-log-in button 
 * 
 */
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-button').addEventListener('click', function() {
        logIn('/users');
    });

    document.getElementById('guest-login-button').addEventListener('click', function() {
        guestLogIn();
    });
});

/**
 * This function is for the log-in of a user who has an account and store in case of successfull log in the user in the local storage
 * 
 * @param {string} path  - Path which is added to the BASE URL 
 */

async function logIn(path = "") {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    let keys = Object.keys(responseToJson);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const userData = responseToJson[key];

        if(userData.email === email && userData.password === password){
            isValidUser = true;
            let user = JSON.stringify(userData);
            localStorage.setItem('user', user);
            break
        }
    }
    checkLogInData(isValidUser);
}

/**
 * This function checks if the log in data is correct and forwards to the summary.html if the data is correct or gives feedback if not
 * 
 * @param {boolean} isValidUser - By default this variable is false and only turns to true if the log in data is correct
 */
function checkLogInData(isValidUser){
    if(isValidUser){
        document.getElementById('password').classList.remove('password-not-the-same');
        document.getElementById('not-same-password-container').classList.add('d-none');
        window.location.href = 'summary.html';
    }
    else{
        document.getElementById('password').classList.add('password-not-the-same');
        document.getElementById('not-same-password-container').classList.remove('d-none');
    }
}

/**
 * This function is for a user who has no log in data and who wants to test the site but doesnt wants to create an account 
 * 
 */
function guestLogIn() {
    let guestUser = {email: "", name: "Guest", password: "", surname: " "};
    localStorage.setItem("user", JSON.stringify(guestUser));
    window.location.href = 'summary.html';
}

/**
 * Handles the form submission and prevents the default form submission behavior.
 * 
 * @param {Event} event - The event object representing the form submission event.
 */
function handleFormSubmit(event) {
    event.preventDefault();
}

/**
 * This function checks if a user is stored in the local storage. If not the user is redirected to the index.html
 * 
 */
function checkUserAndRedirect() {
    let userKey = 'user';
    let user = localStorage.getItem(userKey);
    
    if (!user) {
        window.location.href = 'index.html';
    }
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