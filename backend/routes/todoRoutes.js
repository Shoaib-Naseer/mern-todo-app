const express = require('express');
const router = express.Router();

const {
  addTodo,
  getAllTodos,
  editTodo,
  deleteTodo,
  deleteAllTodos,
  getTodo,
  completeTodo
} = require('../controller/TodoController');

router.post('/addTodo', addTodo);
router.get('/', getAllTodos);
router.get('/getTodo/:id', getTodo);
router.put('/:id', editTodo);
router.put('/completeTodo/:id', completeTodo);
router.delete('/:id', deleteTodo);
router.get('/delete', deleteAllTodos);

module.exports = router;
