const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"


//Listen to orientation change
window.addEventListener('orientationchange', doOnOrientationChange);

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-button').addEventListener('click', function() {
        logIn('/users');
    });

    document.getElementById('guest-login-button').addEventListener('click', function() {
        guestLogIn();
    });
});

async function logIn(path = "") {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let isValidUser = false;

    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    console.log(responseToJson);
    let keys = Object.keys(responseToJson); // erstellt ein Array, das alle Schlüssel eines Objekts enthält
    console.log(keys);

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

function doOnOrientationChange() {
    let orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;

    if (orientation) {
        switch(orientation.type) {
            case 'landscape-primary':
            case 'landscape-secondary':
                document.getElementById("landscape").style.display = "block";
                break;
            case 'portrait-primary':
            case 'portrait-secondary':
            default:
                document.getElementById("landscape").style.display = "none";
                break;
        }
    } else {
        // Fallback for browsers that do not support screen.orientation
        const angle = window.orientation;
        if (angle === 90 || angle === -90) {
            document.getElementById("landscape").style.display = "block";
        } else {
            document.getElementById("landscape").style.display = "none";
        }
    }
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
