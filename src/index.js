import {Task, createTask} from "./task.js";
import {displayTaskCreation, updateTaskCount, updateTaskList} from "./display.js";
import "./styles.css";
import "./reset.css";
import "./modal.css";

const newTaskButton = document.querySelector(".new-task");
newTaskButton.addEventListener("click", (event) => {
    displayTaskCreation();
})
