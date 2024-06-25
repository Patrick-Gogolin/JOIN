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
    let color = random_bg_color();
    data = {
        name : name.value,
        email : email.value,
        phone : phone.value,
        color : color,

    };
    let response = await fetch(BASE_URL + path + ".json",{
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    let newContact = await response.json();
    contacts.push({
        id: newContact.name,
        contact: data,
    });
    sortContactsAlphabetically();
    await loadContacts();
    name.value = "";
    email.value = "";
    phone.value = "";

    document.getElementById('add-contact-popup').classList.add('d-none');
    showContactInfo({id: newContact.name, contact: data});
    return newContact;
}


async function deleteContacts(contactID){

    let response = await fetch(BASE_URL + `contacts/${contactID}.json`, {
        method: "DELETE",
    });

    if (response.ok) {
        removeContactFromArray(contactID);
        await loadContacts();
    }
    document.getElementById('contact-info').innerHTML = 
    `<div class="contact-info-header">
    <h1>Contacts</h1>
    <div class="contact-info-header-separator"></div>
    <span>Better with a team</span>
    </div>`;
    return await response.json();
}

function removeContactFromArray(contactID){
    let index = contacts.findIndex(contact => contact.id === contactID);
    if (index !== -1) {
        contacts.splice(index, 1);
    }
}

function editContact(eachContact){
    

    document.getElementById('edit-contact-popup').classList.remove("d-none");
    document.getElementById('edit-contact-popup').innerHTML = getEditContactTemplate(eachContact);

    document.getElementById('editName').value = eachContact.contact.name;
    document.getElementById('editMail').value = eachContact.contact.email;
    document.getElementById('editPhone').value = eachContact.contact.phone;
    document.getElementById(`contact-logo-${eachContact}`).style.backgroundColor = eachContact.contact.color;
    
}

function submitEditContactForm(event, contactID){
    event.preventDefault();

    let name = document.getElementById('editName').value;
    let email = document.getElementById('editMail').value;
    let phone = document.getElementById('editPhone').value;
    
    
    let updatedContact = {
        name : name,
        email : email,
        phone : phone
    };
   
    putContacts(`contacts/${contactID}`, updatedContact).then(() => {
        const index = contacts.findIndex(contact => contact.id === contactID);
        if (index !== -1) {
            contacts[index].contact = updatedContact;
        }

        document.getElementById('edit-contact-popup').classList.add('d-none');

        loadContacts();
        showContactInfo(contacts[index]);
    }).catch(error => {
        console.error('Error updating contact:', error);
    });
}


async function putContacts(path="", data={}){

    let response = await fetch(BASE_URL + path + ".json",{
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
    }

    return await response.json();
}


function getEditContactTemplate(eachContact){
    let initials = getContactsInitials(eachContact);
    return `<div class="popup-content animation" onclick="doNotClose(event)">
            <div class="popup-left">
                <img src="/img/capa_2.png" alt="">
                <h1>Edit contact</h1>
                <div class="blue-line"></div>
            </div>
            <div class="popup-right">
                <div onclick="closePopup()" class="back-icon-boarder"><img class="back-icon" src="img/x.png" alt=""></div>
                <div id="contact-logo-${eachContact}" class="edit-contact-logo">${initials}</div>
                <form class="form" onsubmit="submitEditContactForm(event, '${eachContact.id}'); return false;">
                    <input id="editName" class="add-contact-input-name" placeholder="Name" type="text" required>
                    <input id="editMail" class="add-contact-input-mail" placeholder="Email" type="email" required>
                    <input id="editPhone" class="add-contact-input-tel" placeholder="Phone" type="tel" required>
                    <div class="add-contact-form-buttons">
                    <button type="button" class="cancel" onclick= "closePopup()">Cancel <img src="img/x.png" alt=""></button>
                    <button type="submit" class="create"> Edit contact <img src="img/check.png" alt=""></button>
                    </div>
                </form>
            </div>
        </div>`;
}


function addContact(){
    document.getElementById('add-contact-popup').classList.remove("d-none");
}



function closePopup(){
    document.getElementById('add-contact-popup').classList.add("d-none");
    document.getElementById('edit-contact-popup').classList.add("d-none");
}


function doNotClose(event){
    event.stopPropagation();
}


function getContactListTemplate(eachContact){
    let initials = getContactsInitials(eachContact);
    let bgColor = eachContact.contact.color;
    return`
    <div id="contact-list-element-${eachContact.id}" class="contact" onclick='showContactInfo(${JSON.stringify(eachContact)})'>
        <div class="contact-logo" style="background-color: ${bgColor};" >${initials}</div>
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
    showInfo(eachContact);
}

function showInfo(eachContact){
    document.getElementById('contact-info').innerHTML = getEachContactInfo(eachContact);
}

function getEachContactInfo(eachContact){
    let initials = getContactsInitials(eachContact);
    let contactName = eachContact.contact.name;
    let contactEmail = eachContact.contact.email;
    let contactPhone = eachContact.contact.phone;
    let actualBgColor = eachContact.contact.color;
    
    return `
    <div class="contact-info-header">
                <h1>Contacts</h1>
                <div class="contact-info-header-separator"></div>
                <span>Better with a team</span>
    </div>
                <div class="contact-data animation">
                <div id="contact-data-logo" class="contact-data-logo" style="background:${actualBgColor};">${initials}</div>
                <div class="contact-data-name">${contactName} 
                        <div class="contact-data-icon">
                            <div onclick='editContact(${JSON.stringify(eachContact)})' class="edit"><img src="/img/edit.png" alt=""><p>Edit</p></div>
                            <div onclick="deleteContacts('${eachContact.id}')" class="delete"><img src="/img/delete.png" alt=""><p>Delete</p></div>
                        </div>
                </div>
                </div>
                <h2 class="animation">Contact Information</h2>
                <h3 class="animation">Email</h3>
                <a href="" class="animation">${contactEmail}</a>
                <h3 class="animation" >Phone</h3>
                <p class="animation" >${contactPhone}</p>
                </div>`;
}


function random_bg_color() {
    // Generate random values for red, green, and blue components between 0 and 255.
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    // Construct the RGB color string.
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    // Output the generated color to the console.

    // Set the background color of the document body to the generated color.
    return bgColor;
}