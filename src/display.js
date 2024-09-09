import {createTask, Task} from "./task.js";

export const displayModal = ()=> {
    const taskModal = document.querySelector(".task-modal");
    const priorityDisplay = document.querySelector(".dropbtn");
    const prioritySelection = document.querySelector(".dropdown-content");
    const form = document.querySelector('form');
    const cancelbtn = document.querySelector(".cancel")
    taskCreation.showModal();
    return {taskModal, priorityDisplay, prioritySelection, form, cancelbtn};
}
export const displayTaskCreation = () => {
    const taskModal = displayModal();
    
    taskModal.prioritySelection.addEventListener("click", (event) => {
        if (event.target.classList.contains("low")) {
            event.target.classList.add("selected");
            taskModal.priorityDisplay.innerText = "Low";
        } else if (event.target.classList.contains("med")) {
            event.target.classList.add("selected");
            taskModal.priorityDisplay.innerText = "Medium";
        } else if (event.target.classList.contains("high")) {
            event.target.classList.add("selected");
            taskModal.priorityDisplay.innerText = "High";
        }
    })
    taskModal.cancelbtn.addEventListener("click", (event) => {
        if (event.target.classList.contains("cancel")) {
            taskCreation.close(); 
            taskModal.priorityDisplay.innerText = "Priority"  
            taskModal.form.reset();
        } 
    })
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const task = createTask();
        if (task) {
            updateTaskList(task);
        }
        taskModal.priorityDisplay.innerText = "Priority"
        taskCreation.close();
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

export const editTaskInfo = () => {

}