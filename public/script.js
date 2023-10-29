
const tasks = [];

// Function to add a new task
function addTask(taskName) {
    const task = {
        id: Date.now(), // Unique ID (you can use libraries for this)
        name: taskName,
        state: 'pending', // Possible values: 'pending', 'completed', 'deleted'
    };
    tasks.push(task);
    saveTasks();
    return task;
}

// Function to render tasks in the HTML
function renderTasks() {
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');
    const deletedTasksList = document.getElementById('deleted-tasks');

    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';
    deletedTasksList.innerHTML = '';

    tasks.forEach((task) => {
        const taskItem = document.createElement('li');
        taskItem.className = `task ${task.state}-task`;

        if (task.state === 'completed') {
            taskItem.innerHTML = `<input type="checkbox" class="task-checkbox" checked>${task.name} <button class="delete-button">Delete</button>`;
        } else if (task.state === 'pending') {
            taskItem.innerHTML = `<input type="checkbox" class="task-checkbox">${task.name} <button class="delete-button">Delete</button>`;
        } else if (task.state === 'deleted') {
            taskItem.textContent = task.name;
        }

        if (task.state === 'deleted') {
            deletedTasksList.appendChild(taskItem);
        } else if (task.state === 'completed') {
            completedTasksList.appendChild(taskItem);
        } else {
            pendingTasksList.appendChild(taskItem);
        }
    });
}

// Function to handle task actions (complete or delete)
function handleTaskAction(taskId, action) {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
        task.state = action;
        saveTasks();
        renderTasks();
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        tasks.length = 0; // Clear the current array
        tasks.push(...savedTasks);
    }
}

// Initialize the app
loadTasks();
renderTasks();

// Event listeners
const addTaskForm = document.getElementById('add-task-form');
addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-name').value;
    if (taskName.trim() !== '') {
        const newTask = addTask(taskName);
        renderTasks();
        document.getElementById('task-name').value = '';
    }
});

document.getElementById('task-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('task-checkbox')) {
        const taskId = parseInt(e.target.parentElement.getAttribute('data-task-id'));
        handleTaskAction(taskId, e.target.checked ? 'completed' : 'pending');
    } else if (e.target.classList.contains('delete-button')) {
        const taskId = parseInt(e.target.parentElement.getAttribute('data-task-id'));
        handleTaskAction(taskId, 'deleted');
    }
});
