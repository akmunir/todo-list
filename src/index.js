import {Task, createTask, deleteTask} from "./task.js";
import {displayTaskCreation, editTaskInfo, emptyModal, updateTaskCount, updateTaskList, removeTaskFromList, AddTasksByCat, displayTaskToggler, addUpcomingTasksToList, addTodaysTasksToList, UpdateCurrentlyActiveTaskList, setupCancelListener , setupSubmitListener} from "./display.js";
import { categoryList, createCategory } from "./category.js";
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
    console.log("eneter tasklist listener")
    console.log(categoryList)
    if (event.target.classList.contains("check-off")) {
        const taskContainer = event.target.parentNode;
        const title = taskContainer.dataset.title;
        const innerContainer = taskContainer.querySelector(".inner-container");
        const taskElement = innerContainer.querySelector(".task");
        event.target.classList.add("checked");
        const strikethroughLine = document.createElement("div");
        strikethroughLine.classList.add("strikethrough-line");
        innerContainer.appendChild(strikethroughLine);
        setTimeout(() => {
            deleteTask(title);
            removeTaskFromList(title);
            updateTaskCount();
        }, 300); 
        
        return;
        } else {
            for (let task of Task.taskList) {
                console.log(task)
                if (event.target.classList.contains(task.title.replace(/\s/g, ''))) {
                    editTaskInfo(task);
                }
             }
                updateTaskCount();
        }
    
});
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


