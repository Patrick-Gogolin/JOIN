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

function resetButtons() {
    priority = "";
    resetUrgentButton();
    resetMediumButton();
    resetLowButton();
}

function resetUrgentButton() {
    let urgentButton = document.getElementById('urgent-button');
    let urgentPrioSign = document.getElementById('urgent-prio-sign');
    urgentButton.classList.remove('urgent');
    urgentPrioSign.src = 'img/urgent-prio.svg';
    urgentActive = false;
}

function resetMediumButton() {
    let mediumButton = document.getElementById('medium-button');
    let mediumPrioSign = document.getElementById('medium-prio-sign');
    mediumButton.classList.remove('medium');
    mediumPrioSign.src = 'img/medium-prio-orange.svg';
    mediumActive = false;
}

function resetLowButton() {
    let lowButton = document.getElementById('low-button');
    let lowPrioSign = document.getElementById('low-prio-sign');
    lowButton.classList.remove('low');
    lowPrioSign.src = 'img/low-prio.svg';
    lowActive = false;
}