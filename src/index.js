import {Task, createTask} from "./task.js";
import {displayTaskCreation, editTaskInfo, updateTaskCount, updateTaskList} from "./display.js";
import { createCategory } from "./category.js";
import "./styles.css";
import "./reset.css";
import "./modal.css";
import "./sidebar.css";

const newTaskButton = document.querySelector(".new-task");
const taskList = document.querySelector(".task-list");
createCategory();
newTaskButton.addEventListener("click", (event) => {
    displayTaskCreation();
})
taskList.addEventListener("click", (event)=> {
        for (let task of Task.taskList) {
            if (event.target.classList.contains(task.title)) {
                editTaskInfo(task);
            }
        }
})


