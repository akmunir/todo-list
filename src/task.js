export const Task = class {
    constructor(title, description, dueDate, priority, notes) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
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
    const notesInput = document.querySelector('form input[name="notes"]');
    const dueDateInput = document.querySelector('form input[name="dueDate"]');
    
    const taskInfo = [
        titleInput.value.trim(),
        descriptionInput.value.trim(),
        dueDateInput.value,
        "",
        notesInput.value.trim()
    ];
    if (!taskInfo[0]) {
        return null;
    }

    // Clear inputs after task creation
    titleInput.value = "";
    descriptionInput.value = "";
    dueDateInput.value = "";
    notesInput.value = "";

    console.log(taskInfo);
    return new Task(...taskInfo);
}

