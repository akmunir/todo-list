import {createTask, Task} from "./task.js";

export const displayModal = ()=> {
    const taskModal = document.querySelector(".task-modal");
    const priorityDisplay = document.querySelector(".dropbtn");
    const prioritySelection = document.querySelector(".dropdown-content");
    const form = document.querySelector('form');
    const cancelbtn = document.querySelector(".cancel")
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const date = document.querySelector("#date");
    taskModal.showModal();
    return {taskModal, priorityDisplay, prioritySelection, form, cancelbtn, title, description, date};
}
export const displayTaskCreation = () => {
    const modal = displayModal();
    
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
            modal.taskModal.close(); 
            modal.priorityDisplay.innerText = "Priority"  
            modal.form.reset();
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
    taskContainer.appendChild(listElement);
    taskContainer.appendChild(taskDueDate);
    list.appendChild(taskContainer);
    updateTaskCount();
}

export const updateTaskCount = () => {
    const numTasks = document.querySelector(".num-tasks"); 
    if (Task.taskCount === 0) {
        numTasks.innerText = "No tasks!";
    } else if (Task.taskCount === 0) {
        numTasks.innerText = `${Task.taskCount} task`
    } else {
        numTasks.innerText = `${Task.taskCount} tasks`
    }
}

export const editTaskInfo = (task) => {
    const taskModal = displayModal();
    taskModal.title.value = task.title;
    taskModal.description.value = task.description;
    console.log(task.dueDate)
    taskModal.date.value = task.dueDate;
    taskModal.priorityDisplay.innerText = task.priority;

}