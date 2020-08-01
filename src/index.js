import { TodoListModel, TodoModel } from "./model";
import { TodoListView } from "./view";

const input = document.getElementById("input");
const todoListContainer = document.getElementById("todoList");
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
  // viewが増えても、ここで管理すればOK。すばらしい
});

// callback関数を配下のcomponentにわたしているなあ
const todoListRender = todoListModel => {
  const todoListView = new TodoListView();
  const todoListElement = todoListView.createElement(todoListModel.todos, {
    onUpdateTodo: ({ id, checked }) => {
      todoListModel.update({ id, checked });
    },
    onDeleteTodo: ({ id }) => {
      todoListModel.remove({ id });
    }
  });
  todoListContainer.innerHTML = "";
  todoListContainer.appendChild(todoListElement);
};
