let contacts = [];
let isSelected = false;
let contactsKeys = null;
let affectedTaskIndices = [];
let affectedTaskIndexArray = [];
let activeUserInContacts = null;

/**
 * Retrieves the user object from the local storage and parses it as JSON.
 * @returns {Object} The user object.
 */
const user = JSON.parse(localStorage.getItem("user"));

window.addEventListener("resize", checkForMobileMode);
window.addEventListener("load", checkForMobileMode);

/**
 * Loads contacts, adds user to contacts, sorts contacts alphabetically, and performs other operations on page load.
 * @returns {Promise<void>} A promise that resolves when all operations are completed.
 */
async function onloadFunc() {
  isSelected = false;
  let contactResponse = await loadContacts("contacts");
  let contactKeysArray = Object.keys(contactResponse);
  contactsKeys = Object.keys(contactResponse);
  for (let index = 0; index < contactKeysArray.length; index++) {
    contacts.push({
      id: contactKeysArray[index],
      contact: contactResponse[contactKeysArray[index]],
    });
  }
  addUserToContact();
  sortContactsAlphabetically();
  await loadContacts("/contacts");
  await loadUser("/users");
  showUserInContacts();
  checkForMobileMode();
}

/**
 * Adds a user to the contact list.
 * @function addUserToContact
 * @returns {void}
 */
function addUserToContact() {
  let userEmail = user.email;
  let userName = user.name + " " + user.surname;
  let userPhone = user.phone;
  let userId = user.id;
  if (user.name !== "Guest") {
    activeUserInContacts = {
      id: userId,
      contact: {
        color: "rgb(41,171,226)",
        email: userEmail,
        name: userName,
        phone: userPhone,
      },
    };
  }
}

/**
 * Displays the active user's information in the contacts section.
 */
function showUserInContacts() {
  let userElementInContacts = document.getElementById("user-contact");
  if (activeUserInContacts !== null) {
    let userName = activeUserInContacts.contact.name;
    let userEmail = activeUserInContacts.contact.email;
    let userColor = activeUserInContacts.contact.color;
    let userInitials = getContactsInitials(activeUserInContacts);
    userElementInContacts.innerHTML = `<div id="contact-list-element-${activeUserInContacts.id}" class="contact user-contact-element" onclick="showUserContactInfo()">
    <div class="contact-logo" style="background-color: ${userColor};" >${userInitials}</div>
    <div class="contact-name">
     <p>${userName} <span><small>(YOU)</small></span></p>
     <a href="">${userEmail}</a>
    </div>
    </div>`;
  }
}

/**
 * Retrieves tasks for the contacts page.
 * @param {string} path - The path to the JSON file.
 * @returns {Promise<void>} - A promise that resolves when the tasks are retrieved.
 */
async function getTasksForContactsPage(path = "") {
  allTasks.length = 0;
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();
  let keys = Object.keys(responseToJson);
  taskKeys = keys;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const task = responseToJson[key];
    data = {
      id: key,
      title: task["title"],
      description: task["description"],
      deadline: task["deadline"],
      priority: task["priority"],
      subtasks: JSON.parse(task["subtasks"]),
      doneSubtasks: JSON.parse(task["doneSubtasks"]),
      assignedContacts: JSON.parse(task["assignedContacts"]),
      assignedContactsColors: JSON.parse(task["assignedContactsColors"]),
      assignedContactsId: JSON.parse(task["assignedContactsId"]),
      category: task["category"],
      status: task["status"],
    };
    allTasks.push(data);
  }
}

/**
 * Sorts the contacts array alphabetically by contact name.
 */
function sortContactsAlphabetically() {
  /**
   * An array that combines each contact object with its corresponding key.
   * @type {Array<{contact: object, key: string}>}
   */
  let combinedArray = contacts.map((contact, index) => {
    return {
      contact: contact,
      key: contactsKeys[index],
    };
  });
  // Sort the combinedArray based on the contact name in ascending order
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
  // Update the contacts array with the sorted contacts
  contacts = combinedArray.map((item) => item.contact);
  // Update the contactsKeys array with the sorted keys
  contactsKeys = combinedArray.map((item) => item.key);
}


