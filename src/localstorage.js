import {Task} from "./task.js";
import { categoryList, addCategory} from "./category";

export const saveTasksToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(Task.taskList))
}
export const loadTasksFromLocalStorage = () => {
    if (localStorage.getItem("tasks")) {
        for (let task of JSON.parse(localStorage.getItem("tasks"))) {
            Object.setPrototypeOf(task, Task.prototype)
            console.log(task);
            Task.taskList.push(task);
        } 
    }
}

export const saveCatagoriesToLocalStorage = () => {
    localStorage.setItem("categories", JSON.stringify(categoryList.categoryCount));
}

export const loadCategoriesFromLocalStorage = () => {
    const categories = JSON.parse(localStorage.getItem("categories"));
    if (categories) {
        for (let cat of categories) {
            addCategory(cat);
        } 
    }
};