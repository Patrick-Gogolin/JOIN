


/**
 * Closes the popup and performs necessary animations and DOM manipulations.
 * @function closePopup
 * @returns {void}
 */
function closePopup() {
  checkForMobileMode();
  document.getElementById("popup-content").classList.remove("animation");
  document.getElementById("popup-content").classList.add("animation-close");
  setTimeout(() => {document.getElementById("add-contact-popup").classList.add("d-none");}, 300);
  if (document.getElementById("edit-contact-popup-content") != null) {
    document.getElementById("edit-contact-popup-content").classList.remove("animation");
    document.getElementById("edit-contact-popup-content").classList.add("animation-close");
    setTimeout(() => {document.getElementById("edit-contact-popup").classList.add("d-none");}, 300);
  }
  if (document.getElementById("edit-user-popup-content") != null) {
    document.getElementById("edit-user-popup-content").classList.remove("animation");
    document.getElementById("edit-user-popup-content").classList.add("animation-close");
    setTimeout(() => {document.getElementById("edit-user-popup").classList.add("d-none");}, 200);
  }
}


/**
 * Prevents the event from bubbling up the DOM tree.
 */
function doNotClose(event) {
  event.stopPropagation();
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
    }}
  checkOrientation();
  window.addEventListener("resize", checkOrientation);
  window.addEventListener("orientationchange", checkOrientation);
});
