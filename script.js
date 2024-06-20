const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const task = input.value.trim();
  if (task !== '') {
    addTask(task);
    input.value = '';
  }
});

function addTask(task) {
  const li = document.createElement('li');
  li.textContent = task;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete-btn';
  deleteButton.addEventListener('click', function() {
    li.remove();
  });

  li.appendChild(deleteButton);

  li.addEventListener('click', function() {
    li.classList.toggle('completed');
  });

  todoList.appendChild(li);
}