/**
 * Loads contacts from a specified path and updates the contact list on the webpage.
 *
 * @param {string} path - The path to the JSON file containing the contacts. Defaults to an empty string.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response from the fetch request.
 */
async function loadContacts(path = "") {
  let response = await fetch(BASE_URL + path + ".json");
  let contactListElement = document.getElementById("contact-list");
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
  return (responseToJson = await response.json());
}

/**
 * Loads user data from a specified path.
 * @param {string} path - The path to the user data.
 * @returns {Promise<void>} - A promise that resolves when the user data is loaded.
 */
async function loadUser(path = "") {
  let userEmail = user.email;
  let userName = user.name + " " + user.surname;
  let userPhone = user.phone;
  let password = user.password;
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();
  let keys = Object.keys(responseToJson);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const userData = responseToJson[key];
    if (
      userData.name === user.name &&
      userData.email === user.email &&
      user.name !== "Guest"
    ) {
      activeUserInContacts = {
        id: key,
        contact: {
          color: "rgb(41,171,226)",
          email: userData.email,
          name: userName,
          phone: userData.phone,
          password: password,
        },
      };
    }
  }
}

/**
 * Displays user feedback on the screen.
 */
function showUserFeedback() {
  let feedback = document.getElementById("user-feedback");
  let width = window.innerWidth;
  if (width <= 1100) {
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
  } else {
    userFeedbackSlideIn();
  }
}

/**
 * Posts a new contact to the server.
 *
 * @param {string} path - The path to the server endpoint.
 * @param {Object} data - The contact data to be posted.
 * @returns {Promise<Object>} - A promise that resolves to the newly created contact.
 */
async function postContacts(path = "", data = {}) {
  let name = document.getElementById("name");
  let email = document.getElementById("mail");
  let phone = document.getElementById("phone");
  let color = random_bg_color();
  data = {
    name: name.value,
    email: email.value,
    phone: phone.value,
    color: color,
  };
  let response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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
  document.getElementById("add-contact-popup").classList.add("d-none");
  checkForMobileMode();
  showUserFeedback();
  showContactInfo({ id: newContact.name, contact: data });
  return newContact;
}

/**
 * Deletes a contact from the contacts list and performs additional actions.
 * @param {string} contactID - The ID of the contact to be deleted.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response from the server.
 */
