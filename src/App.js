import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      todos: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:5000/api/add-todo",
      data: {
        title: this.state.title,
        done: false,
      },
      "Content-Type": "application/json",
    })
      .then((res) => {
        this.setState({
          todos: [res.data, ...this.state.todos],
          title: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleDelete = (id) => {
    axios({
      method: "DELETE",
      url: `https://localhost:5000/api/delete-todo/${id}`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderTodos = () => {
    return this.state.todos.map((todo) => {
      return (
        <div key={todo.id} className="todo-item">
          <input type="checkbox" />
          <p>{todo.title}</p>
          <button onClick={() => this.handleDelete(todo.id)}>X</button>
        </div>
      );
    });
  };

  componentDidMount() {
    axios({
      method: "GET",
      url: "http://localhost:5000/api/get-all-todos",
    })
      .then((res) => {
        console.log(res);
        this.setState({
          todos: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="app">
        <h1>Todo List</h1>
        <form onSubmit={this.handleSubmit} className="add-todo">
          <input
            type="text"
            placeholder="Add Todo"
            onChange={this.handleChange}
            value={this.state.title}
          />
          <button type="submit">Add</button>
        </form>

        {this.renderTodos()}
      </div>
    );
  }
}

export default App;
