class TaskManager {

constructor(){

this.tasks = JSON.parse(localStorage.getItem("tasks")) || [];

}

save(){

localStorage.setItem("tasks", JSON.stringify(this.tasks));

}

addTask(name, frequency){

const task = {

id: Date.now(),
name,
frequency,
completed:false

};

this.tasks.push(task);

this.save();

}

toggleTask(id){

this.tasks = this.tasks.map(task =>

task.id === id
? {...task, completed: !task.completed}
: task

);

this.save();

}

deleteTask(id){

this.tasks = this.tasks.filter(task => task.id !== id);

this.save();

}

}

const taskManager = new TaskManager();

const taskList = document.getElementById("taskList");

const taskCount = document.getElementById("taskCount");

const addTaskBtn = document.getElementById("addTaskBtn");

function renderTasks(){

taskList.innerHTML = "";

taskManager.tasks.forEach(task => {

const li = document.createElement("li");

if(task.completed) li.classList.add("completed");

li.innerHTML = `

<div class="task-left">

<input type="checkbox" ${task.completed ? "checked" : ""}>

<span class="task-text">

${task.name}

<small>${task.frequency}</small>

</span>

</div>

<button class="delete-btn">Eliminar</button>

`;

li.querySelector("input").addEventListener("change", () => {

taskManager.toggleTask(task.id);

renderTasks();

});

li.querySelector("button").addEventListener("click", () => {

taskManager.deleteTask(task.id);

renderTasks();

});

taskList.appendChild(li);

});

const pending = taskManager.tasks.filter(t => !t.completed).length;

const completed = taskManager.tasks.filter(t => t.completed).length;

taskCount.textContent = `${pending} pendientes | ${completed} completadas`;

}

addTaskBtn.addEventListener("click", () => {

const nameInput = document.getElementById("taskName");

const frequencyInput = document.getElementById("taskFrequency");

if(nameInput.value.trim() === "") return;

taskManager.addTask(nameInput.value, frequencyInput.value);

nameInput.value = "";

renderTasks();

});

renderTasks();
