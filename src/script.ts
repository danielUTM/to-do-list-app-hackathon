// src/app.ts

document.addEventListener("DOMContentLoaded", function () {
  // Dummy data for initial tasks
  const dummyTasks = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
  ];

  const todoList = document.getElementById("todo-list");

  // Function to render tasks
  function renderTasks(
    tasks: { id: number; title: string; completed: boolean }[],
  ) {
    if (!todoList) return; // Ensure todoList exists

    todoList.innerHTML = ""; // Clear existing list

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.title;
      if (task.completed) {
        li.classList.add("completed");
      }
      todoList.appendChild(li);
    });
  }

  // Initial render with dummy tasks
  renderTasks(dummyTasks);

  // Form submission event handler (for adding new tasks - not implemented with backend yet)
  const addTodoForm = document.getElementById(
    "add-todo-form",
  ) as HTMLFormElement;
  const todoInput = document.getElementById("todo-input") as HTMLInputElement;

  if (addTodoForm && todoInput) {
    addTodoForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const newTaskTitle = todoInput.value.trim();
      if (newTaskTitle) {
        const newTask = {
          id: Date.now(), // Generate unique ID (temporary)
          title: newTaskTitle,
          completed: false,
        };
        dummyTasks.push(newTask);
        renderTasks(dummyTasks);
        todoInput.value = ""; // Clear input field
      }
    });
  }
});
