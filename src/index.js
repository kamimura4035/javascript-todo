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

    // xボタンのイベント設置
    event.target.value = "";
  }
});

const todoListRender = todoListModel => {
  const ul = element`<ul></ul>`;
  todoListModel.todos.forEach(todo => {
    const li = element`
    <li id="${todo.id}">${todo.name} x</li>      
    `;
    li.addEventListener("click", event => {
      const todoId = event.target.id;
      todoListModel.remove(todoId);
      todoListRemoveRender(todoId);
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
