import {Task, createTask} from "./task.js";
import {displayTaskCreation, updateTaskList} from "./display.js";
import "./styles.css";
import "./reset.css";

const newTaskButton = document.querySelector(".new-task");
newTaskButton.addEventListener("click", (event) => {
    console.log("entered ");
    displayTaskCreation();
});
