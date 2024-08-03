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
 * This function is for the log-in of a user who has an account
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

function guestLogIn() {
    let guestUser = {email: "", name: "Guest", password: "", surname: " "};
    localStorage.setItem("user", JSON.stringify(guestUser));
    console.log(guestUser);
    window.location.href = 'summary.html';
}

function handleFormSubmit(event) {
    event.preventDefault();
}

function checkUserAndRedirect() {
    let userKey = 'user';
    let user = localStorage.getItem(userKey);
    
    if (!user) {
        window.location.href = 'index.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Set default mobile width and height thresholds
    const mobileWidthPortrait = 768;  // Width threshold for mobile portrait mode
    const mobileHeightPortrait = 1024; // Height threshold for mobile portrait mode
  
    const mobileWidthLandscape = 1024; // Width threshold for mobile landscape mode
    const mobileHeightLandscape = 768; // Height threshold for mobile landscape mode
  
    // Define a maximum width to distinguish between mobile and desktop
    const maxMobileWidth = 932;  // This should be the upper limit for mobile devices
  
    // Function to check orientation and display the warning if needed
    function checkOrientation() {
      const isLandscape = window.innerWidth > window.innerHeight;
  
      // Check if the screen width is less than or equal to the maxMobileWidth
      const isMobile = window.innerWidth <= maxMobileWidth;
  
      // Conditions for showing the warning
      const isMobilePortrait = isMobile && window.innerWidth <= mobileWidthPortrait && window.innerHeight <= mobileHeightPortrait;
      const isMobileLandscape = isMobile && window.innerWidth <= mobileWidthLandscape && window.innerHeight <= mobileHeightLandscape;
  
      // Show the warning if the device is in landscape mode and fits mobile dimensions
      if (isLandscape && (isMobilePortrait || isMobileLandscape)) {
        document.getElementById('landscape-warning').classList.add('visible');
      } else {
        document.getElementById('landscape-warning').classList.remove('visible');
      }
    }
  
    // Initial check
    checkOrientation();
  
    // Check orientation on resize/orientation change
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
  });