const htmlContainerTask = document.getElementById("containerTask");
const htmlNewTask = document.getElementById("newTask");
const htmlBtnAdd = document.getElementById("btnAdd");
const htmlTotalTask = document.getElementById("totalTask");
const htmlTaskDone = document.getElementById("taskDone");
const htmlTaskUndone = document.getElementById("taskUndone");

//***************************** Array de Tareas ************************************ */
const taskList = [
  { idTask: 1, taskName: "Sacar a pasear al perro", taskStatus: false },
  { idTask: 2, taskName: "Realizar aseo general", taskStatus: true },
  { idTask: 3, taskName: "Podar el jardin", taskStatus: false },
];

//***************************** Randeriza HTML ************************************ */
const loadTask = () => {
  let htmlTask = "";
  let cantidad = 0;
  htmlContainerTask.innerHTML = "";

  taskList.forEach((task) => {
    const newDiv = document.createElement("div");
    newDiv.className = "boxTask";

    htmlTask = `
                <span ${
                  task.taskStatus ? 'style="text-decoration:line-through"' : ""
                }>N°${task.idTask}</span>
                  <span ${
                    task.taskStatus
                      ? 'style="text-decoration:line-through"'
                      : ""
                  }>${task.taskName}</span> 
                  <p>
                    <input type="checkbox" ${
                      task.taskStatus ? "checked" : ""
                    } onclick="changeStatus(${task.idTask}) " >
                    <i class="fa-regular fa-trash-can fa-2xl" onclick="deleteTask(${
                      task.idTask
                    })"></i>
                  </p>`;

    if (task.taskStatus) {
      cantidad++;
    }
    newDiv.innerHTML = htmlTask;
    htmlContainerTask.appendChild(newDiv);
    htmlTotalTask.innerHTML = taskList.length;
    htmlTaskDone.innerHTML = cantidad;
  });
  htmlTaskUndone.innerHTML = taskList.length - cantidad;
};

//***************************** Cambia Status ************************************ */
const changeStatus = (taskId) => {
  const taskChange = taskList.find((task) => task.idTask === taskId);
  if (taskChange) {
    taskChange.taskStatus = !taskChange.taskStatus;
  }

  loadTask();
};

//***************************** Elimina Tareas ************************************ */
const deleteTask = (taskId) => {
  const taskDelete = taskList.findIndex((task) => task.idTask === taskId);
  taskList.splice(taskDelete, 1);
  loadTask();
};

//***************************** Añade Nueva Tarea ************************************ */
const addNewTask = () => {
  const lengthTaskList = taskList[taskList.length - 1];

  if (!htmlNewTask.value.trim()) {
    alert("Debes ingresar una tarea");
    return;
  }

  const newTask = {
    idTask: lengthTaskList ? lengthTaskList.idTask + 1 : 1,
    taskName: htmlNewTask.value.trim(),
    taskStatus: false,
  };
  taskList.push(newTask);
  loadTask();
};

//***************************** Llamado de Funciones ************************************ */
htmlBtnAdd.addEventListener("click", addNewTask);
loadTask();
