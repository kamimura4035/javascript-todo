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
  toggleChecked(id, checked) {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        todo.checked = checked;
      }
      return todo;
    });
  }
}

export class TodoModel {
  constructor(name) {
    this.id = new Date().getTime();
    this.name = name;
    this.checked = false;
  }
}
