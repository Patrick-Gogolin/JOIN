let contacts = [];
let isSelected = false;
let contactsKeys = null;
let affectedTaskIndices = [];
let affectedTaskIndexArray = [];
let activeUserInContacts = null;

window.addEventListener('resize', checkForMobileMode);
window.addEventListener('load', checkForMobileMode);

async function onloadFunc(){
    isSelected = false;
    let contactResponse = await loadContacts("contacts");
    let contactKeysArray = Object.keys(contactResponse);
    contactsKeys = Object.keys(contactResponse);
    console.log(contactsKeys);
    for (let index = 0; index < contactKeysArray.length; index++) {
        contacts.push(
            {
                id: contactKeysArray[index],
                contact : contactResponse[contactKeysArray[index]],
            }
        )   
    }
    addUserToContact();
    sortContactsAlphabetically();
    await loadContacts('/contacts');
    showUserInContacts();
    checkForMobileMode();
}

function addUserToContact(){
    let user = JSON.parse(localStorage.getItem("user"));
    let userEmail = user.email;
    let userName = user.name + " " + user.surname;
    console.log(user);
    console.log(userEmail);
    console.log(userName);
    if (user.name !== "Guest"){
        activeUserInContacts =
        {
            id: "user",
            contact : {
                color: "rgb(41,171,226)",
                email: userEmail,
                name: userName,
                phone: ""
            },
        }
    }
    console.log(activeUserInContacts);
}

function showUserInContacts(){
    let userElementInContacts = document.getElementById('user-contact');
    if (activeUserInContacts !== null) {
    let userName = activeUserInContacts.contact.name;
    let userEmail = activeUserInContacts.contact.email;
    let userColor = activeUserInContacts.contact.color;
    let userInitials = getContactsInitials(activeUserInContacts);

    userElementInContacts.innerHTML = `<div id="contact-list-element-${activeUserInContacts.id}" class="contact user-contact-element" onclick='showContactInfo(${JSON.stringify(activeUserInContacts)})'>
    <div class="contact-logo" style="background-color: ${userColor};" >${userInitials}</div>
    <div class="contact-name">
     <p>${userName} <span><small>(YOU)</small></span></p>
     <a href="">${userEmail}</a>
    </div>
    </div>`
    }
}


async function getTasksForContactsPage(path = "") {
    allTasks.length = 0;
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();;
    let keys = Object.keys(responseToJson);
    taskKeys = keys;

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const task = responseToJson[key];
        data = {
            id: key,
            title: task['title'],
            description: task['description'],
            deadline: task['deadline'],
            priority: task['priority'],
            subtasks: JSON.parse(task['subtasks']),
            doneSubtasks: JSON.parse(task['doneSubtasks']),
            assignedContacts: JSON.parse(task['assignedContacts']),
            assignedContactsColors: JSON.parse(task['assignedContactsColors']),
            assignedContactsId: JSON.parse(task['assignedContactsId']),
            category: task['category'],
            status: task['status']
        };
        allTasks.push(data);
    }
}


