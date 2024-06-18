const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/";

let contacts = [];

async function onloadFunc(){
    
    let contactResponse = await loadContacts("contacts");

    let contactKeysArray = Object.keys(contactResponse);

    for (let index = 0; index < contactKeysArray.length; index++) {
        contacts.push(
            {
                id: contactKeysArray[index],
                contact : contactResponse[contactKeysArray[index]],

            }
        )
        
    }

    console.log(contacts);
    //postData("/contacts", {"":""});
    //deleteData("/contacts/-O-SvGfTOuulS1WyvDew");
    //putData("/contacts", {"":""});
}   

async function loadContacts(path=""){
    let response = await fetch(BASE_URL + path + ".json");
    return responseToJson = await response.json();
    
}

async function postContacts(path="", data={}){
    let name = document.getElementById('name');
    let email = document.getElementById('mail');
    let phone = document.getElementById('phone');

    data = {
        name : name.value,
        email : email.value,
        phone : phone.value,
    };


    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    document.getElementById('add-contact-popup').classList.add('d-none');
    return responseToJson = await response.json();
}

async function deleteContacts(path=""){
    let response = await fetch(BASE_URL + path + ".json",{
        method: "DELETE",
    });
    return responseToJson = await response.json();
}

async function putContacts(path="", data={}){
    let response = await fetch(BASE_URL + path + ".json",{
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseToJson = await response.json();
}

async function editContact(){
    putContacts(`contacts/${id}`, user);
}

function addContact(){
    document.getElementById('add-contact-popup').classList.remove('d-none');
}
