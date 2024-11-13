import { saveCatagoriesToLocalStorage } from "./localstorage";

export const createCategory = () => {
    const categoryContainer = document.querySelector(".category-container");
    const input = document.createElement("input");
    input.classList.add("add-category", "hide");
    input.placeholder = "Category";
    const submitCategory = document.createElement("button");
    submitCategory.innerText = "Add";
    submitCategory.classList.add("submit-category", "hide");

    categoryContainer.appendChild(input);
    categoryContainer.appendChild(submitCategory);

    categoryContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("category-container") || event.target.classList.contains("new-category")) {
            input.classList.toggle("hide");
            submitCategory.classList.toggle("hide");
        }
    });

    submitCategory.addEventListener("click", () => {
        input.classList.toggle("hide");
        submitCategory.classList.toggle("hide");

        const categoryName = input.value.trim();
        if (categoryName) {
            console.log("created?")
            addCategory(categoryName);
            categoryList.addCategory(categoryName); 
            saveCatagoriesToLocalStorage();
            input.value = "";
        }
    });
};

export const addCategory = (categoryName) => {
    const categoryContent = document.querySelector(".categories");
    const sidebarItem = document.createElement("div");
    sidebarItem.classList.add("sidebar-item");
    const category = document.createElement("button");
    category.classList.add("sidebar-button");
    category.innerText = categoryName;
    sidebarItem.appendChild(category);
    categoryContent.appendChild(sidebarItem);
};




export const categoryList =  {
     categoryCount: [],
     addCategory: (category) => {
        categoryList.categoryCount.push(category);
        addCategoryToDropDown(category);
    },
}

 const addCategoryToDropDown = (category) => {
    console.log("added to drpwn")
    const dropdown = document.querySelector(".dropbtn");
        const newCat = document.createElement("option");
        newCat.value = category;
        newCat.innerText = category;
        dropdown.appendChild(newCat);
}