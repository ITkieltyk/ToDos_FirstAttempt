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
let todoCount = 10;
let todoDone = 0;
const doneCounter = document.createElement("div");
doneCounter.style.position = "absolute";
doneCounter.innerText = `Tasks done: ${todoDone}`;
doneCounter.style.width = "fit-content";
doneCounter.style.right = "5px";
doneCounter.style.top = "5px";
doneCounter.style.alignSelf = "start";
doneCounter.style.zIndex = "2";
app.appendChild(doneCounter);

fetch(TODOUrl)
  .then((response) => response.json())
  .then((json) => {
    // console.log(json);
    // listToDos(json, 10);
    for (let i = 0; i < todoCount; i++) {
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
          todoDone++;
          doneCounter.innerText = `Tasks done: ${todoDone}`;
        } else {
          e.target.parentElement.style.order = "0";
          todoDone--;
          doneCounter.innerText = `Tasks done: ${todoDone}`;
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
