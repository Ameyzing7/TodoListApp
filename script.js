// Get elements from the DOM
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Add a new task
addTaskBtn.addEventListener('click', addTask);

// Function to add a task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Create a new list item
  const li = document.createElement('li');
  li.textContent = taskText;

  // Add a delete button to the task
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', deleteTask);

  // Add a click event to mark the task as completed
  li.addEventListener('click', toggleTask);

  // Append the delete button to the task
  li.appendChild(deleteBtn);

  // Add the task to the list
  taskList.appendChild(li);

  // Save the task to local storage
  saveTaskToLocalStorage(taskText);

  // Clear the input field
  taskInput.value = '';
}

// Function to delete a task
function deleteTask(event) {
  const li = event.target.parentElement;
  taskList.removeChild(li);
  removeTaskFromLocalStorage(li.textContent);
}

// Function to mark a task as completed
function toggleTask(event) {
  const li = event.target;
  li.classList.toggle('completed');
}

// Function to save a task to local storage
function saveTaskToLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}

// Function to load tasks from local storage
function loadTasks() {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', deleteTask);

    li.addEventListener('click', toggleTask);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Function to remove a task from local storage
function removeTaskFromLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(t => t !== task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}