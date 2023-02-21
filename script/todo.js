//add to do items in list:
//IIef:

(function () {
  const form = document.querySelector("[data-todo-form]");
  const list = document.querySelector("[data-todo-list]");

  form.addEventListener("submit", handleAddTodo);

  //event delegation:
  list.addEventListener("click", handleDelete);

  //sa tina minte daca am dat refresh:
  const storageKey = "todoList";
  const savedList = JSON.parse(localStorage.getItem(storageKey));
  let todoList = [];
  if (savedList) {
    todoList = savedList;
    renderList(todoList);
  }


  function handleAddTodo(e) {
    e.preventDefault();
    const inputElem = e.target.elements.title;
    const todoText = inputElem.value;

    todoList.push(todoText);
    //sa tina minte daca dam refresh:
    localStorage.setItem(storageKey, JSON.stringify(todoList));

    //empty textbox: form.reset(); //reseteaza toate inputurile formului
    inputElem.value = inputElem.defaultValue;

    //focus pe textbox:
    inputElem.focus();

    renderList(todoList);
  }

  function handleDelete(e) {
    const itemPos = e.target.dataset.deleteTodo;

    //verificam daca click-ul s-a dat pe elementul pe care doream noi
    if (!itemPos) {
      return;
    }
    //stergere element:
    todoList.splice(itemPos, 1);
    localStorage.setItem(storageKey, JSON.stringify(todoList));
    // e.target.parentNode.remove();
    renderList(todoList);
  }

  function renderList(todoList) {
    list.innerHTML = "";
    for (let i=0;i< todoList.length; i++) {
      const item = todoList[i];
      //linia asta e riscant dpdv al securitatii:
      // list.innerHTML += `<li>${todoText}</li>`;

      //creare lista noua:
      const listItem = document.createElement("li");
      //adaugare in lista:
      listItem.textContent = item;
      //afisare lista:
      list.append(listItem);

      //creare buton de stergere:
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "&times;";
      deleteBtn.classList.add("btn");

      //fiecare element din lista sa aibe butonul de stergere:
      listItem.append(deleteBtn);

      //creare functie pentru deleteBtn:
      // deleteBtn.addEventListener('click', handleDelete );
      deleteBtn.dataset.deleteTodo = i;
    }
  }
})();
