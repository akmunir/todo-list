import {Task, createTask} from "./task.js";
import {displayTaskCreation, updateTaskCount, updateTaskList} from "./display.js";
import { createCategory } from "./category.js";
import "./styles.css";
import "./reset.css";
import "./modal.css";
import "./sidebar.css";

const newTaskButton = document.querySelector(".new-task");
createCategory();
newTaskButton.addEventListener("click", (event) => {
    displayTaskCreation();
})

