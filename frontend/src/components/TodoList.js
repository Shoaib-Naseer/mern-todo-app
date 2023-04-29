import React, { useRef, useState } from 'react';
import { completeTodo, editTodo } from '../services/api';

import '../global.css';
import './todoList.css';

const TodoList = ({ todo, deleteHandler, getAllTodos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [newTodo, setNewTodo] = useState(todo.task);
  const inputRef = useRef(null);

  const editToggler = () => {
    setIsEditing(true);
    inputRef.current.focus();
    inputRef.current.select();
  };

  const handleKeyPress = (event, id, data) => {
    if (event.key === 'Enter') {
      editTodoTask(id, data);
    }
  };

  const completeTodoTask = async (id, data) => {
    try {
      await completeTodo(id, data);
      getAllTodos();
      setIsEditing(false);
      setShowOptions(false);
    } catch (error) {
      alert(error);
    }
  };

  const editTodoTask = async (id, data) => {
    if (newTodo.trim() !== '') {
      try {
        await editTodo(id, data);
        getAllTodos();
        setIsEditing(false);
        setShowOptions(false);
      } catch (error) {
        alert(error);
      }
    } else {
      alert('Task Cant be empty');
    }
  };

  const optionBtns = (
    <div className="icons">
      <button
        type="button"
        className="material-symbols-outlined"
        onClick={editToggler}
        aria-label="Edit the Todo"
      >
        edit
      </button>
      <button
        class="material-symbols-outlined"
        onClick={() => deleteHandler(todo._id)}
        aria-label="Delete the Todo"
        data-testid="delete"
      >
        delete
      </button>

      <button
        type="button"
        className="material-symbols-outlined"
        onClick={() => setShowOptions(false)}
        aria-label="Hide options"
      >
        close
      </button>
    </div>
  );

  const menuBtn = (
    <div className="icons">
      <button
        className="material-symbols-outlined"
        aria-label="Show Options"
        onClick={() => setShowOptions(true)}
      >
        drag_indicator
      </button>
    </div>
  );

  const viewTemplate = (
    <li data-testid="todo" className="item d-flex align-items-center">
      <label htmlFor="checkbox" aria-label="Toggle Task completed"></label>
      <input
        type="checkbox"
        id="checkbox"
        defaultChecked={todo.completed}
        onClick={() =>
          completeTodoTask(todo._id, { completed: !todo.completed })
        }
      />
      <div className="todo-wrapper">
        <p>{todo.task}</p>
      </div>
      {showOptions ? optionBtns : menuBtn}
    </li>
  );

  const editingTemplate = (
    <li className="item d-flex align-items-center">
      <div className="todo-wrapper">
        <input
          type="text"
          id={`todo-${todo._id}`}
          value={newTodo}
          ref={inputRef}
          onKeyPress={(e) => handleKeyPress(e, todo._id, { task: newTodo })}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <label
          htmlFor={`todo-${todo._id}`}
          className="todo-label"
          aria-label="Edit todo"
        ></label>
      </div>
      <div className="icons">
        <button
          type="button"
          className="material-symbols-outlined"
          onClick={() => editTodoTask(todo._id, { task: newTodo })}
          aria-label="Save changes"
        >
          done
        </button>

        <button
          type="button"
          className="material-symbols-outlined"
          onClick={() => setIsEditing(false)}
          aria-label="Cancel editing"
        >
          close
        </button>
      </div>
    </li>
  );
  return <>{isEditing ? editingTemplate : viewTemplate}</>;
};

export default TodoList;
