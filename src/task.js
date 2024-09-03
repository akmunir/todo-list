import { format, toDate} from "date-fns";
export const Task = class {
    static taskCount = 1;
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.category = "";
        this.complete = false;
    }
    getTitle() {
        return this.title;
    }

    getDueDate() {
        return this.dueDate;
    }
    format() {
        return `${title} ${description} ${this.dueDate} ${this.priority} ${notes}`;
    }
}


export const createTask = () => {
    const titleInput = document.querySelector('form input[name="title"]');
    const descriptionInput = document.querySelector('form input[name="description"]');
    const dueDateInput = document.querySelector('form input[name="dueDate"]');
    console.log(dueDateInput.value);
    const priorityInput = document.querySelector('form .selected');
    let dueYear = dueDateInput.value.substring(0, 4);
    let dueMonth = dueDateInput.value.substring(5, 7);
    let dueDay = dueDateInput.value.substring(8);
    let dueDate = new Date(dueYear, dueMonth, dueDay);
    console.log(dueDate);
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
    console.log(taskInfo);
    return new Task(...taskInfo);
}

