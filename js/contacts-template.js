function renderContactInfoSectionAfterDeleteContactHtml() {
    return /*html*/`
    <div class="contact-info-header">
      <div onclick="backToList()" class="back_img_boarder">
      <img src="img/arrow-left-line.png" alt="">
    </div>
      <h1>Contacts</h1>
      <div class="contact-info-header-separator"></div>
      <span>Better with a team</span>
      <div class="contact-info-header-separator-mobile"></div>
      </div>`;
}

function renderEditUserTemplateHtml(initials, activeUserInContacts) {
    return /*html*/`
    <div id="edit-user-popup-content" class="popup-content animation" onclick="doNotClose(event)">
              <div class="popup-left">
                  <div onclick="closePopup()" class="back-icon-white-boarder"><img class="back-icon-white" src="img/close_white.png" alt=""></div>
                  <img class="join-logo" src="img/capa_2.png" alt="">
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

function renderEditContactTemplateHtml(eachContact, initials) {
    return /*html*/`
    <div id="edit-contact-popup-content" class="popup-content animation" onclick="doNotClose(event)">
              <div class="popup-left">
                  <div onclick="closePopup()" class="back-icon-white-boarder"><img class="back-icon-white" src="img/close_white.png" alt=""></div>
                  <img class="join-logo" src="img/capa_2.png" alt="">
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

function renderUserInfoHtml(activeUserInContacts, userColor, userInitials, userName, userEmail) {
    return /*html*/`
    <div id="contact-list-element-${activeUserInContacts.id}" class="contact user-contact-element" onclick="showUserContactInfo()">
        <div class="contact-logo" style="background-color: ${userColor};" >${userInitials}</div>
        <div class="contact-name">
            <p>${userName} <span><small>(YOU)</small></span></p>
            <a href="">${userEmail}</a>
        </div>
    </div>`;
}

function renderUserContainerHtml() {
    return /*html*/`
    <div class="user-contact" id="user-contact"></div>`;
}

function renderGetUserInfoHtml(initials, contactName, contactPhone, contactEmail) {
    return /*html*/`
        <div class="contact-info-header">
                <div onclick="backToList()" class="back_img_boarder">
                    <img src="img/arrow-left-line.png" alt="">
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
                            <div onclick='editUserAsContact()' class="edit"><img src="img/edit.png" alt=""><p>Edit</p></div>
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
                    <img src="img/more_vert.png" alt="">
                </div>
                <div onclick="doNotClose(event)" id="edit-more-options-list" class="more_options">
                <div class="more_options_icon" >
                            <div onclick='editUserAsContact()' class="edit" style="margin-bottom: 15px;"><img src="img/edit.png" alt="" ><p>Edit</p></div>
                        </div></div>`;
}

function renderGetEachContactInfoHtml(actualBgColor, initials, eachContact, contactEmail, contactPhone, contactName) {
    return /*html*/`
      <div class="contact-info-header">
    <div onclick="backToList()" class="back_img_boarder">
        <img src="img/arrow-left-line.png" alt="">
    </div>
    <h1>Contacts</h1>
    <div class="contact-info-header-separator"></div>
    <span>Better with a team</span>
    <div class="contact-info-header-separator-mobile"></div>
</div>

<div id="animation-header" class="contact-data">
    <div id="contact-data-logo" class="contact-data-logo" style="background: ${actualBgColor};">
        ${initials}
    </div>
    <div class="contact-data-name">
        <span>${contactName}</span>
        <div class="contact-data-icon">
            <div onclick='editContact(${JSON.stringify(eachContact)})' class="edit">
                <img src="img/edit.png" alt="">
                <p>Edit</p>
            </div>
            <div onclick="deleteContacts('${eachContact.id}')" class="delete">
                <img src="img/delete.png" alt="">
                <p>Delete</p>
            </div>
        </div>
    </div>
</div>

<h2 id="animation-title">Contact Information</h2>
<h3 id="animation-email-title">Email</h3>
<a id="animation-email" href="">${contactEmail}</a>
<h3 id="animation-phone-title">Phone</h3>
<p id="animation-phone" class="tel-number">${contactPhone}</p>

<div onclick='openEditOptions(); doNotClose(event)' id="edit-more-options" class="more_img_boarder">
    <img src="img/more_vert.png" alt="">
</div>

<div onclick="doNotClose(event)" id="edit-more-options-list" class="more_options">
    <div class="more_options_icon">
        <div onclick='editContact(${JSON.stringify(eachContact)})' class="edit" style="margin-bottom: 15px;">
            <img src="img/edit.png" alt="">
            <p>Edit</p>
        </div>
        <div onclick="deleteContacts('${eachContact.id}')" class="delete">
            <img src="img/delete.png" alt="">
            <p>Delete</p>
        </div>
    </div>
</div>`;
}

function renderGetContactListTemplateHtml(eachContact, bgColor, initials) {
    return /*html*/`
     <div id="contact-list-element-${eachContact.id}" class="contact" onclick='showContactInfo(${JSON.stringify(eachContact)})'>
        <div class="contact-logo" style="background-color: ${bgColor};" >${initials}</div>
        <div class="contact-name">
         <p>${eachContact.contact.name}</p>
         <a href="">${eachContact.contact.email}</a>
    </div>
    </div>`;
    }

function renderGetABCSeparatorTemplateHtml(letter) {
    return /*html*/`
    <div class="abc-separator">
        <p>${letter}</p>
    </div>`;
}

