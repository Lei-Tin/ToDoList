let inputField = document.getElementById("input-task");
let addTaskButton = document.getElementById("add-task-button");

// Disabling the button at the start
addTaskButton.disabled = true;

function validateInput() {
    if (inputField.value.length > 0) {
        addTaskButton.disabled = false;
        addTaskButton.style.backgroundColor = "rgba(100, 149, 237, 1)";
        addTaskButton.style.cursor = "pointer";
    } else {
        addTaskButton.disabled = true;
        addTaskButton.style.backgroundColor = "rgba(100, 149, 237, 0.5)";
        addTaskButton.style.cursor = "not-allowed";
    }
}

addTaskButton.addEventListener('mouseover', () => {
    if (inputField.value.length > 0) {
        addTaskButton.style.backgroundColor = "rgba(100, 149, 237, 0.75)";
    }
})

addTaskButton.addEventListener('mouseleave', () => {
    if (inputField.value.length > 0) {
        addTaskButton.style.backgroundColor = "rgba(100, 149, 237, 1)";
    }
})

inputField.addEventListener('input', validateInput);

let taskList = document.getElementById("task-list");

function addTask() {
    const li = document.createElement('li');

    const item = inputField.value;

    const input = document.createElement('input');
    input.setAttribute('onclick', 'strikeThrough(this)')
    input.setAttribute('class', 'task-checkbox');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('aria-label', 'Checkbox for item');

    li.appendChild(input);

    const span = document.createElement('span');
    span.setAttribute('class', 'task');
    span.appendChild(document.createTextNode(`${item}`));

    li.appendChild(span);

    const button = document.createElement('button');
    button.setAttribute('class', 'delete-btn');
    button.setAttribute('onclick', 'deleteTask(this)');

    li.appendChild(button)

    taskList.appendChild(li);

    inputField.value = '';
    validateInput();
}

function deleteTask(btnItem) {
    // After some testing, I realized that btnItem.parentNode gives me the list item
    btnItem.parentNode.remove();
}

function strikeThrough(checkBoxItem) {
    if (checkBoxItem.checked) {
        checkBoxItem.nextSibling.classList.add('strike-through')
    } else {
        checkBoxItem.nextSibling.classList.remove('strike-through')
    }
}

addTaskButton.addEventListener('click', addTask)
