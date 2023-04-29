import axios from 'axios';

const URL = 'http://localhost:5000';

export const addTodo = async (data) => {
  try {
    return await axios.post(`${URL}/addTodo`, data);
  } catch (err) {
    throw new Error('error while calling add Todo api', err);
  }
};

export const getTodos = async () => {
  try {
    return await axios.get(`${URL}/`);
  } catch (err) {
    throw new Error('error while calling get all Todo api', err);
  }
};

export const getTodo = async (id) => {
  try {
    return await axios.get(`${URL}/getTodo/${id}`);
  } catch (err) {
    return 'error while calling get Todo api', err;
  }
};

export const editTodo = async (id, data) => {
  try {
    return await axios.put(`${URL}/${id}`, data);
  } catch (err) {
    throw new Error('error while calling edit Todo api', err);
  }
};

export const completeTodo = async (id, data) => {
  try {
    return await axios.put(`${URL}/completeTodo/${id}`, data);
  } catch (err) {
    throw new Error('error while calling edit Todo api', err);
  }
};

export const deleteTodo = async (id) => {
  try {
    return await axios.delete(`${URL}/${id}`);
  } catch (err) {
    throw new Error('error while calling delete Todo api', err);
  }
};
