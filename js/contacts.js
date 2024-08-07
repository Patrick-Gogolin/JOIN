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
    userElementInContacts.innerHTML = renderUserInfoHtml(activeUserInContacts, userColor, userInitials, userName, userEmail);
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
  let combinedArray = contacts.map((contact, index) => {
    return {
      contact: contact,
      key: contactsKeys[index],
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

  contacts = combinedArray.map((item) => item.contact);
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
  contactListElement.innerHTML = renderUserContainerHtml();
  let currentInitial = "";
  for (let index = 0; index < contacts.length; index++) {
    let eachContact = contacts[index];
    let contactInitial = eachContact.contact.name.charAt(0).toUpperCase();
    if (contactInitial !== currentInitial) {
    currentInitial = contactInitial;
    contactListElement.innerHTML += getABCSeparatorTemplate(currentInitial);}
    contactListElement.innerHTML += getContactListTemplate(eachContact);
    getContactsInitials(eachContact);
    random_bg_color(eachContact);
    showUserInContacts();}
  return (responseToJson = await response.json());
}

/**
 * Loads user data from a specified path.
 * @param {string} path - The path to the user data.
 * @returns {Promise<void>} - A promise that resolves when the user data is loaded.
 */
async function loadUser(path = "") {
  let userName = user.name + " " + user.surname;
  let password = user.password;
  let response = await fetch(BASE_URL + path + ".json");
  let responseToJson = await response.json();
  let keys = Object.keys(responseToJson);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const userData = responseToJson[key];
    if (userData.name === user.name && userData.email === user.email && user.name !== "Guest") {
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
  let response = await postRequest(path, data);
  let newContact = await response.json();
  contacts.push({
    id: newContact.name,
    contact: data,
  });
  contactsKeys.push(newContact.name);
  resetAndCloseAddContactPopUp(name, email, phone, newContact, data);
}

/**
 * Sends a POST request to the specified path with the provided data.
 * 
 * @param {string} path - The endpoint path to send the request to.
 * @param {Object} data - The data to send in the request body.
 * @returns {Promise<Response>} The response from the fetch request.
 */
async function postRequest(path, data) {
  const response = await fetch(BASE_URL + path + ".json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}

/**
 * Resets the input fields, closes the add contact popup, and performs necessary updates.
 * 
 * @param {HTMLInputElement} name - The input element for the contact's name.
 * @param {HTMLInputElement} email - The input element for the contact's email.
 * @param {HTMLInputElement} phone - The input element for the contact's phone.
 * @param {Object} newContact - The newly created contact object.
 * @param {Object} data - The data of the new contact.
 * @returns {Object} The new contact object.
 */
async function resetAndCloseAddContactPopUp(name, email, phone, newContact, data) {
  await loadContacts("/contacts");
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
 * Generates the template for a contact list element.
 * @param {Object} eachContact - The contact object.
 * @returns {string} - The HTML template for the contact list element.
 */
function getContactListTemplate(eachContact) {
  let initials = getContactsInitials(eachContact);
  let bgColor = eachContact.contact.color;
  let template = renderGetContactListTemplateHtml(eachContact, bgColor, initials);
  return template;
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
    initials = nameparts[0].charAt(0).toUpperCase() + nameparts[nameparts.length - 1].charAt(0).toUpperCase();
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
  let template = renderGetABCSeparatorTemplateHtml(letter);
  return template;
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
  document.getElementById(`contact-list-element-${eachContact.id}`).style.background = "#2A3647";
  document.getElementById(`contact-list-element-${eachContact.id}`).style.color = "white";
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
  document.getElementById(`contact-list-element-${activeUserInContacts.id}`).style.background = "#2A3647";
  document.getElementById(`contact-list-element-${activeUserInContacts.id}`).style.color = "white";
  showUserInfo(user);
}

/**
 * Displays the contact information for a given contact.
 */
function showInfo(eachContact) {
  getEachContactInfo(eachContact);
  giveAnimations();
}

/**
 * Updates the contact information section with the user's contact info and applies animations.
 */
function showUserInfo(user) {
  getUserContactInfo(user);
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
  let template = renderGetEachContactInfoHtml(actualBgColor, initials, eachContact, contactEmail, contactPhone, contactName);
  document.getElementById("contact-info").innerHTML = template;
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
  let template = renderGetUserInfoHtml(initials, contactName, contactPhone, contactEmail);
  document.getElementById("contact-info").innerHTML = template;
}

/**
 * Event Listener: DOMContentLoaded
 *
 * Sets up an event listener for the email input field to validate the email domain.
 * This event listener waits for the DOM content to be fully loaded, then checks if the email input field exists.
 * If it exists, it attaches an 'input' event listener to the input field. When the user types in the email field,
 * the email address is validated to ensure it ends with `.de` or `.com`. If the email address does not match the
 * required format, a custom validity message is set. If it matches, the custom validity message is cleared.
 *
 * @param {Event} event - The event object.
 */
document.addEventListener('DOMContentLoaded', (event) => {
  const emailInput = document.getElementById('mail');
  emailInput.addEventListener('input', function(event) {
      const emailValue = emailInput.value;
      const regex = /^[^\s@]+@[^\s@]+\.(de|ch|com|uk|fr)$/;
      
      if (!regex.test(emailValue)) {
          emailInput.setCustomValidity('Please use a valid e-mail domain.');
      } else {
          emailInput.setCustomValidity('');
      }
  });
});