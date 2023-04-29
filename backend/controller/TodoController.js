const Todo = require('../model/ToDoModel');

exports.addTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const newTodo = new Todo({
      task,
      completed: false,
      completedTime: null,
      creationTime: Date.now(),
    });
    const result = await newTodo.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const result = await Todo.find().sort({ createdAt: 'desc' });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findById(id);
    if (!result) {
      return res.status(404).json('Todo Not Found');
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAllTodos = async (req, res) => {
  try {
    await Todo.deleteMany({});
    res.status(200).json('DELETED ALL');
  } catch (err) {
    res.status(501).json({ error: err.message });
  }
};

exports.editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json('Todo Not Found');
    }
    const result = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const completedTime = Date.now();
    const { completed } = req.body;

    if (completed) {
      req.body = { id, completed, completedTime };
    } else {
      req.body = { id, completed, completedTime: null };
    }

    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json('Todo Not Found');
    }
    const result = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(501).json('Todo Not Found', err);
    }
    await Todo.findByIdAndDelete(id);
    res.status(200).json('Successfully Deleted');
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
