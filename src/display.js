import {createTask, deleteTask, Task} from "./task.js";
import { activeTab } from "./index.js";
import { saveTasksToLocalStorage } from "./localstorage";


export const displayModal = ()=> {
    const taskModal = document.querySelector(".task-modal");
    const prioritySelection = document.querySelector(".priority");
    const form = document.querySelector('form');
    const cancelbtn = document.querySelector(".cancel")
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const date = document.querySelector("#date");
    const deletionButton = document.querySelector(".modal-button");
    const categorySelection = document.querySelector(".cat");
    const submitTask = document.querySelector(".submit-task"); 
    return {taskModal, prioritySelection, form, cancelbtn, title, description, date, deletionButton, categorySelection, submitTask};
}
export const displayTaskCreation = () => {
    const taskModal = displayModal();
    taskModal.deletionButton.classList.toggle("hide");
    taskModal.taskModal.showModal();
    
}

export const setupSubmitListener = () => {
    const modal = displayModal();
    modal.deletionButton.classList.toggle("hide");
    modal.form.addEventListener("submit", (event) => {
        console.log("submitting")
        event.preventDefault();
        const task = createTask();
        if (event.target.submit.classList.contains("editing")) {
            console.log("submitting from editing")
            removeTaskFromList(modal.title.value);
            deleteTask(modal.title.value);
            modal.submitTask.classList.toggle("editing");
        }
        if (task) {
            console.log("task being updated to list")
            updateTaskList(task);
        }
        emptyModal(modal);
        modal.taskModal.close();
        modal.submitTask.value = "Add Task";
        UpdateCurrentlyActiveTaskList();
    });
}
export const setupCancelListener = () => {
    const modal = displayModal();
    modal.cancelbtn.addEventListener("click", (event) => {
        if (event.target.classList.contains("cancel")) {
            emptyModal(modal);
            if (!modal.deletionButton.classList.contains("hide")) {
                modal.deletionButton.classList.toggle("hide");
            }
        }
    });
};


export const emptyModal = (modal = displayModal())=> {
    const title = modal.form.title.value;
    modal.form.reset();
    modal.taskModal.close();
    return title;
}


export const updateTaskList = (task) => {
    const listElement = document.createElement("li");
    const taskContainer = document.createElement("div");
    const innerContainer = document.createElement("div");
    const taskDueDate = document.createElement("span");
    const taskCheckOff = document.createElement("div");
    innerContainer.classList.add("inner-container")
    taskContainer.classList.add("task-container");
    taskDueDate.classList.add("task-due-date");
    taskCheckOff.classList.add("check-off");
    taskDueDate.innerText = task.getDueDate();
    listElement.innerText = task.getTitle();
    listElement.classList.add("task");
    listElement.classList.add(task.getTitle().replaceAll(/\s/g, ""));
    taskContainer.setAttribute("data-title", task.getTitle());
    taskContainer.appendChild(taskCheckOff);
    innerContainer.appendChild(listElement);
    innerContainer.appendChild(taskDueDate);
    taskContainer.appendChild(innerContainer)
    return taskContainer;
}

export const UpdateCurrentlyActiveTaskList = ()=> {
    displayTaskToggler(activeTab);
    if (activeTab === "Today") {
        addTodaysTasksToList();
    } else if (activeTab === "Upcoming") {
        addUpcomingTasksToList();
    } else {
        AddTasksByCat(activeTab);
    }
}

