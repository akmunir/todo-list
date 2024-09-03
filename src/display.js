import {createTask, Task} from "./task.js"; //fix later so i dont need to importg into this file
export const displayTaskCreation = () => {
    const taskCreation = document.querySelector(".creation-modal");
    const priorityDisplay = document.querySelector(".dropbtn");
    const prioritySelection = document.querySelector(".dropdown-content");
    const form = document.querySelector('form');
    const cancelbtn = document.querySelector(".cancel")
    taskCreation.showModal();
    prioritySelection.addEventListener("click", (event) => {
        if (event.target.classList.contains("low")) {
            event.target.classList.add("selected");
            priorityDisplay.innerText = "Low";
        } else if (event.target.classList.contains("med")) {
            event.target.classList.add("selected");
            priorityDisplay.innerText = "Medium";
        } else if (event.target.classList.contains("high")) {
            event.target.classList.add("selected");
            priorityDisplay.innerText = "High";
        }
    })
    cancelbtn.addEventListener("click", (event) => {
        if (event.target.classList.contains("cancel")) {
            taskCreation.close(); 
            priorityDisplay.innerText = "Priority"  
            form.reset();
        } 
    })
    form.addEventListener("submit", (event) => {
        console.log("display2");
        event.preventDefault();
        const task = createTask();
        if (task) {
            updateTaskList(task);
        }
        priorityDisplay.innerText = "Priority"
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