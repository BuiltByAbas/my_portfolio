
const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");
const pendingCount = document.getElementById("pending-count");

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Load previously saved tasks from the browser
let tasks = [];

try {
    const savedTasks = localStorage.getItem("academicTasks");
    tasks = savedTasks ? JSON.parse(savedTasks) : [];

    // Ensure  saved data has  expected format
    if (
        !Array.isArray(tasks) ||
        !tasks.every(task =>
            task &&
            typeof task.name === "string" &&
            typeof task.completed === "boolean"
        )
    ) {
        tasks = [];
    }
} catch (error) {
    console.error("Could not load saved tasks:", error);
    tasks = [];
}

// Save tasks to the browser
function saveTasks() {
    try {
        localStorage.setItem("academicTasks", JSON.stringify(tasks));
    } catch (error) {
        console.error("Could not save tasks:", error);
        alert("Your changes could not be saved in this browser.");
    }
}

// Update the summary cards
function updateSummary() {
    const total = tasks.length;

    const completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    const pending = total - completed;

    totalCount.textContent = total;
    completedCount.textContent = completed;
    pendingCount.textContent = pending;
}

// Display all tasks
function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute(
            "aria-label",
            "Mark " + task.name + " as completed"
        );

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;
            saveTasks();
            displayTasks();
            updateSummary();
        });

        const taskName = document.createElement("span");
        taskName.textContent = task.name;

        if (task.completed) {
            taskName.style.textDecoration = "line-through";
        }

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";
        deleteButton.setAttribute(
            "aria-label",
            "Delete " + task.name
        );

        deleteButton.addEventListener("click", function() {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
            updateSummary();
        });

        li.append(checkbox, taskName, deleteButton);
        taskList.appendChild(li);
    });
}

// Add a new task
taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    tasks.push({
        name: taskText,
        completed: false
    });

    saveTasks();
    displayTasks();
    updateSummary();

    taskInput.value = "";
    taskInput.focus();
});

// Show saved tasks when the page opens
displayTasks();
updateSummary();
