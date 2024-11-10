import { format, toDate, isToday} from "date-fns";
import { saveTasksToLocalStorage } from "./localstorage";
export const Task = class {
    static todaysTasksCount = 0;
    static upcomingTasksCount = 0;
    static taskList = [];
    constructor(title, description, dueDate, priority, category) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.category = category;
        this.complete = false;
        this.dueDate = dueDate
        let dueYear = dueDate.substring(0, 4);
        let dueMonth = dueDate.substring(5, 7);
        let dueDay = dueDate.substring(8);
        this.dueDate = new Date(dueYear, dueMonth - 1, dueDay);
        this.formattedDate = format(this.dueDate, "PPP");
    }
    getTitle() {
        return this.title;
    }
    getDueDate() {
        return "due " + this.formattedDate;
    }
    getDescription() {
        return this.description;
    }
    getPriority() {
        return this.priority;
    }
    format() {
        return `${title} ${description} ${this.dueDate} ${this.priority} ${notes}`;
    }
    FormattedDate(date) {
        this.formattedDate = date;
    }
    isDueToday() {
        return isToday(this.dueDate);
    }
}

Task.prototype.getTitle = function() {
    return this.title
}
Task.prototype.getDueDate = function() {
    return "due " + this.formattedDate;
}
Task.prototype.getDescription = function() {
    return this.description
}
Task.prototype.getPriority = function() {
    return this.priority
}

Task.prototype.format = function() {
    return `${title} ${description} ${this.dueDate} ${this.priority} ${notes}`;
}
Task.prototype.formattedDate = function() {
    this.formattedDate = date;
}
Task.prototype.isToday = function() {
    return isToday(this.dueDate);
}



export const createTask = () => {
    const titleInput = document.querySelector('form input[name="title"]');
    const descriptionInput = document.querySelector('form input[name="description"]');
    const dueDateInput = document.querySelector('form input[name="dueDate"]');
    const priorityInput = document.querySelector(".priority");
    const categoryInput = document.querySelector(".cat")
    const taskInfo = [
        titleInput.value.trim(),
        descriptionInput.value.trim(),
        dueDateInput.value,
        priorityInput.value,
        categoryInput.value,
    ];
    if (!taskInfo[0]) {
        return null;
    }
    titleInput.value = "";
    descriptionInput.value = "";
    dueDateInput.classList.remove("selected");
    const newTask = new Task(...taskInfo)
    if (newTask.isDueToday()) Task.todaysTasksCount++;
    else Task.upcomingTasksCount++;
    Task.taskList.push(newTask);
    saveTasksToLocalStorage();
    return newTask;
}


export const deleteTask = (taskName) => {
    let task;
    for (let i = 0; i < Task.taskList.length; i++) {
        if (Task.taskList[i].title === taskName) {
            task = Task.taskList[i];
            Task.taskList.splice(i, 1);
            break;
        }
    }
    console.log(Task.taskList);
    if (task.isDueToday) Task.todaysTasksCount--;
    else Task.upcomingTasksCount--;
    saveTasksToLocalStorage();
}

export const taskCompleted = () => {
    this.complete = true;
    deleteTask(this);
    taskList.splice(taskList.indexOf(this), 1);
}
