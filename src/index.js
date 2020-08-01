import { element } from "./render";
import { TodoListModel, TodoModel } from "./model";

const input = document.getElementById("input");
const todoListView = document.getElementById("todoList");
const todoListModel = new TodoListModel();

input.addEventListener("keyup", event => {
  if (event.key === "Enter") {
    const message = event.target.value;
    // modelを追加
    const todo = new TodoModel(message);
    todoListModel.add(todo);
    todoListRender(todoListModel);

    event.target.value = "";
  }
});

const todoListRender = todoListModel => {
  const ul = element`<ul></ul>`;
  todoListModel.todos.forEach(todo => {
    const li = element`
    <li id="${todo.id}"><input type="checkbox">${
      todo.name
    } <span>x</span></li>      
    `;

    // x削除ボタンにイベントを紐つける
    const span = li.getElementsByTagName("span")[0];
    span.addEventListener("click", event => {
      const todoId = event.target.parentNode.id;
      todoListModel.remove(todoId);
      todoListRemoveRender(todoId);

      // 数を表示しているUIを表示する
    });

    // checkboxにイベントをひもつける
    const input = li.getElementsByTagName("input")[0];
    input.addEventListener("change", event => {
      const todoId = event.target.parentNode.id;
      const checked = event.target.checked;
      todoListModel.toggleChecked(todoId, checked);
      todoListCheckedRender(todoId, checked);
    });

    ul.appendChild(li);
  });
  todoListView.innerHTML = "";
  todoListView.appendChild(ul);
};

const todoListRemoveRender = todoId => {
  const todo = document.getElementById(todoId);
  todo.remove();
};

const todoListCheckedRender = (todoId, checked) => {
  const todo = document.getElementById(todoId);
  if (checked) {
    todo.className = "checked";
  } else {
    todo.className = "";
  }
};
