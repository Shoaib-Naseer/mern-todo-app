const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedTime: {
      type: Date,
    },
    creationTime: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Todo', TodoSchema);
