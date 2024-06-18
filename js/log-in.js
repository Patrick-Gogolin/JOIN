const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"

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
    window.location.href = 'summary.html';
}

function handleFormSubmit(event) {
    event.preventDefault();
}