export const updateTaskCount = () => {
    const numTasks = document.querySelector(".num-tasks");
    const taskList = document.querySelectorAll(".task-container");
    const taskCount = taskList.length;
    if(document.querySelector(".main-text").classList.contains("upcoming")) 
    if(document.querySelector(".main-text").classList.contains("today")) Task.todaysTasksCount = taskCount;
    else numTasks.innerText = taskCount;
    
    if(document.querySelector(".main-text").classList.contains("upcoming")) {
        Task.upcomingTasksCount = taskCount;
        if (Task.upcomingTasksCount <= 0) {
        numTasks.innerText = "No Tasks";
         } else if (Task.upcomingTasksCount === 1) {
         numTasks.innerText = `${Task.upcomingTasksCount} task`
        } else {
        numTasks.innerText = `${Task.upcomingTasksCount} tasks`
        }
    } else if(document.querySelector(".main-text").classList.contains("today")) {
        Task.todaysTasksCount = taskCount;
        if (Task.todaysTasksCount <= 0) {
        numTasks.innerText = "No Tasks";
        } else if (Task.todaysTasksCount === 1) {
        numTasks.innerText = `${Task.todaysTasksCount} task`
        } else {
        numTasks.innerText = `${Task.todaysTasksCount} tasks`
        }
    } else {
        if (taskCount === 0) {
            numTasks.innerText = "No Tasks";
        } else if (taskCount === 1) {
            numTasks.innerText = "1 Task";
        } else {
            numTasks.innerText = taskCount + " tasks";
        }
    }
    
    
}


export const editTaskInfo = (task) => {
    const taskModal = displayModal();
    taskModal.taskModal.showModal();
    taskModal.submitTask.classList.toggle("editing");
    taskModal.deletionButton.classList.toggle("hide");
    taskModal.title.value = task.title;
    taskModal.description.value = task.description;
    taskModal.prioritySelection.value = task.priority;
    taskModal.categorySelection.value = task.category;
    taskModal.date.value = typeof task.dueDate === 'string' ? task.dueDate.substring(0, 10) : new Date(task.dueDate).toISOString().substring(0, 10);
    taskModal.submitTask.value = "Edit Task";
    taskModal.form.onsubmit = (event) => {
        event.preventDefault();
        if (taskModal.submitTask.classList.contains("editing")) {
            task.title = taskModal.title.value;
            task.description = taskModal.description.value;
            task.dueDate = taskModal.date.value;
            task.priority = taskModal.prioritySelection.value;
            task.category = taskModal.categorySelection.value;
            updateTaskList(task);
            saveTasksToLocalStorage();
            UpdateCurrentlyActiveTaskList();
            taskModal.submitTask.classList.remove("editing");
            taskModal.submitTask.value = "Add Task";
            emptyModal(taskModal);
        }
    };
}


export const removeTaskFromList = (taskTitle) => {
    const taskList = document.querySelector(".task-list");
    const tasks = taskList.children;
    for (let taskContainer of tasks) {
        for (let task of taskContainer.children) {
            if (task.classList.contains(taskTitle)) {
                taskList.removeChild(taskContainer);
            }
        }
    }
    UpdateCurrentlyActiveTaskList();
}
export const displayTaskToggler = (taskSection)=> {
    const mainText = document.querySelector(".main-text");
    const taskList = document.querySelector(".task-list");
    const numTasks = document.querySelector(".num-tasks");
    mainText.innerText = taskSection;
    mainText.appendChild(document.createElement("br"));
    mainText.appendChild(numTasks)
    taskList.innerHTML = "";
};

export const AddTasksByCat = (catName)=> {
    const mainText = document.querySelector(".main-text");
    const list = document.querySelector(".task-list");
    mainText.classList.toggle(catName);
    for(let task of Task.taskList) {
        if(task.category === catName) {
            list.appendChild(updateTaskList(task));
        }
    }
    updateTaskCount();    
}

export const addTodaysTasksToList = ()=> {
    const mainText = document.querySelector(".main-text");
    const list = document.querySelector(".task-list");
    mainText.classList.toggle("today");
    if (mainText.classList.contains("upcoming")) mainText.classList.toggle("upcoming");
    const taskList = document.querySelector(".task-list");
    for(let task of Task.taskList) {
        if (task.isDueToday()) {
            list.appendChild(updateTaskList(task));
            updateTaskCount();
        }
    }
    updateTaskCount();
}

export const addUpcomingTasksToList = ()=> {
    const mainText = document.querySelector(".main-text");
    const list = document.querySelector(".task-list");
    mainText.classList.toggle("upcoming");
    if (mainText.classList.contains("today")) mainText.classList.toggle("today");
    const taskList = document.querySelector(".task-list");
    for(let task of Task.taskList) {
        if(!task.isDueToday()) {
            list.appendChild(updateTaskList(task));
            updateTaskCount();
        }
    }
    updateTaskCount();
}
