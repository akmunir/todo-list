import { format, toDate} from "date-fns";
export const Task = class {
    static taskCount = 1;
    static taskList = [];
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.category = "";
        this.complete = false;
        this.formattedDate = "";
    }
    getTitle() {
        return this.title;
    }
    getDueDate() {
        return this.dueDate;
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
    setformattedDate(date) {
        this.formattedDate = date;
    }
}


export const createTask = () => {
    const titleInput = document.querySelector('form input[name="title"]');
    const descriptionInput = document.querySelector('form input[name="description"]');
    const dueDateInput = document.querySelector('form input[name="dueDate"]');
    const priorityInput = document.querySelector('form .selected');
    let dueYear = dueDateInput.value.substring(0, 4);
    let dueMonth = dueDateInput.value.substring(5, 7);
    let dueDay = dueDateInput.value.substring(8);
    let dueDate = new Date(dueYear, dueMonth, dueDay);
    const formattedDueDate = dueDateInput.value;
    dueDate = format(dueDate, "'due' PPPP");
    const taskInfo = [
        titleInput.value.trim(),
        descriptionInput.value.trim(),
        dueDate,
        priorityInput.value.trim(),
    ];
    if (!taskInfo[0]) {
        return null;
    }
    titleInput.value = "";
    descriptionInput.value = "";
    dueDateInput.classList.remove("selected");
    Task.taskCount++;
    const newTask = new Task(...taskInfo)
    newTask.setformattedDate(formattedDueDate);
    Task.taskList.push(newTask);
    return newTask;
}

export const deleteTask = (taskName) => {
    for (let task of Task.taskList) {
        if (task.title === taskName) {
            Task.taskList.remove(task);
            break;
        }
    }
    Task.taskCount--;
}