async function deleteContacts(contactID) {
  let index = contactsKeys.indexOf(contactID);
  let contactName = contacts[index].name;
  removeContactFromTasks(allTasks, contactName);
  closeEditOptions();
  let response = await fetch(BASE_URL + `contacts/${contactID}.json`, {
    method: "DELETE",
  });

  if (response.ok) {
    removeContactFromArray(contactID);
    await loadContacts();
  }
  document.getElementById(
    "contact-info"
  ).innerHTML = `<div class="contact-info-header">
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
    await updateTaskAfterDeleteOrUpdatedContact(
      `/tasks/${task}`,
      data,
      taskIndex
    );
  }
  return await response.json();
}

/**
 * Removes a contact from tasks and returns an array of affected task indices.
 * @param {Array} tasksArray - The array of tasks.
 * @param {string} contactName - The name of the contact to be removed.
 * @returns {Array} - An array of affected task indices.
 */
function removeContactFromTasks(tasksArray, contactName) {
  affectedTaskIndices.length = 0;
  affectedTaskIndexArray.length = 0;
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

/**
 * Updates a task after deleting or updating a contact.
 * @param {string} path - The path to the resource.
 * @param {Object} data - The data object containing the task details.
 * @param {number} i - The index of the task in the 'allTasks' array.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response from the server.
 */
async function updateTaskAfterDeleteOrUpdatedContact(path = "", data = {}, i) {
  data = {
    id: "",
    title: allTasks[i]["title"],
    description: allTasks[i]["description"],
    deadline: allTasks[i]["deadline"],
    priority: allTasks[i]["priority"],
    subtasks: JSON.stringify(allTasks[i]["subtasks"]),
    doneSubtasks: JSON.stringify(allTasks[i]["doneSubtasks"]),
    assignedContacts: JSON.stringify(allTasks[i]["assignedContacts"]),
    assignedContactsColors: JSON.stringify(
      allTasks[i]["assignedContactsColors"]
    ),
    assignedContactsId: JSON.stringify(allTasks[i]["assignedContactsId"]),
    category: allTasks[i]["category"],
    status: allTasks[i]["status"],
  };
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

/**
 * Removes a contact from the contacts array based on the provided contact ID.
 * @param {string} contactID - The ID of the contact to be removed.
 * @returns {void}
 */
function removeContactFromArray(contactID) {
  let index = contacts.findIndex((contact) => contact.id === contactID);
  if (index !== -1) {
    contacts.splice(index, 1);
  }
}

/**
 * Opens the edit contact popup and populates it with the contact details.
 * @param {Object} eachContact - The contact object to be edited.
 */
function editContact(eachContact) {
  closeEditOptions();
  document.getElementById("edit-contact-popup").classList.remove("d-none");
  document.getElementById("edit-contact-popup").innerHTML =
    getEditContactTemplate(eachContact);
  document.getElementById("editName").value = eachContact.contact.name;
  document.getElementById("editMail").value = eachContact.contact.email;
  document.getElementById("editPhone").value = eachContact.contact.phone;
  document.getElementById(`contact-logo-${eachContact}`).style.backgroundColor =
    eachContact.contact.color;
  document
    .getElementById("edit-contact-popup-content")
    .classList.add("animation");
  document
    .getElementById("edit-contact-popup-content")
    .classList.remove("animation-close");
}

/**
 * Edit the user as a contact.
 */
function editUserAsContact() {
  let userEmail = user.email;
  let userName = user.name + " " + user.surname;
  let userPhone = user.phone;
  document.getElementById("edit-user-popup").classList.remove("d-none");
  document.getElementById("edit-user-popup").innerHTML = getEditUserTemplate();
  document.getElementById("editNameUser").value = userName;
  document.getElementById("editMailUser").value = userEmail;
  document.getElementById("editPhoneUser").value = userPhone;
  document.getElementById(`user-logo`).style.backgroundColor =
    "rgb(41,171,226)";
  document.getElementById("edit-user-popup-content").classList.add("animation");
  document
    .getElementById("edit-user-popup-content")
    .classList.remove("animation-close");
}

/**
 * Returns the template for editing a user.
 * @returns {string} The HTML template for editing a user.
 */
function getEditUserTemplate() {
  let initials = getUserInitials();
  return `<div id="edit-user-popup-content" class="popup-content animation" onclick="doNotClose(event)">
            <div class="popup-left">
                <div onclick="closePopup()" class="back-icon-white-boarder"><img class="back-icon-white" src="img/close_white.png" alt=""></div>
                <img class="join-logo" src="/img/capa_2.png" alt="">
                <h1>Edit contact</h1>
                <div class="blue-line"></div>
            </div>
            <div id="user-logo" class="edit-contact-logo">${initials}</div>
            <div class="popup-right">
                <div onclick="closePopup()" class="back-icon-boarder"><img class="back-icon" src="img/x.svg" alt=""></div>
                <form class="form" onsubmit="submitEditUserForm('${activeUserInContacts.id}'); return false;">
                    <input id="editNameUser" class="add-contact-input-name" placeholder="Vor und Nachname" type="text" required>
                    <input id="editMailUser" class="add-contact-input-mail" placeholder="Email" type="email" required>
                    <input id="editPhoneUser" class="add-contact-input-tel" placeholder="Phone" type="tel" required>
                    <div class="add-contact-form-buttons">
                    <button type="button" class="cancel" onclick= "closePopup()">Close<img src="img/x.svg" alt=""></button>
                    <button type="submit" class="create">Save<img src="img/check.png" alt=""></button>
                    </div>
                </form>
            </div>
        </div>`;
}

/**
 * Submits the form for editing a user.
 * @async
 */
async function submitEditUserForm() {
  let contactName = activeUserInContacts.contact.name;
  updateContactNameFromTasks(allTasks, contactName, "editNameUser");
  let fullName = document.getElementById("editNameUser").value;
  let nameParts = fullName.split(" ");
  let name = nameParts[0];
  let surname = nameParts.slice(1).join(" ");
  let email = document.getElementById("editMailUser").value;
  let phone = document.getElementById("editPhoneUser").value;
  let id = activeUserInContacts.id;
  let password = activeUserInContacts.contact.password;

  data = {
    id: activeUserInContacts.id,
    name: name,
    surname: surname,
    email: email,
    phone: phone,
    password: password,
  };

  user.name = name;
  user.surname = surname;
  user.email = email;
  user.phone = phone;
  user.id = id;
  user.password = password;

  localStorage.setItem("user", JSON.stringify(user));
  document.getElementById("edit-user-popup").classList.add("d-none");
  await updateUser(`/users/${activeUserInContacts.id}`, data);
  await loadUser("/users");
  showUserInfo(id);
  showUserInContacts();
  checkUserAndRedirect();
  init();
  for (let i = 0; i < affectedTaskIndices.length; i++) {
    const task = affectedTaskIndices[i];
    const taskIndex = affectedTaskIndexArray[i];
    await updateTaskAfterDeleteOrUpdatedContact(
      `/tasks/${task}`,
      data,
      taskIndex
    );
  }
}

/**
 * Updates a user's data in the specified path.
 * @param {string} path - The path where the user's data will be updated.
 * @param {object} data - The updated data for the user.
 * @returns {Promise<object>} - A promise that resolves to the JSON response from the server.
 */
async function updateUser(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return (responseToJson = await response.json());
}

/**
 * Submits the edit contact form and updates the contact information.
 * @param {Event} event - The event object.
 * @param {string} contactID - The ID of the contact to be edited.
 * @returns {Promise<void>} - A promise that resolves when the contact is updated.
 */
async function submitEditContactForm(event, contactID) {
  let index = contactsKeys.indexOf(contactID);
  let contactName = contacts[index].contact.name;
  updateContactNameFromTasks(allTasks, contactName, "editName");
  event.preventDefault();
  let name = document.getElementById("editName").value;
  let email = document.getElementById("editMail").value;
  let phone = document.getElementById("editPhone").value;
  let indexOfContact = contacts.findIndex((obj) => obj.id === contactID);
  let color = contacts[indexOfContact].contact.color;
  let updatedContact = {
    name: name,
    email: email,
    phone: phone,
    color: color,
  };
  putContacts(`contacts/${contactID}`, updatedContact)
    .then(() => {
      const index = contacts.findIndex((contact) => contact.id === contactID);
      if (index !== -1) {
        contacts[index].contact = updatedContact;
      }
      document.getElementById("edit-contact-popup").classList.add("d-none");
      loadContacts();
      showContactInfo(contacts[index]);
    })
    .catch((error) => {
      console.error("Error updating contact:", error);
    });
  for (let i = 0; i < affectedTaskIndices.length; i++) {
    const task = affectedTaskIndices[i];
    const taskIndex = affectedTaskIndexArray[i];
    await updateTaskAfterDeleteOrUpdatedContact(
      `/tasks/${task}`,
      data,
      taskIndex
    );
  }
}

/**
 * Updates the contact name in tasksArray from contactName to newNameOfContact.
 * @param {Array} tasksArray - The array of tasks.
 * @param {string} contactName - The current contact name.
 * @param {string} id - The id of the input element containing the new contact name.
 * @returns {Array} - The array of task ids that were affected by the contact name update.
 */
function updateContactNameFromTasks(tasksArray, contactName, id) {
  let newNameOfContact = document.getElementById(id).value;
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

/**
 * Updates the contacts data at the specified path.
 * @param {string} path - The path where the contacts data should be updated.
 * @param {Object} data - The data to be updated.
 * @returns {Promise<Object>} - A promise that resolves to the updated contacts data.
 * @throws {Error} - If the network response is not ok.
 */
async function putContacts(path = "", data = {}) {
  let response = await fetch(BASE_URL + path + ".json", {
    method: "PUT",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok" + response.statusText);
  }
  return await response.json();
}

/**
 * Generates the HTML template for editing a contact.
 * @param {Object} eachContact - The contact object to be edited.
 * @returns {string} - The HTML template for editing the contact.
 */
function getEditContactTemplate(eachContact) {
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
                    <input id="editName" class="add-contact-input-name" placeholder="Vor und Nachname" type="text" required>
                    <input id="editMail" class="add-contact-input-mail" placeholder="Email" type="email" required>
                    <input id="editPhone" class="add-contact-input-tel" placeholder="Phone" type="tel" required>
                    <div class="add-contact-form-buttons">
                    <button type="button" class="cancel" onclick= "closePopup()">Close<img src="img/x.svg" alt=""></button>
                    <button type="submit" class="create">Save<img src="img/check.png" alt=""></button>
                    </div>
                </form>
            </div>
        </div>`;
}

