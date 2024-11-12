import {Task, createTask, deleteTask} from "./task.js";
import {displayTaskCreation, editTaskInfo, emptyModal, updateTaskCount, updateTaskList, removeTaskFromList, AddTasksByCat, displayTaskToggler, addUpcomingTasksToList, addTodaysTasksToList, UpdateCurrentlyActiveTaskList, setupCancelListener , setupSubmitListener} from "./display.js";
import { createCategory } from "./category.js";
import {loadTasksFromLocalStorage, loadCategoriesFromLocalStorage} from "./localstorage.js";
import "./styles.css";
import "./reset.css";
import "./modal.css";
import "./sidebar.css";


const newTaskButton = document.querySelector(".new-task");
const taskList = document.querySelector(".task-list");
const deleteTaskButton = document.querySelector(".deletion-button");
const todaysTasksButton = document.querySelector(".sidebar-today");
const upcomingTasksButton = document.querySelector(".sidebar-upcoming");
const categorySidebar = document.querySelector(".categories");
export let activeTab = "Today";
createCategory();
displayTaskToggler("Today");
document.addEventListener("DOMContentLoaded", () => {
    setupCancelListener();
    setupSubmitListener();
    loadTasksFromLocalStorage();
    loadCategoriesFromLocalStorage();
    UpdateCurrentlyActiveTaskList(); 
});
newTaskButton.addEventListener("click", (event) => {
    if ((deleteTaskButton.classList.contains("hide"))) {
        deleteTaskButton.classList.toggle("hide");
    }
    displayTaskCreation();
    updateTaskCount();

})
taskList.addEventListener("click", (event)=> {
    if (event.target.classList.contains("check-off"))
        {
    
            const taskContainer = event.target.parentNode;
            const title = taskContainer.dataset.title;
            deleteTask(title);
            removeTaskFromList(title); 
            updateTaskCount();
            return;
        } else {
            for (let task of Task.taskList) {
                if (event.target.classList.contains(task.title)) {
                    editTaskInfo(task);
                }
             }
                updateTaskCount();
        }
    
})
deleteTaskButton.addEventListener("click", (event)=> {
    const taskTitle = emptyModal();
    deleteTask(taskTitle);
    removeTaskFromList(taskTitle);
    updateTaskCount();
});

todaysTasksButton.addEventListener("click", (event) => {
    activeTab = "Today";
    displayTaskToggler("Today");
    addTodaysTasksToList();
})
upcomingTasksButton.addEventListener("click", (event) => {
    activeTab = "Upcoming";
    displayTaskToggler("Upcoming");
    addUpcomingTasksToList();
})
categorySidebar.addEventListener("click", (event) => {
    if (event.target.classList.contains("sidebar-item")) {
        const catName = event.target.children[0].innerText;
        activeTab = catName;
        displayTaskToggler(catName);
        AddTasksByCat(catName);
    }
})


