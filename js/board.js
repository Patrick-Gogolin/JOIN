let urgentActive = false; // für Die Buttons beim Addtask Formular
let mediumActive = false;
let lowActive = false;

function openAddTaskOverlayer() {
    document.getElementById('overlayer').classList.remove('d-none');
}

function closeOverlayer() {
    document.getElementById('overlayer').classList.add('d-none');

}

// vorübergehende Funktion zum Überprüfen der benötigen Inputfelder
function addTask() {
    let title = document.getElementById('title');
    let date = document.getElementById('date');
    let category = document.getElementById('category');
    let titleRequiredSpan = document.getElementById('title-required-span');
    let dateRequiredSpan = document.getElementById('date-required-span');
    let categoryRequiredSpan = document.getElementById('category-required-span');
    
    let hasError = false;

    if (checkField(title, titleRequiredSpan))
        {
            hasError = true;
        }
    if (checkField(date, dateRequiredSpan))
        {
            hasError = true;
        }
    if (checkField(category, categoryRequiredSpan))
        {
            hasError = true;
        }
}

function checkField(field, requiredSpan) {
    if (field.value === '') {
        field.classList.add('this-field-required-border');
        requiredSpan.classList.remove('d-none');
        return true;
    } else {
        requiredSpan.classList.add('d-none');
        field.classList.remove('this-field-required-border')
        return false;
    }
}

function urgentPriority () {
    let urgentButton = document.getElementById('urgent-button');
    let urgentPrioSign = document.getElementById('urgent-prio-sign');
    if(urgentActive === false){
        urgentButton.classList.add('urgent');
        urgentPrioSign.src= 'img/urgent-prio-white.svg';
        urgentActive = true;
    }else{
        urgentButton.classList.remove('urgent');
        urgentPrioSign.src= 'img/urgent-prio.svg';
        urgentActive = false;
    }
}

function mediumPriority () {
    let mediumButton = document.getElementById('medium-button');
    let mediumPrioSign = document.getElementById('medium-prio-sign');
    if(mediumActive === false){
        mediumButton.classList.add('medium');
        mediumPrioSign.src= 'img/medium-prio.svg';
        mediumActive = true;
    }else{
        mediumButton.classList.remove('medium');
        mediumPrioSign.src= 'img/medium-prio-orange.svg';
        mediumActive = false;
    }
}

function lowPriority () {
    let lowButton = document.getElementById('low-button');
    let lowPrioSign = document.getElementById('low-prio-sign');
    if(lowActive === false){
        lowButton.classList.add('low');
        lowPrioSign.src= 'img/low-prio-white.svg';
        lowActive = true;
    }else{
        lowButton.classList.remove('low');
        lowPrioSign.src= 'img/low-prio.svg';
        lowActive = false;
    }
}