/**
 * Adds a contact by displaying a popup.
 */
function addContact() {
  document.getElementById("popup-content").classList.remove("animation-close");
  document.getElementById("popup-content").classList.add("animation");
  document.getElementById("add-contact-popup").classList.remove("d-none");
}

/**
 * Closes the popup and performs necessary animations and DOM manipulations.
 * @function closePopup
 * @returns {void}
 */
function closePopup() {
  checkForMobileMode();
  document.getElementById("popup-content").classList.remove("animation");
  document.getElementById("popup-content").classList.add("animation-close");
  setTimeout(() => {
    document.getElementById("add-contact-popup").classList.add("d-none");
  }, 300);
  if (document.getElementById("edit-contact-popup-content") != null) {
    document
      .getElementById("edit-contact-popup-content")
      .classList.remove("animation");
    document
      .getElementById("edit-contact-popup-content")
      .classList.add("animation-close");
    setTimeout(() => {
      document.getElementById("edit-contact-popup").classList.add("d-none");
    }, 300);
  }
  if (document.getElementById("edit-user-popup-content") != null) {
    document
      .getElementById("edit-user-popup-content")
      .classList.remove("animation");
    document
      .getElementById("edit-user-popup-content")
      .classList.add("animation-close");
    setTimeout(() => {
      document.getElementById("edit-user-popup").classList.add("d-none");
    }, 200);
  }
}

