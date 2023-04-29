import { useEffect, useState } from 'react';

import './global.css';
import './App.css';

import Item from './components/TodoList';

import Avatar from './images/avatar.jpg';

import { addTodo, deleteTodo, getTodos } from './services/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoTask, setNewTodoTask] = useState('');

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    try {
      const response = await getTodos();
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await deleteTodo(id);
      getAllTodos();
    } catch (error) {
      alert(error);
    }
  };

  const addTodoTask = async (e) => {
    e.preventDefault();
    if (newTodoTask.trim() !== '') {
      try {
        console.log({ task: newTodoTask });
        await addTodo({ task: newTodoTask });
        setNewTodoTask('');
        getAllTodos();
      } catch (error) {
        alert(error);
      }
    } else {
      alert('Please enter a todo item.');
    }
  };

  return (
    <div className="App">
      <div className="d-flex align-items-center justify-content-center">
        <div className="container">
          <header data-testid="header">
            <div className="avatar">
              <img src={Avatar} alt="Profile picture" />
            </div>

            <form
              className="todo-form d-flex align-items-center"
              onSubmit={(e) => addTodoTask(e)}
            >
              <label htmlFor="newTodo" className="visibility-none"></label>
              <input
                type="text"
                id="newTodo"
                data-testid="inputTodo"
                placeholder="Add Todo"
                value={newTodoTask}
                onChange={(e) => setNewTodoTask(e.target.value)}
              />
              <button
                className="material-symbols-outlined"
                type="submit"
                data-testid="createButton"
              >
                add
              </button>
            </form>
          </header>

          <main
            data-testid="main"
            className="todo-form d-flex justify-content-between align-items-center"
          >
            <button className="material-symbols-outlined" aria-label="Menu">
              menu
            </button>
            <h2>To do today</h2>
            <button
              className="material-symbols-outlined"
              aria-label="Expand more"
            >
              expand_more
            </button>
          </main>

          <section data-testid="section" className="list">
            <ul role="list">
              {todos.map((todo) => (
                <Item
                  todo={todo}
                  deleteHandler={deleteHandler}
                  key={todo._id}
                  getAllTodos={getAllTodos}
                />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
