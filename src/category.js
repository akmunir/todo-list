export const createCategory = ()=> {
    const categoryContainer = document.querySelector(".category-container");
    const sidebar = document.querySelector("aside");
    const input = document.createElement("input");
    input.classList.add("add-category");
    input.classList.add("hide");
    input.placeholder = "Category";
    const submitCategory = document.createElement("button");
    submitCategory.innerText = "Add";
    submitCategory.classList.add("submit-category");
    submitCategory.classList.add("hide");
    categoryContainer.appendChild(input);
    categoryContainer.appendChild(submitCategory);

    categoryContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("category-container") || event.target.classList.contains("new-category")) {
            input.classList.toggle("hide");
            submitCategory.classList.toggle("hide");
        };
    });
    submitCategory.addEventListener("click", (event)=> {           
        input.classList.toggle("hide");
        submitCategory.classList.toggle("hide");
        if (!(input.value.trim() === "")) {
 
            const item = document.createElement("div");
            item.classList.add("sidebar-item");
            const category = document.createElement("buton");
            category.innerText = input.value;
            category.classList.add("sidebar-button")
            item.appendChild(category);
            categoryList.addCategory(input.value);
            sidebar.appendChild(item);
            input.value = "";
        }
});

}

export const categoryList =  {
     categoryCount: [],
     addCategory: (category) => {
        categoryList.categoryCount.push(category);
    },
}