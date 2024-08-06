/**
 * Deletes a contact from the contacts list and performs additional actions.
 * @param {string} contactID - The ID of the contact to be deleted.
 * @returns {Promise<Object>} - A promise that resolves to the JSON response from the server.
 */
async function deleteContacts(contactID) {
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
  document.getElementById("contact-info").innerHTML = renderContactInfoSectionAfterDeleteContactHtml();
  await updateTaskInBoard();
  return await response.json();
}

/**
 * Updates tasks on the board based on the indices of affected tasks.
 * 
 * @returns {Promise<void>} A promise that resolves when all tasks have been updated.
 * 
 * @throws {Error} If there is an issue with the `updateTaskAfterDeleteOrUpdatedContact` function or if there is a problem with the task data or indices.
 * 
 */
async function updateTaskInBoard() {
  for (let i = 0; i < affectedTaskIndices.length; i++) {
    const task = affectedTaskIndices[i];
    const taskIndex = affectedTaskIndexArray[i];
    await updateTaskAfterDeleteOrUpdatedContact(`/tasks/${task}`,data,taskIndex);
  }
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
    assignedContactsColors: JSON.stringify(allTasks[i]["assignedContactsColors"]),
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
  getEditContactTemplate(eachContact);
  document.getElementById("editName").value = eachContact.contact.name;
  document.getElementById("editMail").value = eachContact.contact.email;
  document.getElementById("editPhone").value = eachContact.contact.phone;
  document.getElementById(`contact-logo-${eachContact}`).style.backgroundColor = eachContact.contact.color;
  document.getElementById("edit-contact-popup-content").classList.add("animation");
  document.getElementById("edit-contact-popup-content").classList.remove("animation-close");
}

/**
 * Edit the user as a contact.
 */
function editUserAsContact() {
  let userEmail = user.email;
  let userName = user.name + " " + user.surname;
  let userPhone = user.phone;
  document.getElementById("edit-user-popup").classList.remove("d-none");
  getEditUserTemplate();
  document.getElementById("editNameUser").value = userName;
  document.getElementById("editMailUser").value = userEmail;
  document.getElementById("editPhoneUser").value = userPhone;
  document.getElementById(`user-logo`).style.backgroundColor = "rgb(41,171,226)";
  document.getElementById("edit-user-popup-content").classList.add("animation");
  document.getElementById("edit-user-popup-content").classList.remove("animation-close");
}

/**
 * Returns the template for editing a user.
 * @returns {string} The HTML template for editing a user.
 */
function getEditUserTemplate() {
  let initials = getUserInitials();
  let template = renderEditUserTemplateHtml(initials, activeUserInContacts);
  document.getElementById('edit-user-popup').innerHTML = template;
}

/**
 * Submits the form for editing a user.
 * @async
 */
async function submitEditUserForm() {
let contactName = activeUserInContacts.contact.name;
updateContactNameFromTasks(allTasks, contactName, "editNameUser");
let { name, surname, email, phone } = getUserFormData();
let id = activeUserInContacts.id;
let password = activeUserInContacts.contact.password;
let data = createUserData(id, name, surname, email, phone, password);
updateUserDetailsInMemory(id, name, surname, email, phone, password);
localStorage.setItem("user", JSON.stringify(user));
document.getElementById("edit-user-popup").classList.add("d-none");
updateUserAndLoadData(id, data);
updateTasks(data);
}

/**
 * Retrieves user form data from the DOM.
 * @returns {Object} An object containing the user's name, surname, email, and phone.
 */
function getUserFormData() {
    let fullName = document.getElementById("editNameUser").value;
    let nameParts = fullName.split(" ");
    let name = nameParts[0];
    let surname = nameParts.slice(1).join(" ");
    let email = document.getElementById("editMailUser").value;
    let phone = document.getElementById("editPhoneUser").value;
  
    return { name, surname, email, phone };
  }

/**
 * Creates a user data object.
 *
 * @param {number} id - The user ID.
 * @param {string} name - The user's first name.
 * @param {string} surname - The user's last name.
 * @param {string} email - The user's email address.
 * @param {string} phone - The user's phone number.
 * @param {string} password - The user's password.
 * @returns {object} - The user data object.
 */
function createUserData(id, name, surname, email, phone, password) {
    return {
      id: id,
      name: name,
      surname: surname,
      email: email,
      phone: phone,
      password: password,
    };
  }

