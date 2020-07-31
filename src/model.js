// model導入
export class TodoListModel {
  constructor() {
    this.todos = [];
  }
  add(todo) {
    this.todos.push(todo);
  }
}

export class TodoModel {
  constructor(name) {
    this.id = new Date().getTime();
    this.name = name;
  }
}
