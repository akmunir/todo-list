import { format, toDate, isToday} from "date-fns";
export const Task = class {
    static taskCount = 0;
    static taskList = [];
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.category = "";
        this.complete = false;
        this.dueDate = dueDate
        console.log(dueDate)
        let dueYear = dueDate.substring(0, 4);
        let dueMonth = dueDate.substring(5, 7);
        console.log(dueMonth + " due month");
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
    const newTask = new Task(...taskInfo)
    Task.taskList.push(newTask);
    return newTask;
}


export const deleteTask = (taskName) => {
    for (let i = 0; i < Task.taskList.length; i++) {
        if (Task.taskList[i].title === taskName) {
            Task.taskList.splice(i, 1);
            break;
        }
    }
    Task.taskCount--;
}
