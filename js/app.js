const ui = new UI();
const ls = new LS();

const categoryForm = document.querySelector("#addCategoryForm");
const categoryList = document.querySelector("#categories");
const todosContainer = document.querySelector("#todosContainer");
const addTask = document.querySelector("#addNewTask");
const todoStatus = document.querySelector("#status");
const todoImportance = document.querySelector("#importance");
const todoTitle = document.querySelector("#title");
const todoDescription = document.querySelector("#description");
const todoModal = document.querySelector("#todoModal");
const modalButton = document.querySelector("#modalButton");
const categories = document.querySelector("#categories");
const taskName = document.querySelector("#taskName");

loadCategoryItems();
loadTodoItems();

eventListeners();

function eventListeners() {
  categoryForm.addEventListener("submit", addNewCategoryItem);
  categoryList.addEventListener("click", deleteCategoryItem);
  addTask.addEventListener("click", addTodoModal);
  modalButton.addEventListener("click", addNewTodoItem);
  todosContainer.addEventListener("click", deleteTodoItem);
  categories.addEventListener("click", selectedCategory);
  categories.addEventListener("click", selectedCategory);
}

function loadCategoryItems() {
  ls.categories = ls.getCategoriesFromLS();
  if (ls.categories) {
    ls.categories.forEach(function (category) {
      ui.createCategoryItem(category);
    });
  }
}

function loadTodoItems() {
  ui.todosContainer.innerHTML = "";
  ls.todos = ls.getTodosFromLS();
  if (ls.todos) {
    ls.todos.forEach(function (todo) {
      ui.createTodoItem(
        todo.todoTitle,
        todo.todoDescription,
        todo.todoCategory,
        todo.todoImportance,
        todo.todoDate,
        todo.todoTime
      );
    });
  }
}

function addNewCategoryItem(e) {
  if (ui.addNewCategory(e)) {
    ls.setCategoryToLS(ui.input.value);
  }
  ui.categoryInputClear(e);
  e.preventDefault();
}

function deleteCategoryItem(e) {
  if (e.target.className === "far fa-trash-alt") {
    Swal.fire({
      title: "Kategoriyi ve görevlerini silmek istediğine emin misin?",
      text: "Dikkat! Bu işlemi geri alamazsınız!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, sil!",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        ui.deleteCategory(e);

        ls.deleteCategoryFromLS(
          e.target.parentElement.parentElement.textContent,
          ls.categories,
          ls.todos
        );
        loadTodoItems();
        Swal.fire("Silindi!", "Kategori başarıyla silinmiştir.", "success");
      }
    });
  }

  e.preventDefault();
}

function selectedCategory(e) {
  ui.todosContainer.innerHTML = "";
  if (e.target.tagName === "LI") {
    const ulli = document.querySelectorAll("#categories li");
    ulli.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    taskName.textContent = e.target.textContent;
    todos = ls.getTodosFromLS();
    todos.forEach(function (todo) {
      if (e.target.textContent.trim() === "Tüm Görevler") {
        loadTodoItems();
      }
      if (todo.todoCategory === e.target.textContent) {
        ui.createTodoItem(
          todo.todoTitle,
          todo.todoDescription,
          todo.todoCategory,
          todo.todoImportance,
          todo.todoDate,
          todo.todoTime
        );
      }
    });
  }
}

function addTodoModal(e) {
  ls.categories = ls.getCategoriesFromLS();
  ui.addTodoModal(e, ls.categories);
  e.preventDefault();
}

function addNewTodoItem(e) {
  var today = new Date();
  var date =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
  var time = today.toLocaleTimeString();

  ui.addNewTodoItem(e, date, time);
  if (
    !(
      ui.formTitle.value === "" ||
      ui.formDescription.value === "" ||
      ui.formCategory.value === "" ||
      ui.formImportance.value === ""
    )
  ) {
    ls.setTodoToLS(
      ui.formTitle.value,
      ui.formDescription.value,
      ui.formCategory.value,
      ui.formImportance.value,
      date,
      time
    );
  }

  ui.todoInputClear();
}

function deleteTodoItem(e) {
  if (e.target.className === "far fa-trash-alt") {
    Swal.fire({
      title: "Görevi silmek istediğine emin misin?",
      text: "Dikkat! Bu işlemi geri alamazsınız!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Evet, sil!",
      cancelButtonText: "Hayır",
    }).then((result) => {
      if (result.isConfirmed) {
        e.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        ls.deleteTodoFromLS(
          e.target.parentElement.parentElement.nextSibling.nextSibling.textContent.trim(),
          ls.todos
        );
        Swal.fire("Silindi!", "Görev başarıyla silinmiştir.", "success");
      }
    });
  }

  e.preventDefault();
}
