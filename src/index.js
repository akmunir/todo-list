import {Task, createTask, deleteTask} from "./task.js";
import {displayTaskCreation, editTaskInfo, emptyModal, updateTaskCount, updateTaskList, removeTaskFromList, displayUpcomingTasks, displayTodaysTasks, displayTasksByCategory} from "./display.js";
import { createCategory } from "./category.js";
import "./styles.css";
import "./reset.css";
import "./modal.css";
import "./sidebar.css";


const newTaskButton = document.querySelector(".new-task");
const taskList = document.querySelector(".task-list");
const deleteTaskButton = document.querySelector(".deletion-button");
const todaysTasksButton = document.querySelector(".today");
const upcomingTasksButton = document.querySelector(".upcoming");
const categorySidebar = document.querySelector(".categories");
createCategory();
displayTodaysTasks();
newTaskButton.addEventListener("click", (event) => {
    if ((deleteTaskButton.classList.contains("hide"))) {
        deleteTaskButton.classList.toggle("hide");
    }
    console.log(todaysTasksButton)
    displayTaskCreation();
    updateTaskCount();

})
taskList.addEventListener("click", (event)=> {
    console.log(Task.taskList);
        for (let task of Task.taskList) {
            if (event.target.classList.contains(task.title)) {
                editTaskInfo(task);
            }
        }
        updateTaskCount();
})
deleteTaskButton.addEventListener("click", (event)=> {
    const taskTitle = emptyModal();
    deleteTask(taskTitle);
    removeTaskFromList(taskTitle);
    updateTaskCount();
});

todaysTasksButton.addEventListener("click", (event) => {
    console.log("displayTasks");
    displayTodaysTasks();
})
upcomingTasksButton.addEventListener("click", (event) => {
    console.log("upcoming");
    displayUpcomingTasks();
})
categorySidebar.addEventListener("click", (event) => {
    if (event.target.classList.contains("sidebar-item")) {
        const catName = event.target.children[0].innerText;
        console.log(catName)
        displayTasksByCategory(catName);
    }
})