/**
 * Prevents the event from bubbling up the DOM tree.
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * Generates the template for a contact list element.
 * @param {Object} eachContact - The contact object.
 * @returns {string} - The HTML template for the contact list element.
 */
function getContactListTemplate(eachContact) {
  let initials = getContactsInitials(eachContact);
  let bgColor = eachContact.contact.color;
  return `
    <div id="contact-list-element-${
      eachContact.id
    }" class="contact" onclick='showContactInfo(${JSON.stringify(
    eachContact
  )})'>
        <div class="contact-logo" style="background-color: ${bgColor};" >${initials}</div>
        <div class="contact-name">
         <p>${eachContact.contact.name}</p>
         <a href="">${eachContact.contact.email}</a>
    </div>
    </div>`;
}

/**
 * Get the initials of a contact's name.
 * @param {Object} eachContact - The contact object.
 * @param {string} eachContact.contact.name - The full name of the contact.
 * @returns {string} The initials of the contact's name.
 */
function getContactsInitials(eachContact) {
  let fullname = eachContact.contact.name;
  let nameparts = fullname.split(" ");
  let initials = "";
  if (nameparts.length > 1) {
    initials =
      nameparts[0].charAt(0).toUpperCase() +
      nameparts[nameparts.length - 1].charAt(0).toUpperCase();
  } else if (nameparts.length === 1) {
    initials = nameparts[0].charAt(0).toUpperCase();
  }
  return initials;
}

/**
 * Returns the initials of a user based on their name and surname.
 * @returns {string} The initials of the user.
 */
function getUserInitials() {
  let nameparts = [user.name, user.surname];
  let initials = "";
  if (nameparts.length > 1) {
    initials =
      nameparts[0].charAt(0).toUpperCase() +
      nameparts[nameparts.length - 1].charAt(0).toUpperCase();
  } else if (nameparts.length === 1) {
    initials = nameparts[0].charAt(0).toUpperCase();
  }
  return initials;
}

