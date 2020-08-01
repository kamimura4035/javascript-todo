import { element } from "./render";
// viewクラスをつくる
class TodoView {
  // イベントが発生したときの具体的な処理はViewクラスの外側に定義
  createElement(todo, { onUpdateTodo, onDeleteTodo }) {
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
    span.addEventListener("click", () => {
      console.log(todo.id);
      onDeleteTodo({
        id: todo.id
      });
    });
    // checkboxにイベントをひもつける
    const checkBox = li.getElementsByTagName("input")[0];
    checkBox.addEventListener("change", () => {
      onUpdateTodo({
        id: todo.id,
        checked: !todo.checked
      });
    });
    return li;
  }
}

export class TodoListView {
  createElement(todos, { onUpdateTodo = () => {}, onDeleteTodo = () => {} }) {
    const todoListElement = element`<ul />`;
    todos.forEach(todo => {
      const todoItemView = new TodoView(todo);
      const todoItemElement = todoItemView.createElement(todo, {
        onDeleteTodo,
        onUpdateTodo
      });
      todoListElement.appendChild(todoItemElement);
    });
    return todoListElement;
  }
}