/**
 * Updates the user details in memory.
 *
 * @param {number} id - The user ID.
 * @param {string} name - The user's name.
 * @param {string} surname - The user's surname.
 * @param {string} email - The user's email.
 * @param {string} phone - The user's phone number.
 * @param {string} password - The user's password.
 */
function updateUserDetailsInMemory(id, name, surname, email, phone, password) {
    user.name = name;
    user.surname = surname;
    user.email = email;
    user.phone = phone;
    user.id = id;
    user.password = password;
  }
  
/**
 * Updates the user data and loads the updated data.
 * 
 * @param {string} id - The ID of the user to update.
 * @param {object} data - The updated user data.
 * @returns {Promise<void>} - A promise that resolves when the user data is updated and loaded.
 */
async function updateUserAndLoadData(id, data) {
    await updateUser(`/users/${activeUserInContacts.id}`, data);
    await loadUser("/users");
    showUserInfo(id);
    showUserInContacts();
    checkUserAndRedirect();
    init();
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
    event.preventDefault();
    let index = contactsKeys.indexOf(contactID);
    let contactName = contacts[index].contact.name;
    updateContactNameFromTasks(allTasks, contactName, "editName");
    let { name, email, phone } = getContactFormData();
    let color = getContactColor(contactID);
    let updatedContact = createUpdatedContact(name, email, phone, color);
    await updateContact(contactID, updatedContact);
    sortContactsAlphabetically();
    await updateTasks(data);
}

/**
 * Retrieves the contact form data from the input fields.
 * @returns {Object} An object containing the name, email, and phone of the contact.
 */
function getContactFormData() {
    let name = document.getElementById("editName").value;
    let email = document.getElementById("editMail").value;
    let phone = document.getElementById("editPhone").value;
    return { name, email, phone };
}

/**
 * Creates an updated contact object with the specified properties.
 *
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} color - The color associated with the contact.
 * @returns {object} - The updated contact object.
 */
function createUpdatedContact(name, email, phone, color) {
    return {
      name: name,
      email: email,
      phone: phone,
      color: color,
    };
}

/**
 * Retrieves the color of a contact based on the contact ID.
 * @param {number} contactID - The ID of the contact.
 * @returns {string} The color of the contact.
 */
function getContactColor(contactID) {
    let indexOfContact = contacts.findIndex((obj) => obj.id === contactID);
    return contacts[indexOfContact].contact.color;
}

/**
 * Updates a contact with the given contact ID and updated contact information.
 * @param {string} contactID - The ID of the contact to be updated.
 * @param {object} updatedContact - The updated contact information.
 * @returns {Promise<void>} - A promise that resolves when the contact is successfully updated.
 * @throws {Error} - If there is an error updating the contact.
 */
async function updateContact(contactID, updatedContact) {
    try {
      await putContacts(`contacts/${contactID}`, updatedContact);
      updateContactInMemory(contactID, updatedContact);
      document.getElementById("edit-contact-popup").classList.add("d-none");
      loadContacts();
      showContactInfo(contacts.find(contact => contact.id === contactID));
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  }

/**
 * Updates a contact in memory.
 * @param {string} contactID - The ID of the contact to be updated.
 * @param {object} updatedContact - The updated contact object.
 * @returns {void}
 */
function updateContactInMemory(contactID, updatedContact) {
    const index = contacts.findIndex((contact) => contact.id === contactID);
    if (index !== -1) {
      contacts[index].contact = updatedContact;
    }
}

/**
 * Updates tasks with the provided data.
 * @param {Object} data - The data to update the tasks with.
 * @returns {Promise<void>} - A promise that resolves when all tasks are updated.
 */
async function updateTasks(data) {
    for (let i = 0; i < affectedTaskIndices.length; i++) {
      const task = affectedTaskIndices[i];
      const taskIndex = affectedTaskIndexArray[i];
      await updateTaskAfterDeleteOrUpdatedContact(`/tasks/${task}`, data, taskIndex);
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
    }});
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
  let template = renderEditContactTemplateHtml(eachContact, initials);
  document.getElementById('edit-contact-popup').innerHTML = template;
}

/**
 * Adds a contact by displaying a popup.
 */
function addContact() {
  document.getElementById("popup-content").classList.remove("animation-close");
  document.getElementById("popup-content").classList.add("animation");
  document.getElementById("add-contact-popup").classList.remove("d-none");
}