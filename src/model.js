// model導入
export class TodoListModel {
  constructor() {
    this.todos = [];
  }
  add(todo) {
    this.todos.push(todo);
  }
  remove(id) {
    this.todos = this.todos.filter(todo => todo.id !== Number(id));
  }
}

export class TodoModel {
  constructor(name) {
    this.id = new Date().getTime();
    this.name = name;
  }
}
