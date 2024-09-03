import {createTask} from "./task.js"; //fix later so i dont need to importg into this file
export const displayTaskCreation = () => {
    const taskCreation = document.querySelector(".task-creation");
    const form = document.querySelector('form');
    taskCreation.showModal();
    form.addEventListener("submit", (event) => {
        console.log("display2");
        event.preventDefault();
        const task = createTask();
        if (task) {
            updateTaskList(task);
        }
        taskCreation.close();
    });
}
export const updateTaskList = (task) => {
    const list = document.querySelector(".task-list");
    const listElement = document.createElement("li");
    listElement.innerText = task.getTitle();
    listElement.classList.add("task");
    list.appendChild(listElement);
}