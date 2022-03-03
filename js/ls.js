class LS {
  constructor() {
    this.categories;
    this.todos;
  }

  getCategoriesFromLS() {
    if (localStorage.getItem("categories") === null) {
      this.categories = [];
    } else {
      this.categories = JSON.parse(localStorage.getItem("categories"));
    }

    return this.categories;
  }

  setCategoryToLS(text) {
    this.categories = this.getCategoriesFromLS();
    this.categories.push(text);
    localStorage.setItem("categories", JSON.stringify(this.categories));
  }

  deleteCategoryFromLS(text, categories, todos) {
    categories.forEach(function (category, index) {
      if (category === text) {
        categories.splice(index, 1);
      }
    });

    const deletedCategoryTodos = todos.filter(
      (todo) => todo.todoCategory !== text
    );
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("todos", JSON.stringify(deletedCategoryTodos));
  }

  getTodosFromLS() {
    if (localStorage.getItem("todos") === null) {
      this.todos = [];
    } else {
      this.todos = JSON.parse(localStorage.getItem("todos"));
    }
    return this.todos;
  }

  setTodoToLS(
    todoTitle,
    todoDescription,
    todoCategory,
    todoImportance,
    todoDate,
    todoTime
  ) {
    this.todos = this.getTodosFromLS();
    this.todos.push({
      todoTitle: todoTitle,
      todoDescription: todoDescription,
      todoCategory: todoCategory,
      todoImportance: todoImportance,
      todoDate: todoDate,
      todoTime: todoTime,
      doneTask: false,
    });
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
  deleteTodoFromLS(text, todos) {
    todos.forEach(function (todo, index) {
      if (todo.todoDescription === text) {
        todos.splice(index, 1);
      }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
