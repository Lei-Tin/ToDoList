let inputField = document.getElementById("input-task");
let addTaskButton = document.getElementById("add-task-button");
let taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let tasksChecked = JSON.parse(localStorage.getItem("tasksChecked")) || [];

// On load page, we need to add all the tasks in the current storage
tasks.forEach(item => {
    addTask(item)
});

// Disabling the button at the start
addTaskButton.disabled = true;

// Some animations of the buttons
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

addTaskButton.addEventListener('click', addTask);

inputField.addEventListener('input', validateInput);

function validateInput() {
    if (inputField.value.length > 0  && !tasks.includes(inputField.value)) {
        addTaskButton.disabled = false;
        addTaskButton.style.backgroundColor = "rgba(100, 149, 237, 1)";
        addTaskButton.style.cursor = "pointer";
    } else {
        addTaskButton.disabled = true;
        addTaskButton.style.backgroundColor = "rgba(100, 149, 237, 0.5)";
        addTaskButton.style.cursor = "not-allowed";
    }
}

function addTask(inputTask) {
    const li = document.createElement('li');

    // This sets the item that we want to add
    // If we are adding using the button, the input field must not be empty
    let item;

    if (inputField.value) {
        // This means it is not empty
        item = inputField.value;
    } else {
        item = inputTask;
    }

    const input = document.createElement('input');
    input.setAttribute('onclick', 'strikeThrough(this)')
    input.setAttribute('class', 'task-checkbox');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('aria-label', 'Checkbox for item');

    let index = tasks.indexOf(item);
    // Checking if we need to set the item's checkbox to checked
    if (tasksChecked[index]) {
        input.checked = true;
    }

    li.appendChild(input);

    const span = document.createElement('span');
    span.setAttribute('class', 'task');
    span.appendChild(document.createTextNode(`${item}`));

    // Checking if we need to add strikethrough
    if (tasksChecked[index]) {
        span.classList.add('strike-through');
    }

    li.appendChild(span);

    const button = document.createElement('button');
    button.setAttribute('class', 'delete-btn');
    button.setAttribute('onclick', 'deleteTask(this)');

    li.appendChild(button)

    taskList.appendChild(li);

    // We only want to push items to the local storage if we added it
    if (inputField.value) {
        // Adding the task to the taskList in the local storage
        tasks.push(item);
        // Initially, the task should not be completed, so we add a 0
        tasksChecked.push(0);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        localStorage.setItem("tasksChecked", JSON.stringify(tasksChecked));
    }

    // If we are adding the item by the local storage, we do not do anything

    // Resetting the button
    inputField.value = '';
    validateInput();
}

function deleteTask(btnItem) {
    // After some testing, I realized that btnItem.parentNode gives me the list item
    btnItem.parentNode.remove();
    let item = btnItem.previousSibling.textContent;

    // Remove the task in the taskList in the local storage
    let index = tasks.indexOf(item);

    tasks.splice(index, 1);
    tasksChecked.splice(index, 1);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("tasksChecked", JSON.stringify(tasksChecked));

    // After delete, the duplicate task can be added again
    validateInput();
}

function strikeThrough(checkBoxItem) {
    let task = checkBoxItem.nextSibling;
    let index = tasks.indexOf(task.textContent);

    if (checkBoxItem.checked) {
        tasksChecked[index] = 1;
        task.classList.add('strike-through');
    } else {
        tasksChecked[index] = 0;
        task.classList.remove('strike-through');
    }
    // Update tasksChecked list
    localStorage.setItem("tasksChecked", JSON.stringify(tasksChecked));
}
