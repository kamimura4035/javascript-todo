import { element } from "./render";
import { TodoListModel, TodoModel } from "./model";

const input = document.getElementById("input");
const todoListView = document.getElementById("todoList");
const todoListCountView = document.getElementById("count");
const todoListCheckedCountView = document.getElementById("checkedCount");
const todoListModel = new TodoListModel();

input.addEventListener("keyup", event => {
  if (event.key === "Enter") {
    const message = event.target.value;
    // modelを追加
    const todo = new TodoModel(message);
    todoListModel.add(todo);
    event.target.value = "";
  }
});

// modelに変化があったときの処理をまとめる
todoListModel.onChange(() => {
  // 全体の描画
  todoListRender(todoListModel);
  // countの変更
  todoListCountView.innerText = todoListModel.todos.length;
  // checkCountの変更
  todoListCheckedCountView.innerText = todoListModel.getCheckedTodosCount();
  // viewが増えても、ここで管理すればOK
});

const todoListRender = todoListModel => {
  const ul = element`<ul></ul>`;
  todoListModel.todos.forEach(todo => {
    const checked = todo.checked ? "checked" : "";
    const className = todo.checked ? "checked" : "";
    const li = element`
    <li id="${
      todo.id
    }" class="${className}"><input type="checkbox" ${checked}>${
      todo.name
    } <span>x</span></li>      
    `;
    // x削除ボタンにイベントを紐つける
    const span = li.getElementsByTagName("span")[0];
    span.addEventListener("click", event => {
      const todoId = event.target.parentNode.id;
      todoListModel.remove(todoId);
    });

    // checkboxにイベントをひもつける
    const checkBox = li.getElementsByTagName("input")[0];
    checkBox.addEventListener("change", event => {
      const todoId = event.target.parentNode.id;
      const checked = event.target.checked;
      todoListModel.toggleChecked(todoId, checked);
    });
    ul.appendChild(li);
  });
  todoListView.innerHTML = "";
  todoListView.appendChild(ul);
};
