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

   loadContacts();
}   

async function loadContacts(path=""){
    let response = await fetch(BASE_URL + path + ".json");
    

    for (let index = 0; index < contacts.length; index++) {
        let eachContact = contacts[index];

        document.getElementById('contact-list').innerHTML += getContactListTemplate(eachContact);
        getContactsInitials(eachContact);
    }

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
    loadContacts();
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
    document.getElementById('add-contact-popup').classList.remove("d-none");
}

function closePopup(){
    document.getElementById('add-contact-popup').classList.add("d-none");
}

function doNotClose(event){
    event.stopPropagation();
}

function getContactListTemplate(eachContact){
    let initials = getContactsInitials(eachContact);
    return`
    <div id="contact-list-element-${eachContact.id}" class="contact" onclick='showContactInfo(${JSON.stringify(eachContact)})'>
        <div class="contact-logo">${initials}</div>
        <div class="contact-name">
         <p>${eachContact.contact.name}</p>
         <a href="">${eachContact.contact.email}</a>
    </div>
    </div>`;
}

function getContactsInitials(eachContact){
    let fullname = eachContact.contact.name;
    let nameparts = fullname.split(" ");
    let initials = "";
    
    if (nameparts.length > 1) {
        initials = nameparts[0].charAt(0).toUpperCase() + nameparts[1].charAt(0).toUpperCase();
    } else if (nameparts.length === 1){
        initials = nameparts[0].charAt(0).toUpperCase();
    }
    
    return initials;
}

function getABCSeparatorTemplate(){
    return `<div class="abc-separator">
                <p>B</p>
            </div>`;
}

function showContactInfo(eachContact){

    document.querySelectorAll('.contact').forEach(element => {
        element.style.backgroundColor = '';
        element.style.color = '';
    })

    document.getElementById(`contact-list-element-${eachContact.id}`).style.backgroundColor = "#2A3647";
    document.getElementById(`contact-list-element-${eachContact.id}`).style.color = "white";
    document.getElementById('contact-info').innerHTML = getEachContactInfo(eachContact);
}


function getEachContactInfo(eachContact){
    let initials = getContactsInitials(eachContact);
    let contactName = eachContact.contact.name;
    let contactEmail = eachContact.contact.email;
    let contactPhone = eachContact.contact.phone;

    return `
    <div class="contact-data">
                <div class="contact-data-header">
                    <div class="contact-data-logo">${initials}</div>
                    <div class="contact-data-name">${contactName} 
                        <div class="contact-data-icon">
                            <div class="edit"><img src="/img/edit.png" alt=""><p>Edit</p></div>
                            <div class="delete"><img src="/img/delete.png" alt=""><p>Delete</p></div>
                        </div>
                    </div>
                </div>
                <h2>Contact Information</h2>
                <h3>Email</h3>
                <a href="">${contactEmail}</a>
                <h3>Phone</h3>
                <p>${contactPhone}</p>

            </div>`;
}