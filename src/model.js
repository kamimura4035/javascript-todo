import { EventEmitter } from "./event";

// model導入
export class TodoListModel extends EventEmitter {
  constructor() {
    super();
    this.todos = [];
  }
  getCheckedTodosCount() {
    return this.todos.filter(todo => todo.checked === true).length;
  }
  onChange(listener) {
    this.addEventListener("change", listener);
  }
  add(todo) {
    this.todos.push(todo);
    this.emit("change");
  }
  remove(id) {
    this.todos = this.todos.filter(todo => todo.id !== Number(id));
    this.emit("change");
  }
  toggleChecked(id, checked) {
    this.todos = this.todos.map(todo => {
      if (todo.id === Number(id)) {
        todo.checked = checked;
      }
      return todo;
    });
    this.emit("change");
  }
}

export class TodoModel {
  constructor(name) {
    this.id = new Date().getTime();
    this.name = name;
    this.checked = false;
  }
}
