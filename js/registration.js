const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"

//Listen to orientation change
window.addEventListener('orientationchange', doOnOrientationChange);

async function postData(path = "", data={}) {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirm-password');
    let name = document.getElementById('first-name');
    let surname = document.getElementById('last-name');

    if(password.value === confirmPassword.value ) {

    data = {
        email: email.value,
        password: password.value,
        name: name.value,
        surname: surname.value
    };

    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    document.getElementById('confirm-password').classList.remove('password-not-the-same');
    document.getElementById('not-same-password-container').classList.add('d-none');
    successfullLogin();
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 2000);
    return responseToJson = await response.json();

}
else{
    document.getElementById('confirm-password').classList.add('password-not-the-same');
    document.getElementById('not-same-password-container').classList.remove('d-none');
}
}

function successfullLogin() {
    document.getElementById('overlayer-successful-login').classList.remove('d-none');
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