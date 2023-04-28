import * as React from 'react';
import { fireEvent, queryByTestId, render } from '@testing-library/react';
import App from './App';

test('renders Main Page', () => {
  const doc = render(<App />);
  const header = doc.getByTestId('header');
  const main = doc.getByTestId('main');
  expect(header).toBeInTheDocument();
  expect(main).toBeInTheDocument();
});

// test1: Make sure it creates a todo when a user types
// something in the input and clicks the create button.
test('it creates a new todo', async () => {
  const { getByTestId, findAllByTestId, findByTestId } = render(<App />);

  const inputElement = getByTestId('inputTodo');
  const createButtonElement = getByTestId('createButton');

  // Create the todo.
  fireEvent.change(inputElement, { target: { value: 'Feed my dog.' } });
  fireEvent.click(createButtonElement);

  const todos = await findAllByTestId('todo');
  const todoData = queryByTestId('todo');

  const todosLength = todos.length;

  // The name should be in the document as "Feed my dog."
  expect(todoData.textContent).toBe('Feed my dog.');

  // The input field should be blank.
  expect(inputElement.value).toBe('');

  // The todo should be in the document.
  expect(todoData).toBeInTheDocument();

  // Todos should be increased in the document.
  expect(todos.length).toBe(todosLength + 1);
});

//Test2: deletes a todo

test('deletes a todo', async () => {
  const doc = render(<App />);

  const inputElement = await doc.findByTestId('inputTodo');
  const createButtonElement = await doc.findByTestId('createButton');

  // Create the todo.
  fireEvent.change(inputElement, { target: { value: 'Feed my cat.' } });
  fireEvent.click(createButtonElement);

  const todos = await findAllByTestId('todo');
  const todosLength = todos.length;

  // Get the newly created todo.
  const todo = doc.queryByTestId('todo');

  // Click the delete button on the todo.
  const todoDeleteButton = await doc.findByTestId('delete');
  fireEvent.click(todoDeleteButton);

  // The text should be "0 todos"
  expect(todoCountElement).toHaveTextContent('0 todos');

  // The todo we created should not be in the document.
  expect(todo).not.toBeInTheDocument();

  expect(todos.length).toBe(todosLength - 1);
});