/**
 * Returns the template for an ABC separator.
 */
function getABCSeparatorTemplate(letter) {
  return `<div class="abc-separator">
                <p>${letter}</p>
            </div>`;
}

/**
 * Checks for mobile mode and adjusts the display of contact list and contact info accordingly.
 */
function checkForMobileMode() {
  showMobileHeader();
  giveAnimations();
  let width = window.innerWidth;
  let contactList = document.getElementById("contact-list-responsive");
  let contactInfo = document.getElementById("contact-info");
  if (width <= 800 && isSelected === true) {
    contactList.style.display = "none";
    contactInfo.style.display = "block";
    contactInfo.style.width = "100%";
  } else if (width <= 800 && isSelected === false) {
    contactList.style.display = "block";
    contactInfo.style.display = "none";
    contactList.style.width = "100%";
  } else {
    contactInfo.style.display = "block";
    contactList.style.display = "block";
    contactInfo.style.width = "48%";
  }
}

/**
 * Applies animations to specific elements based on the width of the window.
 */
function giveAnimations() {
  let elements = [
    document.getElementById("animation-header"),
    document.getElementById("animation-title"),
    document.getElementById("animation-email-title"),
    document.getElementById("animation-email"),
    document.getElementById("animation-phone-title"),
    document.getElementById("animation-phone"),
  ];
  let width = window.innerWidth;

  elements.forEach((element) => {
    if (element) {
      if (width <= 800) {
        element.classList.remove("animation");
      } else {
        element.classList.add("animation");
      }
    }
  });
}

/**
 * Slides in the user feedback element.
 */
function userFeedbackSlideIn() {
  let feedback = document.getElementById("user-feedback");
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

/**
 * Function to navigate back to the contact list.
 * @returns {void}
 */
function backToList() {
  if (window.innerWidth <= 800) {
    isSelected = false;
    document.getElementById("contact-list-responsive").style.display = "block";
    document.getElementById("contact-info").style.display = "none";
    if (document.getElementById("edit-more-options") !== null) {
      document.getElementById("edit-more-options").style.display = "none";
    }
    document.querySelectorAll(".contact").forEach((element) => {
      element.style.backgroundColor = "";
      element.style.color = "";
    });
  }
  checkForMobileMode();
}

/**
 * Shows or hides the mobile header based on the window width.
 */
function showMobileHeader() {
  let header = document.getElementById("contact-header");
  let mobileHeader = document.getElementById("contact-mobile-header");
  if (window.innerWidth <= 1220) {
    header.classList.add("d-none");
    mobileHeader.style.display = "flex";
  } else {
    header.classList.remove("d-none");
    mobileHeader.style.display = "none";
  }
}

/**
 * Displays the contact information and highlights the selected contact.
 * @param {Object} eachContact - The contact object to display.
 */
function showContactInfo(eachContact) {
  isSelected = true;
  checkForMobileMode();
  document.querySelectorAll(".contact").forEach((element) => {
    element.style.backgroundColor = "";
    element.style.color = "";
  });
  document.getElementById(
    `contact-list-element-${eachContact.id}`
  ).style.background = "#2A3647";
  document.getElementById(
    `contact-list-element-${eachContact.id}`
  ).style.color = "white";
  showInfo(eachContact);
}

/**
 * Displays the contact information of a user and highlights the selected contact in the contact list.
 *
 * @param {object} user - The user object containing the contact information.
 */
function showUserContactInfo(user) {
  isSelected = true;
  checkForMobileMode();
  document.querySelectorAll(".contact").forEach((element) => {
    element.style.backgroundColor = "";
    element.style.color = "";
  });
  document.getElementById(
    `contact-list-element-${activeUserInContacts.id}`
  ).style.background = "#2A3647";
  document.getElementById(
    `contact-list-element-${activeUserInContacts.id}`
  ).style.color = "white";
  showUserInfo(user);
}

/**
 * Displays the contact information for a given contact.
 */
function showInfo(eachContact) {
  document.getElementById("contact-info").innerHTML =
    getEachContactInfo(eachContact);
  giveAnimations();
}

/**
 * Updates the contact information section with the user's contact info and applies animations.
 */
function showUserInfo(user) {
  document.getElementById("contact-info").innerHTML = getUserContactInfo(user);
  giveAnimations();
}

/**
 * Generates the contact information HTML for each contact.
 * @param {Object} eachContact - The contact object.
 * @returns {string} - The HTML string representing the contact information.
 */
function getEachContactInfo(eachContact) {
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
                            <div onclick='editContact(${JSON.stringify(
                              eachContact
                            )})' class="edit"><img src="/img/edit.png" alt=""><p>Edit</p></div>
                            <div onclick="deleteContacts('${
                              eachContact.id
                            }')" class="delete"><img src="/img/delete.png" alt=""><p>Delete</p></div>
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
                            <div onclick='editContact(${JSON.stringify(
                              eachContact
                            )})' class="edit" style="margin-bottom: 15px;"><img src="/img/edit.png" alt="" ><p>Edit</p></div>
                            <div onclick="deleteContacts('${
                              eachContact.id
                            }')" class="delete"><img src="/img/delete.png" alt=""><p>Delete</p></div>
                        </div></div>`;
}

/**
 * Retrieves the user's contact information.
 *
 * @returns {string} The HTML representation of the user's contact information.
 */
function getUserContactInfo() {
  let initials = getUserInitials();
  let contactName = user.name + " " + user.surname;
  let contactEmail = user.email;
  let contactPhone = user.phone;
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
                <div id="contact-data-logo" class="contact-data-logo" style="background-color: rgb(41, 171, 226);">${initials}</div>
                <div class="contact-data-name"><span>${contactName}</span> 
                        <div class="contact-data-icon">
                            <div onclick='editUserAsContact()' class="edit"><img src="/img/edit.png" alt=""><p>Edit</p></div>
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
                            <div onclick='editUserAsContact()' class="edit" style="margin-bottom: 15px;"><img src="/img/edit.png" alt="" ><p>Edit</p></div>
                        </div></div>`;
}

