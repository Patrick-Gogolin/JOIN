const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/"

async function logIn(path = "") {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    console.log(responseToJson);
    let keys = Object.keys(responseToJson); // erstellt ein Array, das alle Schlüssel eines Objekts enthält
    console.log(keys);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const userData = responseToJson[key];

        if(userData.email === email && userData.password === password){
            window.location.href = 'summary.html'
        }
        
    }

}