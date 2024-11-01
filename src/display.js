import {createTask, deleteTask, Task} from "./task.js";


export const displayModal = ()=> {
    const taskModal = document.querySelector(".task-modal");
    const prioritySelection = document.querySelector(".dropbtn");
    const form = document.querySelector('form');
    const cancelbtn = document.querySelector(".cancel")
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const date = document.querySelector("#date");
    const deletionButton = document.querySelector(".modal-button");
    const categorySelection = document.querySelector(".cat");
    const submitTask = document.querySelector(".submit-task"); 
    taskModal.showModal();
    return {taskModal, prioritySelection, form, cancelbtn, title, description, date, deletionButton, categorySelection, submitTask};
}
export const displayTaskCreation = () => {
    const modal = displayModal();
    modal.deletionButton.classList.toggle("hide");
    modal.cancelbtn.addEventListener("click", (event) => {
        if (event.target.classList.contains("cancel")) {
            emptyModal(modal);
            if (!(modal.deletionButton.classList.contains("hide"))) {
                modal.deletionButton.classList.toggle("hide");
            }
        }
    })
    modal.form.addEventListener("submit", (event) => {
        event.preventDefault();
        const task = createTask();
        if (event.target.submit.classList.contains("editing")) {
            console.log(modal.title.value)
            removeTaskFromList(modal.title.value);
            deleteTask(modal.title.value);
            modal.submitTask.classList.toggle("editing");
        }
        if (task) {
            updateTaskList(task);
            if (task.isDueToday()) displayTodaysTasks();
            else displayUpcomingTasks();
        }
        modal.taskModal.close();
        modal.submitTask.value = "Add Task";
    });
}


export const emptyModal = (modal = displayModal())=> {
    const title = modal.form.title.value;
    modal.form.reset();
    modal.taskModal.close();
    return title;
}




export const updateTaskList = (task) => {
    const listElement = document.createElement("li");
    const taskContainer = document.createElement("div");
    const taskDueDate = document.createElement("span");
    taskContainer.classList.add("task-container");
    taskDueDate.classList.add("task-due-date");
    taskDueDate.innerText = task.getDueDate();
    listElement.innerText = task.getTitle();
    listElement.classList.add("task");
    listElement.classList.add(task.getTitle().replaceAll(/\s/g, ""));
    taskContainer.setAttribute("data-","isActiveTask");
    taskContainer.appendChild(listElement);
    taskContainer.appendChild(taskDueDate);
    return taskContainer;
}


export const updateTaskCount = () => {
    const numTasks = document.querySelector(".num-tasks");
    if(document.querySelector(".main-text").classList.contains("upcoming")) {
        console.log("upcoming " + Task.upcomingTasksCount);
        if (Task.upcomingTasksCount <= 0) {
        numTasks.innerText = "No Tasks Today";
         } else if (Task.upcomingTasksCount === 1) {
         numTasks.innerText = `${Task.upcomingTasksCount} task`
        } else {
        numTasks.innerText = `${Task.upcomingTasksCount} tasks`
        }
    } else {
        console.log("today " + Task.todaysTasksCount);
        if (Task.todaysTasksCount <= 0) {
        numTasks.innerText = "No Tasks Today";
        } else if (Task.todaysTasksCount === 1) {
        numTasks.innerText = `${Task.todaysTasksCount} task`
        } else {
        numTasks.innerText = `${Task.todaysTasksCount} tasks`
        }
    }
    
}


export const editTaskInfo = (task) => {
    const taskModal = displayModal();
    taskModal.submitTask.classList.toggle("editing");
    taskModal.deletionButton.classList.toggle("hide");
    taskModal.title.value = task.title;
    taskModal.description.value = task.description;
    taskModal.date.value = task.formattedDate;
    taskModal.submitTask.value = "Edit Task";
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
}

export const displayUpcomingTasks = () => {
    const mainText = document.querySelector(".main-text");
    const taskList = document.querySelector(".task-list");
    const numTasks = document.querySelector(".num-tasks");
    mainText.innerText = "Upcoming"
    mainText.appendChild(document.createElement("br"));
    mainText.appendChild(numTasks)
    taskList.innerHTML = "";
    addUpcomingTasksToList();
}
export const displayTodaysTasks = ()=> {
    const mainText = document.querySelector(".main-text");
    const taskList = document.querySelector(".task-list");
    const numTasks = document.querySelector(".num-tasks");
    mainText.innerText = "Today"
    mainText.appendChild(document.createElement("br"));
    mainText.appendChild(numTasks)
    taskList.innerHTML = "";
    addTodaysTasksToList();
};

export const displayTasksByCategory = (catName)=> {
    
}

const addTodaysTasksToList = ()=> {
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

const addUpcomingTasksToList = ()=> {
    const mainText = document.querySelector(".main-text");
    const list = document.querySelector(".task-list");
    mainText.classList.toggle("upcoming");
    if (mainText.classList.contains("today")) mainText.classList.toggle("today");
    console.log(Task.taskList)
    const taskList = document.querySelector(".task-list");
    for(let task of Task.taskList) {
        if(!task.isDueToday()) {
            list.appendChild(updateTaskList(task));
            updateTaskCount();
        }
    }
    updateTaskCount();
}
