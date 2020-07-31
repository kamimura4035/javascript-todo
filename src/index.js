import { element } from "./render";
import { TodoListModel, TodoModel } from "./model";

const input = document.getElementById("input");
const todoListView = document.getElementById("todoList");

const todoListModel = new TodoListModel();

input.addEventListener("keyup", event => {
  if (event.key === "Enter") {
    const message = event.target.value;
    // modelを追加
    // r追記
    const todo = new TodoModel(message);
    todoListModel.add(todo);
    todoListRender(todoListModel);

    // xボタンのイベント設置
    // 変更
    event.target.value = "";
  }
});

const todoListRender = todoListModel => {
  const ul = element`<ul></ul>`;
  todoListModel.todos.forEach(todo => {
    const li = element`
    <li>${todo.name}<span id=${
      todo.id
    } class="delete-button">x</span></li>      
    `;
    li.addEventListener("click", event => {
      // const todoId = event.target.id;
      // modelから削除
      // todoListRender(todoListModel);
    });
    ul.appendChild(li);
  });
  todoListView.innerHTML = "";
  todoListView.appendChild(ul);
};
