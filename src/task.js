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
    format() {
        return `${title} ${description} ${this.dueDate} ${this.priority} ${notes}`;
    }
}


export const createTask = () => {
    const titleInput = document.querySelector('form input[name="title"]');
    const descriptionInput = document.querySelector('form input[name="description"]');
    const dueDateInput = document.querySelector('form input[name="dueDate"]');
    const priorityInput = document.querySelector('form .selected');
    
    const taskInfo = [
        titleInput.value.trim(),
        descriptionInput.value.trim(),
        dueDateInput.value,
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

