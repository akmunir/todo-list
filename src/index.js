import {Task, createTask} from "./task.js";
import {displayTaskCreation, updateTaskList} from "./display.js";

const newTaskButton = document.querySelector(".new-task");
newTaskButton.addEventListener("click", (event) => {
    console.log("entered ");
    displayTaskCreation();
});
