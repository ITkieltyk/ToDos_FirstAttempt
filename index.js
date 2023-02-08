/**
 * Todo list
 * Zbuduj aplikację, która umożliwia wyświetlanie, dodawanie, usuwanie zadań
 *
 * Wymagania:
 * - Wyświetlenie listy todos
 * - Możliwość dodawania nowego elementu przez formularz z inputem
 * - Możliwość usunięcia konkretnego elementu poprzez kliknięcie X na tym elemencie
 * - Dodanie flagi isCompleted, która będzie renderowała checkbox ze stanem danego zadania. Kliknięcie w checkbox powinno zmienić stan
 * - Optional: Zakończone todos powinny zostać wyświetlone na końcu
 * - Optional: Zapisz todosy do local storage
 */
const app = document.getElementById("app");

const TODOUrl = "https://jsonplaceholder.typicode.com/todos";
let todoCount = 0;
let todoDone = 0;
fetch(TODOUrl)
  .then((response) => response.json())
  .then((json) => {
    // console.log(json);
    // listToDos(json, 10);
    for (let i = 0; i < 10; i++) {
      const todoDiv = document.createElement("div");
      todoDiv.style.order = 0;
      const todoEntries = Object.entries(json[i]);
      for (let i = 0; i < todoEntries.length; i++) {
        const todoLine = document.createElement("p");
        const todoElName = document.createElement("span");
        const todoVal = document.createElement("span");
        todoElName.innerText = `${todoEntries[i][0]}: `;
        todoVal.innerText = `${todoEntries[i][1]}`;
        todoLine.appendChild(todoElName);
        todoLine.appendChild(todoVal);
        todoDiv.appendChild(todoLine);
      }
      const todoToggle = document.createElement("input");
      todoToggle.setAttribute("type", "checkbox");
      todoToggle.setAttribute("id", `${json[i].id}Toggle`);
      todoToggle.addEventListener("click", (e) => {
        if (e.target.parentElement.style.order == "0") {
          e.target.parentElement.style.order = "3";
        } else {
          e.target.parentElement.style.order = "0";
        }
      });
      const todoDel = document.createElement("button");
      todoDel.style.position = "absolute";
      todoDel.style.right = "5px";
      todoDel.style.bottom = "5px";
      todoDel.innerText = "X";
      todoDel.style.width = "fit-content";
      todoDel.addEventListener("click", (e) => {
        const delYes = confirm("Do you want to delete this task?");
        if (delYes) {
          e.target.parentElement.style.display = "none";
        }
      });

      todoDiv.appendChild(todoToggle);
      todoDiv.appendChild(todoDel);

      app.appendChild(todoDiv);
    }
  });