/**
 * Generates a random background color in RGB format.
 * @returns {string} The randomly generated background color in RGB format.
 */
function random_bg_color() {
  var x = Math.floor(Math.random() * 256);
  var y = Math.floor(Math.random() * 256);
  var z = Math.floor(Math.random() * 256);
  var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  return bgColor;
}

/**
 * Opens the edit options list by applying animation and changing the display style to flex.
 */
function openEditOptions() {
  document.getElementById("edit-more-options-list").style.animation =
    "300ms move-in";
  document.getElementById("edit-more-options-list").style.display = "flex";
}

/**
 * Closes the edit options list by hiding it with an animation.
 */
function closeEditOptions() {
  if (document.getElementById("edit-more-options-list") !== null) {
    document.getElementById("edit-more-options-list").style.animation =
      "300ms move-out";
    setTimeout(() => {
      if (document.getElementById("edit-more-options-list") !== null) {
        document.getElementById("edit-more-options-list").style.display =
          "none";
      }
    }, 300);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const mobileWidthPortrait = 768;
  const mobileHeightPortrait = 1024;

  const mobileWidthLandscape = 1024;
  const mobileHeightLandscape = 768;

  const maxMobileWidth = 932;

  /**
   * Checks the orientation of the device and shows a warning if it is in landscape mode and fits mobile dimensions.
   */
  function checkOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight;
    const isMobile = window.innerWidth <= maxMobileWidth;
    const isMobilePortrait =
      isMobile &&
      window.innerWidth <= mobileWidthPortrait &&
      window.innerHeight <= mobileHeightPortrait;
    const isMobileLandscape =
      isMobile &&
      window.innerWidth <= mobileWidthLandscape &&
      window.innerHeight <= mobileHeightLandscape;

    if (isLandscape && (isMobilePortrait || isMobileLandscape)) {
      document.getElementById("landscape-warning").classList.add("visible");
    } else {
      document.getElementById("landscape-warning").classList.remove("visible");
    }
  }

  checkOrientation();

  window.addEventListener("resize", checkOrientation);
  window.addEventListener("orientationchange", checkOrientation);
});
