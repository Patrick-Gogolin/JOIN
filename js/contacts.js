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
    sortContactsAlphabetically();
    await loadContacts('/contacts');
}   

function sortContactsAlphabetically() {
    contacts.sort((a, b) => {
        const nameA = a.contact.name.toUpperCase();
        const nameB = b.contact.name.toUpperCase(); 
        
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
}


async function loadContacts(path=""){
    let response = await fetch(BASE_URL + path + ".json");
    let contactListElement = document.getElementById('contact-list');
    contactListElement.innerHTML = "";
    let currentInitial = "";

    for (let index = 0; index < contacts.length; index++) {
        let eachContact = contacts[index];
        let contactInitial = eachContact.contact.name.charAt(0).toUpperCase();

        if (contactInitial !== currentInitial) {
            currentInitial = contactInitial;
            contactListElement.innerHTML += getABCSeparatorTemplate(currentInitial);
        }

       contactListElement.innerHTML += getContactListTemplate(eachContact);
        getContactsInitials(eachContact);
        random_bg_color(eachContact);
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
        <div id="contact-logo-${eachContact.id}" class="contact-logo">${initials}</div>
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


function getABCSeparatorTemplate(letter){
    return `<div class="abc-separator">
                <p>${letter}</p>
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
    let actualBgColor = document.getElementById(`contact-logo-${eachContact.id}`).style.background;
    
    console.log(actualBgColor);
    

    return `
    <div class="contact-info-header">
                <h1>Contacts</h1>
                <div class="contact-info-header-separator"></div>
                <span>Better with a team</span>
                </div>
                <div class="contact-data">
                <div id="contact-data-logo" class="contact-data-logo" style="background:${actualBgColor};">${initials}</div>
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


function random_bg_color(eachContact) {
    // Generate random values for red, green, and blue components between 0 and 255.
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    // Construct the RGB color string.
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    // Output the generated color to the console.
    console.log(bgColor);
    // Set the background color of the document body to the generated color.
    document.getElementById(`contact-logo-${eachContact.id}`).style.background = bgColor;
}