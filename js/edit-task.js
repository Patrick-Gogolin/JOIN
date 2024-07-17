function editTask(id) {
    openEditTaskOverlayer2();
    closeEditTaskOverlay();
    let content = document.getElementById('edit-task-popup');
    let index = taskKeys.indexOf(id);
    let task = allTasks[index];
    content.innerHTML += /*html*/`
    <div class="popup-content">
        <div class="title-input-container">
                <span class="headline-input">Title<span class="red-star-required">*</span></span>
                <input id="title" type="text" value="${task.title}" required>
                <span id="title-required-span" class="this-field-required-span d-none">This field is required</span>
        </div>
    </div>`;
}