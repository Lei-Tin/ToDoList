let inputField = document.getElementById("input-task");
let addTaskButton = document.getElementById("add-task-button");

// Disabling the button at the start
// addTaskButton.disabled = true;

function validateInput(event) {
    if (inputField.value.length > 0) {
        // addTaskButton.disabled = false;
        addTaskButton.style.backgroundColor = "rgba(100, 149, 237, 1)";
        addTaskButton.style.cursor = "pointer";
    } else {
        // addTaskButton.disabled = true;
        addTaskButton.style.backgroundColor = "rgba(100, 149, 237, 0.5)";
        addTaskButton.style.cursor = "not-allowed";
    }
}

addTaskButton.addEventListener('mouseover', event => {
    if (inputField.value.length > 0) {
        addTaskButton.style.backgroundColor = "rgba(100, 149, 237, 0.75)";
    }
})

addTaskButton.addEventListener('mouseleave', event => {
    if (inputField.value.length > 0) {
        addTaskButton.style.backgroundColor = "rgba(100, 149, 237, 1)";
    }
})

inputField.addEventListener('input', validateInput);

let taskList = document.getElementById("task-list");

function addTask(event) {
    const li = document.createElement('li');

    const item = inputField.value;

    const input = document.createElement('input');
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
    validateInput(null);
}

function deleteTask(btnItem) {
    // After some testing, I realized that btnItem.parentNode gives me the list item
    btnItem.parentNode.remove();
}

addTaskButton.addEventListener('click', addTask)
