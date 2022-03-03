class UI {
  constructor() {
    this.input = document.querySelector("#txtCategoryName");
    this.categoryList = document.querySelector("#categories");
    this.formCategory = document.querySelector("#categoryModal");
    this.formTitle = document.querySelector("#titleModal");
    this.formDescription = document.querySelector("#descriptionModal");
    this.formImportance = document.querySelector("#importanceModal");
    this.modalButton = document.querySelector("#modalButton");
    this.todosContainer = document.querySelector("#todosContainer");
    this.todo = document.querySelector("#todo");
    this.editTodo = document.querySelector("#editModal");
  }
  addNewCategory(e) {
    let text = this.input.value;
    if (text === "") {
      Swal.fire({
        icon: "error",
        title: "Hata...",
        text: "Kategori ismi boş bırakılamaz!",
      });
      return false;
    } else if (text.length < 2 || text.length > 20) {
      Swal.fire({
        icon: "error",
        title: "Hata...",
        text: "Kategori ismi 2 ya da 20 karakterden fazla olamaz!",
      });
      return false;
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Kategori Başarıyla Oluşturuldu!",
        showConfirmButton: false,
        timer: 1500,
      });
      this.createCategoryItem(text);
      e.preventDefault();
      return true;
    }
  }

  createCategoryItem(text) {
    const newCategory = document.createElement("li");
    newCategory.innerHTML = `${text}<a href="#"><i class="far fa-trash-alt"></i></a>`;
    this.categoryList.appendChild(newCategory);
  }

  deleteCategory(e) {
    e.target.parentElement.parentElement.remove();
  }

  addTodoModal(e, categories) {
    this.formCategory.innerHTML = `
      <option value="" selected disabled>Lütfen bir kategori seçiniz..</option>
      ${categories.map((category) => {
        return `<option value="${category}" >${category}</option>`;
      })}
    `;
    e.preventDefault();
  }

  addNewTodoItem(e, date, time) {
    if (
      this.formTitle.value === "" ||
      this.formDescription.value === "" ||
      this.formCategory.value === "" ||
      this.formImportance.value === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Hata...",
        text: "Tüm alanları doldurunuz!",
      });
    } else {
      this.createTodoItem(
        this.formTitle.value,
        this.formDescription.value,
        this.formCategory.value,
        this.formImportance.value,
        date,
        time
      );

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Görev Başarıyla Oluşturuldu!",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    e.preventDefault();
  }

  createTodoItem(
    todoTitle,
    todoDescription,
    todoCategory,
    todoImportance,
    todoDate,
    todoTime
  ) {
    const newTodo = document.createElement("div");
    newTodo.setAttribute("id", "todo");
    newTodo.className = "col-md-3 mgb-20";
    newTodo.innerHTML = `
    <div class="card h-100">
      <div class="card-body">
        <div class="todo-feature">
          <h6 id="status" class="todo-status">${todoCategory}</h6>
          <h6 id="importance" class="todo-importance">${todoImportance}</h6>
        </div>
        <div class="todo-info">
          <div class="todo-name">
            <h5 id="title" class="card-title">${todoTitle}</h5>
          </div>
          <div class="todo-operation">
            
            <i class="far fa-trash-alt" ></i>
          </div>
        </div>
        <div class="todo-description">
          <p id="description" class="card-text">
            ${todoDescription}
          </p>
        </div>
        <div class="todo-actions">
          <span><i class="bi bi-clock-fill"></i>${todoDate}</span>
          <span>${todoTime}</span>
        </div>
      </div>
    </div>
    `;
    this.todosContainer.appendChild(newTodo);
  }

  deleteTodo(e) {
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

        Swal.fire("Silindi!", "Görev başarıyla silinmiştir.", "success");
      }
    });
  }
  categoryInputClear(e) {
    this.input.value = "";
    e.preventDefault();
  }
  todoInputClear(e) {
    this.formTitle.value = "";
    this.formCategory.value = "";
    this.formDescription.value = "";
    this.formImportance.value = "";
  }
}
