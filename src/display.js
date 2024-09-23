import {createTask, deleteTask, Task} from "./task.js";


export const displayModal = ()=> {
    const taskModal = document.querySelector(".task-modal");
    const priorityDisplay = document.querySelector(".dropbtn");
    const prioritySelection = document.querySelector(".dropdown-content");
    const form = document.querySelector('form');
    const cancelbtn = document.querySelector(".cancel")
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const date = document.querySelector("#date");
    const deletionButton = document.querySelector(".modal-button");
    taskModal.showModal();
    return {taskModal, priorityDisplay, prioritySelection, form, cancelbtn, title, description, date, deletionButton};
}
export const displayTaskCreation = () => {
    const modal = displayModal();
    modal.deletionButton.classList.toggle("hide");
    modal.prioritySelection.addEventListener("click", (event) => {
        if (event.target.classList.contains("low")) {
            event.target.classList.add("selected");
            modal.priorityDisplay.innerText = "Low";
        } else if (event.target.classList.contains("med")) {
            event.target.classList.add("selected");
            modal.priorityDisplay.innerText = "Medium";
        } else if (event.target.classList.contains("high")) {
            event.target.classList.add("selected");
            modal.priorityDisplay.innerText = "High";
        }
    })
    modal.cancelbtn.addEventListener("click", (event) => {
        if (event.target.classList.contains("cancel")) {
            emptyModal(modal);
            if (!(modal.deletionButton.classList.contains("hide"))) {
                modal.deletionButton.classList.toggle("hide");
            }
        }
    })
    modal.form.addEventListener("submit", (event) => {
        event.preventDefault();
        const task = createTask();
        if (task) {
            updateTaskList(task);
        }
        modal.priorityDisplay.innerText = "Priority"
        modal.taskModal.close();
    });
}


export const emptyModal = (modal = displayModal())=> {
    modal.priorityDisplay.innerText = "Priority" 
    const title = modal.form.title.value;
    modal.form.reset();
    modal.taskModal.close();
    return title;
}




export const updateTaskList = (task) => {
    const list = document.querySelector(".task-list");
    const listElement = document.createElement("li");
    const taskContainer = document.createElement("div");
    const taskDueDate = document.createElement("span");
    taskContainer.classList.add("task-container");
    taskDueDate.classList.add("task-due-date");
    taskDueDate.innerText = task.getDueDate();
    listElement.innerText = task.getTitle();
    listElement.classList.add("task");
    listElement.classList.add(task.getTitle());
    taskContainer.setAttribute("data-","isActiveTask");
    taskContainer.appendChild(listElement);
    taskContainer.appendChild(taskDueDate);
    list.appendChild(taskContainer);
    updateTaskCount();
}


export const updateTaskCount = () => {
    const numTasks = document.querySelector(".num-tasks");
    if (Task.taskCount === 0) {
        numTasks.innerText = "No tasks!";
    } else if (Task.taskCount === 1) {
        numTasks.innerText = `${Task.taskCount} task`
    } else {
        numTasks.innerText = `${Task.taskCount} tasks`
    }
}


export const editTaskInfo = (task) => {
    const taskModal = displayModal();
    taskModal.deletionButton.classList.toggle("hide");
    taskModal.title.value = task.title;
    taskModal.description.value = task.description;
    taskModal.date.value = task.formattedDate;
    taskModal.priorityDisplay.innerText = task.priority;
}


export const removeTaskFromList = (taskTitle) => {
    console.log("a")
    console.log("tasktitle " + taskTitle)
    const taskList = document.querySelector(".task-list");
    const tasks = taskList.children;
    for (let taskContainer of tasks) {
        for (let task of taskContainer.children) {
            console.log(task)
            if (task.classList.contains(taskTitle)) {
                console.log(taskContainer)
                taskList.removeChild(taskContainer);
            }
        }
    }
}
