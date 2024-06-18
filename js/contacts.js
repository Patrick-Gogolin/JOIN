const BASE_URL = "https://remotestorage-c5224-default-rtdb.europe-west1.firebasedatabase.app/";


async function onloadFunc(){
    
    let contactResponse = await loadContacts("contacts");

    let contactKeysArray = Object.keys(contactResponse);

    console.log(contactKeysArray);
    //postData("/contacts", {"":""});
    //deleteData("/contacts/-O-SvGfTOuulS1WyvDew");
    //putData("/contacts", {"":""});
}   

async function loadContacts(path=""){
    let response = await fetch(BASE_URL + path + ".json");
    return responseToJson = await response.json();
    
}

async function postContacts(path="", data={}){
    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
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
