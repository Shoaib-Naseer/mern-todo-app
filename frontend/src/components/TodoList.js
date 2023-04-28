import React, { useRef, useState } from 'react';
import { editTodo } from '../services/api';

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
        onClick={() => setShowOptions(true)}
      >
        drag_indicator
      </button>
    </div>
  );

  const viewTemplate = (
    <li data-testid="todo" className="item d-flex align-items-center">
      <label for="checkbox"></label>
      <input
        type="checkbox"
        id="checkbox"
        defaultChecked={todo.completed}
        onClick={() => editTodoTask(todo._id, { completed: !todo.completed })}
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
          aria-label="Edit todo"
          onKeyPress={(e) => handleKeyPress(e, todo._id, { task: newTodo })}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <label htmlFor={`todo-${todo._id}`} className="todo-label"></label>
      </div>
      <div className="icons">
        <button
          type="button"
          className="material-symbols-outlined"
          onClick={() => editTodoTask(todo._id, { text: newTodo })}
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