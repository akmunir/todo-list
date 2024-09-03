import {createTask, Task} from "./task.js"; //fix later so i dont need to importg into this file
export const displayTaskCreation = () => {
    const taskCreation = document.querySelector(".creation-modal");
    const priorityDisplay = document.querySelector(".dropbtn");
    const prioritySelection = document.querySelector(".dropdown-content");
    const form = document.querySelector('form');
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
    const numTasks = document.querySelector(".num-tasks");
    const listElement = document.createElement("li");
    listElement.innerText = task.getTitle();
    listElement.classList.add("task");
    list.appendChild(listElement);
    console.log(Task.taskCount);
    if (Task.taskCount === 0) {
        numTasks.innerText = "No tasks!";
    } else if (Task.taskCount === 0) {
        numTasks.innerText = `${Task.taskCount} task`
    } else {
        numTasks.innerText = `${Task.taskCount} tasks`
    }

}