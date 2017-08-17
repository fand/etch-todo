/** @jsx etch.dom */
const etch = require('etch')

class Todo {
  constructor(name) {
    this.name = name;
    this.isChecked = false;
  }
}

class TodoItem {
  constructor (props, children) {
    this.props = props;
    etch.initialize(this)
  }

  render () {
    const todo = this.props.todo;
    return <li>
      <input type="checkbox" checked={todo.isChecked} onClick={this.onClick}/>
      {todo.isChecked ? <del>{todo.name}</del> : todo.name}
    </li>
  }

  onClick = () => {
    this.props.toggle(this.props.i)
  }

  update (props, children) {
    this.props = props;
    return etch.update(this)
  }

  async destroy () {
    await etch.destroy(this)
  }
}

class App {
  constructor (props, children) {
    this.todos = [];
    etch.initialize(this)
  }

  onChange = (e) => {
    if (e.keyCode === 13) {
      return this.onClick();
    }
  }

  onClick = () => {
    this.todos.push(new Todo(this.refs.input.value));
    this.refs.input.value = '';
    etch.update(this);
  }

  toggleTodo = (i) => {
    this.todos[i].isChecked = !this.todos[i].isChecked;
    etch.update(this);
  }

  render () {
    return <div>
      <input ref="input" type="text" onKeyDown={this.onChange}/>
      <button onClick={this.onClick}>add</button>
      <ul>
        <li>All: {this.todos.length}</li>
        <li>Active: {this.todos.filter(t => !t.isChecked).length}</li>
        <li>Completed: {this.todos.filter(t =>  t.isChecked).length}</li>
      </ul>
      <ul>
        {this.todos.map((todo, i) => <TodoItem i={i} todo={todo} toggle={this.toggleTodo}/>)}
      </ul>
    </div>
  }

  update (props, children) {
    return etch.update(this)
  }

  async destroy () {
    await etch.destroy(this)
  }
}

const app = new App();
document.body.appendChild(app.element);
