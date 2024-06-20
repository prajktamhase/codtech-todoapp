const form = document.getElementById('todo-form');
const taskIdInput = document.getElementById('task-id');
const taskTextInput = document.getElementById('task-text');
const addBtn = document.getElementById('add-btn');
const updateBtn = document.getElementById('update-btn');
const todoList = document.getElementById('todo-list');

let tasks = [];

// Load tasks from localStorage if available
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks();
}

// Event listener for form submission
form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const taskId = taskIdInput.value;
  const taskText = taskTextInput.value.trim();
  
  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }
  
  if (taskId === '') {
    // Add new task
    addTask(taskText);
  } else {
    // Update existing task
    updateTask(taskId, taskText);
  }
  
  // Clear form fields after adding or updating
  taskIdInput.value = '';
  taskTextInput.value = '';
  addBtn.style.display = 'inline-block';
  updateBtn.style.display = 'none';
});

// Function to add a new task
function addTask(taskText) {
  const newTask = {
    id: Date.now().toString(),
    text: taskText,
    completed: false
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

// Function to update an existing task
function updateTask(taskId, taskText) {
  tasks = tasks.map(task => {
    if (task.id === taskId) {
      task.text = taskText;
    }
    return task;
  });
  saveTasks();
  renderTasks();
}

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks in the UI
function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
        <button class="edit-btn" onclick="editTask('${task.id}', '${task.text}')">Edit</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// Function to delete a task
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  saveTasks();
  renderTasks();
}

// Function to edit a task
function editTask(taskId, taskText) {
  taskIdInput.value = taskId;
  taskTextInput.value = taskText;
  addBtn.style.display = 'none';
  updateBtn.style.display = 'inline-block';
}