function sortContactsAlphabetically() {
    let combinedArray = contacts.map((contact, index) => {
        return { 
            contact: contact, 
            key: contactsKeys[index] 
        };
    });
    combinedArray.sort((a, b) => {
        const nameA = a.contact.contact.name.toUpperCase();
        const nameB = b.contact.contact.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    contacts = combinedArray.map(item => item.contact);
    contactsKeys = combinedArray.map(item => item.key);
    console.log(contacts);
    console.log(contactsKeys);
}

async function loadContacts(path=""){
    let response = await fetch(BASE_URL + path + ".json");
    let contactListElement = document.getElementById('contact-list');
    contactListElement.innerHTML = `<div class="user-contact" id="user-contact"></div>`;
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
        showUserInContacts();
    }
    return responseToJson = await response.json(); 
}


function showUserFeedback(){
    let feedback = document.getElementById('user-feedback');
    let width = window.innerWidth;
    if (width <= 1100){
        feedback.style.bottom = "28%";
        feedback.style.left = "calc((100% - 316px) / 2)";
        feedback.style.animation = "climb-up 1000ms";
    feedback.classList.remove("d-none");
    setTimeout(() => {
       feedback.style.animation = "climb-down 1000ms";
    }, 2000);
    setTimeout(() => {
        feedback.classList.add("d-none");
     }, 2900);
    } else{
        userFeedbackSlideIn();
    };
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
    contactsKeys.push(newContact.name);
    sortContactsAlphabetically();
    await loadContacts();
    name.value = "";
    email.value = "";
    phone.value = "";
    document.getElementById('add-contact-popup').classList.add('d-none');
    checkForMobileMode();
    showUserFeedback();
    showContactInfo({id: newContact.name, contact: data});
    return newContact;
}



async function deleteContacts(contactID){
    let index = contactsKeys.indexOf(contactID);
    let contactName = contacts[index].contact.name;
    removeContactFromTasks(allTasks, contactName);
    closeEditOptions();
    let response = await fetch(BASE_URL + `contacts/${contactID}.json`, {
        method: "DELETE",
    });

    if (response.ok) {
        removeContactFromArray(contactID);
        await loadContacts();
    }
    document.getElementById('contact-info').innerHTML = 
    `<div class="contact-info-header">
    <div onclick="backToList()" class="back_img_boarder">
    <img src="/img/arrow-left-line.png" alt="">
</div>
    <h1>Contacts</h1>
    <div class="contact-info-header-separator"></div>
    <span>Better with a team</span>
    <div class="contact-info-header-separator-mobile"></div>
    </div>`;
    for (let i = 0; i < affectedTaskIndices.length; i++) {
        const task = affectedTaskIndices[i];
        const taskIndex = affectedTaskIndexArray[i];
        await updateTaskAfterDeleteOrUpdatedContact(`/tasks/${task}`,data, taskIndex);
    }
    return await response.json();
}

function removeContactFromTasks(tasksArray, contactName) {

    tasksArray.forEach((task, taskIndex) => {
        const index = task.assignedContacts.indexOf(contactName);

        if (index !== -1) {
            task.assignedContacts.splice(index, 1);
            task.assignedContactsColors.splice(index, 1);
            task.assignedContactsId.splice(index, 1);
            affectedTaskIndices.push(tasksArray[taskIndex].id);
            affectedTaskIndexArray.push(taskIndex);
        }
    });
    console.log(allTasks);
    console.log(affectedTaskIndices);
    console.log(affectedTaskIndexArray);
    return affectedTaskIndices;
}

async function updateTaskAfterDeleteOrUpdatedContact(path = "", data={}, i) {
    data = {
         id: "",
         title: allTasks[i]['title'],
         description: allTasks[i]['description'],
         deadline: allTasks[i]['deadline'],
         priority: allTasks[i]['priority'],
         subtasks: JSON.stringify(allTasks[i]['subtasks']),
         doneSubtasks: JSON.stringify(allTasks[i]['doneSubtasks']),
         assignedContacts: JSON.stringify(allTasks[i]['assignedContacts']),
         assignedContactsColors: JSON.stringify(allTasks[i]['assignedContactsColors']),
         assignedContactsId: JSON.stringify(allTasks[i]['assignedContactsId']),
         category: allTasks[i]['category'],
         status: allTasks[i]['status']
     };
     let response = await fetch(BASE_URL + path + ".json",{
         method: "PUT",
         headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify(data)
     });
   return responseToJson = await response.json();
   }


function removeContactFromArray(contactID){
    let index = contacts.findIndex(contact => contact.id === contactID);
    if (index !== -1) {
        contacts.splice(index, 1);
    }
}


function editContact(eachContact){
    closeEditOptions();
    document.getElementById('edit-contact-popup').classList.remove("d-none");
    document.getElementById('edit-contact-popup').innerHTML = getEditContactTemplate(eachContact);
    document.getElementById('editName').value = eachContact.contact.name;
    document.getElementById('editMail').value = eachContact.contact.email;
    document.getElementById('editPhone').value = eachContact.contact.phone;
    document.getElementById(`contact-logo-${eachContact}`).style.backgroundColor = eachContact.contact.color; 
    document.getElementById('edit-contact-popup-content').classList.add("animation");
    document.getElementById('edit-contact-popup-content').classList.remove("animation-close");
   
}


async function submitEditContactForm(event, contactID){
    let index = contactsKeys.indexOf(contactID);
    let contactName = contacts[index].contact.name;
    updateContactNameFromTasks(allTasks, contactName);
    event.preventDefault();
    let name = document.getElementById('editName').value;
    let email = document.getElementById('editMail').value;
    let phone = document.getElementById('editPhone').value;
    let indexOfContact = contacts.findIndex(obj => obj.id === contactID);
    let color = contacts[indexOfContact].contact.color;
    let updatedContact = {
        name : name,
        email : email,
        phone : phone,
        color : color
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
    for (let i = 0; i < affectedTaskIndices.length; i++) {
        const task = affectedTaskIndices[i];
        const taskIndex = affectedTaskIndexArray[i];
        await updateTaskAfterDeleteOrUpdatedContact(`/tasks/${task}`,data, taskIndex);
    }
}

function updateContactNameFromTasks(tasksArray, contactName) {
    let newNameOfContact = document.getElementById('editName').value;
    affectedTaskIndices.length = 0;
    affectedTaskIndexArray.length = 0;

    tasksArray.forEach((task, taskIndex) => {
        const index = task.assignedContacts.indexOf(contactName);

        if (index !== -1) {
            task.assignedContacts.splice(index, 1, newNameOfContact);
            affectedTaskIndices.push(tasksArray[taskIndex].id);
            affectedTaskIndexArray.push(taskIndex);
        }
    });
    console.log(allTasks);
    console.log(affectedTaskIndices);
    console.log(affectedTaskIndexArray);
    return affectedTaskIndices;
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
    return `<div id="edit-contact-popup-content" class="popup-content animation" onclick="doNotClose(event)">
            <div class="popup-left">
                <div onclick="closePopup()" class="back-icon-white-boarder"><img class="back-icon-white" src="img/close_white.png" alt=""></div>
                <img class="join-logo" src="/img/capa_2.png" alt="">
                <h1>Edit contact</h1>
                <div class="blue-line"></div>
            </div>
            <div id="contact-logo-${eachContact}" class="edit-contact-logo">${initials}</div>
            <div class="popup-right">
                <div onclick="closePopup()" class="back-icon-boarder"><img class="back-icon" src="img/x.svg" alt=""></div>
                <form class="form" onsubmit="submitEditContactForm(event, '${eachContact.id}'); return false;">
                    <input id="editName" class="add-contact-input-name" placeholder="Name" type="text" required>
                    <input id="editMail" class="add-contact-input-mail" placeholder="Email" type="email" required>
                    <input id="editPhone" class="add-contact-input-tel" placeholder="Phone" type="tel" required>
                    <div class="add-contact-form-buttons">
                    <button type="button" class="cancel" onclick= "closePopup()">Delete<img src="img/x.svg" alt=""></button>
                    <button type="submit" class="create">Save<img src="img/check.png" alt=""></button>
                    </div>
                </form>
            </div>
        </div>`;
}


function addContact(){
    document.getElementById('popup-content').classList.remove("animation-close");
    document.getElementById('popup-content').classList.add("animation");
    document.getElementById('add-contact-popup').classList.remove("d-none");
}


function closePopup(){
    checkForMobileMode();
    document.getElementById('popup-content').classList.remove("animation");
    document.getElementById('popup-content').classList.add("animation-close");
    setTimeout(() => {
        document.getElementById('add-contact-popup').classList.add("d-none");
    }, 300);
    if (document.getElementById('edit-contact-popup-content') != null){
    document.getElementById('edit-contact-popup-content').classList.remove("animation")
    document.getElementById('edit-contact-popup-content').classList.add("animation-close");
    setTimeout(() => {
        document.getElementById('edit-contact-popup').classList.add("d-none");
    }, 300);   
    }
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
        initials = nameparts[0].charAt(0).toUpperCase() + nameparts[nameparts.length - 1].charAt(0).toUpperCase();
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



function checkForMobileMode(){
    showMobileHeader();
    giveAnimations();
    let width = window.innerWidth;
    let contactList = document.getElementById('contact-list-responsive');
    let contactInfo = document.getElementById('contact-info');
    if(width <= 800 && (isSelected === true)){
        contactList.style.display = "none";
        contactInfo.style.display = "block";
        contactInfo.style.width = "100%";
    } else if(width <= 800 && (isSelected === false)){
        contactList.style.display = "block";
        contactInfo.style.display = "none";
        contactList.style.width = "100%";
    } else{
        contactInfo.style.display = "block";
        contactList.style.display = "block";
        contactInfo.style.width = "48%";
    };
}

function giveAnimations(){

    let elements = [
        document.getElementById('animation-header'),
        document.getElementById('animation-title'),
        document.getElementById('animation-email-title'),
        document.getElementById('animation-email'),
        document.getElementById('animation-phone-title'),
        document.getElementById('animation-phone')
    ];
    let width = window.innerWidth;

    elements.forEach(element =>{
        if (element) {
            if (width <= 800) {
                element.classList.remove('animation');
            } else {
                element.classList.add('animation');
            }
        }
    })
}

function userFeedbackSlideIn(){
    let feedback = document.getElementById('user-feedback');
        feedback.style.animation = "slide-from-right 1000ms";
        feedback.style.bottom = "3%";
        feedback.style.left = "650px";
        feedback.classList.remove("d-none");
        setTimeout(() => {
            feedback.style.animation = "slide-to-right 1000ms";
        }, 2000);
        setTimeout(() => {
            feedback.classList.add("d-none");
        }, 2900);
    }




function backToList(){
    
    if(window.innerWidth<= 800){
        isSelected = false;
        document.getElementById('contact-list-responsive').style.display ="block";
        document.getElementById('contact-info').style.display = "none";
        document.getElementById('edit-more-options').style.display = "none";
        document.querySelectorAll('.contact').forEach(element => {
            element.style.backgroundColor = '';
            element.style.color = '';
        })
    };
    checkForMobileMode();
}

function showMobileHeader(){
    let header = document.getElementById('contact-header');
    let mobileHeader = document.getElementById('contact-mobile-header');
    if (window.innerWidth <= 1220){
        header.classList.add("d-none");
        mobileHeader.style.display = 'flex';
    } else {
        header.classList.remove("d-none");
        mobileHeader.style.display = 'none';
    }
}


function showContactInfo(eachContact){
    isSelected = true;
    checkForMobileMode();
    document.querySelectorAll('.contact').forEach(element => {
        element.style.backgroundColor = '';
        element.style.color = '';
    })
    document.getElementById(`contact-list-element-${eachContact.id}`).style.background = "#2A3647";
    document.getElementById(`contact-list-element-${eachContact.id}`).style.color = "white";
    showInfo(eachContact); 
}





function showInfo(eachContact){
    document.getElementById('contact-info').innerHTML = getEachContactInfo(eachContact);
    giveAnimations();
}


function getEachContactInfo(eachContact){
    let initials = getContactsInitials(eachContact);
    let contactName = eachContact.contact.name;
    let contactEmail = eachContact.contact.email;
    let contactPhone = eachContact.contact.phone;
    let actualBgColor = eachContact.contact.color;
    return `
    <div class="contact-info-header">
                <div onclick="backToList()" class="back_img_boarder">
                    <img src="/img/arrow-left-line.png" alt="">
                </div>
                <h1>Contacts</h1>
                <div class="contact-info-header-separator"></div>
                <span>Better with a team</span>
                <div class="contact-info-header-separator-mobile"></div>
    </div>
                <div id="animation-header" class="contact-data">
                <div id="contact-data-logo" class="contact-data-logo" style="background:${actualBgColor};">${initials}</div>
                <div class="contact-data-name"><span>${contactName}</span> 
                        <div class="contact-data-icon">
                            <div onclick='editContact(${JSON.stringify(eachContact)})' class="edit"><img src="/img/edit.png" alt=""><p>Edit</p></div>
                            <div onclick="deleteContacts('${eachContact.id}')" class="delete"><img src="/img/delete.png" alt=""><p>Delete</p></div>
                        </div>
                </div>
                </div>
                <h2 id="animation-title">Contact Information</h2>
                <h3 id="animation-email-title">Email</h3>
                <a id="animation-email" href="">${contactEmail}</a>
                <h3 id="animation-phone-title">Phone</h3>
                <p id="animation-phone" class="tel-number" >${contactPhone}</p>
                </div>
                <div onclick='openEditOptions(); doNotClose(event)' id="edit-more-options" class="more_img_boarder">
                    <img src="/img/more_vert.png" alt="">
                </div>
                <div onclick="doNotClose(event)" id="edit-more-options-list" class="more_options">
                <div class="more_options_icon" >
                            <div onclick='editContact(${JSON.stringify(eachContact)})' class="edit" style="margin-bottom: 15px;"><img src="/img/edit.png" alt="" ><p>Edit</p></div>
                            <div onclick="deleteContacts('${eachContact.id}')" class="delete"><img src="/img/delete.png" alt=""><p>Delete</p></div>
                        </div></div>`
                ;
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


function openEditOptions(){
    document.getElementById('edit-more-options-list').style.animation = "300ms move-in";
    document.getElementById('edit-more-options-list').style.display = "flex";
}


function closeEditOptions(){
    document.getElementById('edit-more-options-list').style.animation = "300ms move-out";
    setTimeout(() => {
        document.getElementById('edit-more-options-list').style.display = "none";
    }, 300);
}