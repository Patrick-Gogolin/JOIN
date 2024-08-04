/**
 * Toggles the urgency priority state and updates the UI accordingly.
 *
 * This function switches the urgency priority state between active and inactive. When the urgency is activated,
 * the button representing the urgency priority is visually highlighted, and an appropriate icon is displayed.
 * When deactivated, the button returns to its normal state, and the icon is updated to reflect the non-urgent state.
 * The function also updates the global `priority` variable to reflect the current urgency state and toggles 
 * the `urgentActive` flag to indicate whether the urgency is currently active.
 *
 */
function urgentPriority() {
    let urgentButton = document.getElementById('urgent-button');
    let urgentPrioSign = document.getElementById('urgent-prio-sign');

    if (!urgentActive) {
        resetButtons();
        urgentButton.classList.add('urgent');
        urgentPrioSign.src = 'img/urgent-prio-white.svg';
        priority = urgentButton.innerText;
    } else {
        urgentButton.classList.remove('urgent');
        urgentPrioSign.src = 'img/urgent-prio.svg';
        priority = "";
    }

    urgentActive = !urgentActive;
}

/**
 * Toggles the medium priority state and updates the UI accordingly.
 *
 * This function switches the medium priority state between active and inactive. When the medium priority is activated,
 * the button representing the medium priority is visually highlighted with a specific style, and an appropriate icon is displayed.
 * When deactivated, the button returns to its normal state, and the icon is updated to reflect the non-active medium priority.
 * The function also updates the global `priority` variable to reflect the current medium priority state and toggles 
 * the `mediumActive` flag to indicate whether the medium priority is currently active.
 * 
 */
function mediumPriority() {
    let mediumButton = document.getElementById('medium-button');
    let mediumPrioSign = document.getElementById('medium-prio-sign');

    if (!mediumActive) {
        resetButtons();
        mediumButton.classList.add('medium');
        mediumPrioSign.src = 'img/medium-prio.svg';
        priority = mediumButton.innerText;
    } else {
        mediumButton.classList.remove('medium');
        mediumPrioSign.src = 'img/medium-prio-orange.svg';
        priority = "";
    }

    mediumActive = !mediumActive;
}

/**
 * Toggles the low priority state and updates the UI accordingly.
 *
 * This function switches the low priority state between active and inactive. When the low priority is activated,
 * the button representing the low priority is visually highlighted with a specific style, and an appropriate icon is displayed.
 * When deactivated, the button returns to its normal state, and the icon is updated to reflect the non-active low priority.
 * The function also updates the global `priority` variable to reflect the current low priority state and toggles 
 * the `lowActive` flag to indicate whether the low priority is currently active.
 *
 */
function lowPriority() {
    let lowButton = document.getElementById('low-button');
    let lowPrioSign = document.getElementById('low-prio-sign');

    if (!lowActive) {
        resetButtons();
        lowButton.classList.add('low');
        lowPrioSign.src = 'img/low-prio-white.svg';
        priority = lowButton.innerText;
    } else {
        lowButton.classList.remove('low');
        lowPrioSign.src = 'img/low-prio.svg';
        priority = "";
    }

    lowActive = !lowActive;
}
/**
 * Resets the priority buttons to their default states.
 *
 * This function clears the current priority setting by setting the global `priority` variable to an empty string.
 * It then calls specific functions to reset each priority button (urgent, medium, low) to their default visual states.
 * This ensures that all priority buttons are visually reset and no priority is selected.
 *
 */
function resetButtons() {
    priority = "";
    resetUrgentButton();
    resetMediumButton();
    resetLowButton();
}

/**
 * Resets the urgent priority button to its default visual state.
 *
 * This function removes the 'urgent' class from the urgent priority button element,
 * visually deactivating the urgent priority. It also changes the icon source of the priority sign
 * to its default image. Additionally, it sets the `urgentActive` flag to `false`, indicating that the
 * urgent priority is not currently active.
 * 
 */
function resetUrgentButton() {
    let urgentButton = document.getElementById('urgent-button');
    let urgentPrioSign = document.getElementById('urgent-prio-sign');
    urgentButton.classList.remove('urgent');
    urgentPrioSign.src = 'img/urgent-prio.svg';
    urgentActive = false;
}

/**
 * Resets the medium priority button to its default visual state.
 *
 * This function removes the 'medium' class from the medium priority button element, 
 * which visually deactivates the medium priority. It also changes the icon source of the priority sign 
 * to its default image. Additionally, it sets the `mediumActive` flag to `false`, indicating that the 
 * medium priority is not currently active.
 *
 */
function resetMediumButton() {
    let mediumButton = document.getElementById('medium-button');
    let mediumPrioSign = document.getElementById('medium-prio-sign');
    mediumButton.classList.remove('medium');
    mediumPrioSign.src = 'img/medium-prio-orange.svg';
    mediumActive = false;
}

/**
 * Resets the low priority button to its default visual state.
 *
 * This function removes the 'low' class from the low priority button element,
 * visually deactivating the low priority. It also changes the icon source of the priority sign
 * to its default image. Additionally, it sets the `lowActive` flag to `false`, indicating that the
 * low priority is not currently active.
 * 
 */
function resetLowButton() {
    let lowButton = document.getElementById('low-button');
    let lowPrioSign = document.getElementById('low-prio-sign');
    lowButton.classList.remove('low');
    lowPrioSign.src = 'img/low-prio.svg';
    lowActive = false;
}