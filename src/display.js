import {createTask, deleteTask, Task} from "./task.js";


export const displayModal = ()=> {
    const taskModal = document.querySelector(".task-modal");
    const priorityDisplay = document.querySelector(".dropbtn");
    const prioritySelection = document.querySelector(".dropdown-content");
    const form = document.querySelector('form');
    const cancelbtn = document.querySelector(".cancel")
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const date = document.querySelector("#date");
    const deletionButton = document.querySelector(".modal-button");
    const submitTask = document.querySelector(".submit-task");
    taskModal.showModal();
    return {taskModal, priorityDisplay, prioritySelection, form, cancelbtn, title, description, date, deletionButton, submitTask};
}
export const displayTaskCreation = () => {
    const modal = displayModal();
    modal.deletionButton.classList.toggle("hide");
    modal.prioritySelection.addEventListener("click", (event) => {
        if (event.target.classList.contains("low")) {
            event.target.classList.add("selected");
            modal.priorityDisplay.innerText = "Low";
        } else if (event.target.classList.contains("med")) {
            event.target.classList.add("selected");
            modal.priorityDisplay.innerText = "Medium";
        } else if (event.target.classList.contains("high")) {
            event.target.classList.add("selected");
            modal.priorityDisplay.innerText = "High";
        }
    })
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
        }
        modal.priorityDisplay.innerText = "Priority"
        modal.taskModal.close();
        modal.submitTask.value = "Add Task";
    });
}


export const emptyModal = (modal = displayModal())=> {
    modal.priorityDisplay.innerText = "Priority" 
    const title = modal.form.title.value;
    modal.form.reset();
    modal.taskModal.close();
    return title;
}




export const updateTaskList = (task) => {
    const list = document.querySelector(".task-list");
    const listElement = document.createElement("li");
    const taskContainer = document.createElement("div");
    const taskDueDate = document.createElement("span");
    taskContainer.classList.add("task-container");
    taskDueDate.classList.add("task-due-date");
    taskDueDate.innerText = task.getDueDate();
    listElement.innerText = task.getTitle();
    listElement.classList.add("task");
    listElement.classList.add(task.getTitle());
    taskContainer.setAttribute("data-","isActiveTask");
    taskContainer.appendChild(listElement);
    taskContainer.appendChild(taskDueDate);
    list.appendChild(taskContainer);
    updateTaskCount();
}


export const updateTaskCount = () => {
    const numTasks = document.querySelector(".num-tasks");
    if (Task.taskCount <= 0) {
        numTasks.innerText = "No Tasks Today";
    } else if (Task.taskCount === 1) {
        numTasks.innerText = `${Task.taskCount} task`
    } else {
        numTasks.innerText = `${Task.taskCount} tasks`
    }
}


export const editTaskInfo = (task) => {
    const taskModal = displayModal();
    taskModal.submitTask.classList.toggle("editing");
    taskModal.deletionButton.classList.toggle("hide");
    taskModal.title.value = task.title;
    taskModal.description.value = task.description;
    taskModal.date.value = task.formattedDate;
    taskModal.priorityDisplay.innerText = task.priority;
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

const addTodaysTasksToList = ()=> {
    const taskList = document.querySelector(".task-list");
    for(let task of Task.taskList) {
        if (task.isDueToday()) {
            updateTaskList(task);
        }
    }
    updateTaskCount();
}

const addUpcomingTasksToList = ()=> {
    let upcomingTaskCount = 0;
    console.log(Task.taskList)
    const taskList = document.querySelector(".task-list");
    for(let task of Task.taskList) {
        if(!task.isDueToday()) {
            updateTaskList(task);
        }
    }
    updateTaskCount();
}
