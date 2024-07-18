function OpenEditTaskWindow(id) {
    openEditTaskOverlayer('edit-task-popup');
    closeEditTaskOverlay('edit-task-overlayer');
    let content = document.getElementById('edit-task-popup');
    let index = taskKeys.indexOf(id);
    let task = allTasks[index];
    emptyTask = task;
    console.log(emptyTask);
    content.innerHTML = /*html*/`
    <div class="popup-content-edit-task">
        <img onclick="closeEditTaskOverlay('edit-task-popup')" class="close-overlayer-sign-edit-task" src="/img/x.png" alt="Cross">
        <div class="title-input-container">
                <span class="headline-input">Title<span class="red-star-required">*</span></span>
                <input id="title-edit-task" type="text" value="${task.title}" required>
                <span id="title-required-span-edit-task" class="this-field-required-span d-none">This field is required</span>
        </div>
        <div class="description-input-container">
        <span class="headline-input">Description</span>
        <textarea id="description-of-task-edit-task" class="task-description-textarea" name="" id="">${task.description}</textarea>
        </div>
        <div class="date-container">
            <span class="headline-input">Due Date<span class="red-star-required">*</span></span>
            <input id="date-edit-task" type="date" value=${task.deadline} required>
            <span id="date-required-span-edit-task" class="this-field-required-span d-none">This field is required</span>
        </div>
        <div class="priority-container">
            <span class="headline-input">Prio</span>
            <div class="priority-button-container">
                <button onclick="urgentPriority('urgent-button-edit-task', 'urgent-prio-sign-edit-task')" id="urgent-button-edit-task" class="urgent-button">Urgent <img id="urgent-prio-sign-edit-task" src="img/urgent-prio.svg" alt=""></button>
                <button onclick="mediumPriority('medium-button-edit-task', 'medium-prio-sign-edit-task')" id="medium-button-edit-task" class="medium-button">Medium <img id="medium-prio-sign-edit-task" src="img/medium-prio-orange.svg" alt=""></button>
                <button onclick="lowPriority()" id="low-button-edit-task" class="low-button">Low <img id="low-prio-sign-edit-task" src="img/low-prio.svg" alt=""></button>
            </div>
        </div>
        <div class="assigned-to-input-container">
                            <span class="headline-input">Category<span class="red-star-required">*</span></span>
                            <div class="select-contacts-container" id="select-contacts-container">
                                <span id="selected-task-headline">Select task category</span>
                                <img onclick="openSelectCategoryContainer()" src="img/arrow-drop-down-contacts.svg"
                                    alt="">
                            </div>
                            <span id="category-required-span" class="this-field-required-span d-none">This field is
                                required</span>
                            <div id="choose-category-container" class="choose-category-container d-none">
                                <div onclick="selectCategory('select-category-technical-task-span', 'selected-task-headline')"
                                    class="category-to-select-container" id="select-category-technical-task">
                                    <span id="select-category-technical-task-span">Technical Task</span>
                                </div>
                                <div onclick="selectCategory('select-category-user-story-span', 'selected-task-headline')"
                                    class="category-to-select-container" id="select-category-user-story">
                                    <span id="select-category-user-story-span">User Story</span>
                                </div>
                            </div>
                            <span id="category-required-span" class="this-field-required-span d-none">This field is
                                required</span>
                        </div>
        <div class="assigned-to-input-container">
            <span class="headline-input">Assigned to</span>
            <div class="select-contacts-container">
                <input onkeyup="searchContacts()" id="search-contact-inputfield" type="text" placeholder="Select contacts to assign">
                <img onclick="openSelectContactsContainer()" src="img/arrow-drop-down-contacts.svg" alt="">
            </div>
            <div id="choose-contacts-container-edit-task" class="choose-contacts-container d-none">
                <div id="active-user-container-edit-task" class="d-none">
                </div>
                <div class="contacts-to-select-container" id="select-contact-container">
                </div>
            </div>
        </div>
        <div id="show-assigned-contacts-edit-task" class="show-assigned-contacts">
        </div>
        <div class="subtask-area-container">
            <div class="add-subtask-container">
                <span class="headline-input">Subtask</span>
                <div class="add-subtask-input-container">
                    <input id="add-subtask-input-container-inputfield" oninput="changeIcons()" type="text" placeholder="Add new subtask">
                    <div id="add-subtask-svg-container" class="add-subtask-svg-container">
                        <img id="add-subtask-svg" class="add-subtask-svg" src="img/addsubtask.svg" alt="">
                    </div>
                    <div id="cancel-or-confirm-subtask-container" class="cancel-or-confirm-subtask-container d-none">
                        <img onclick="clearSubtask()" src="img/cancel.svg" alt="">
                        <div class="seperator"></div>
                        <img onclick="addSubtask()" src="img/check-grey.svg" alt="">
                    </div>
                </div>
            </div>
            <div id="added-subtask-main-container" class="added-subtask-main-container">
            </div>
        </div>
    </div>`;
}