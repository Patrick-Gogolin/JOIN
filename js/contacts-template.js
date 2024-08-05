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