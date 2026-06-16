const Todo = require("../models/Todo");

// Create Todo
const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create({
      ...req.body,
      assignedTo: req.user._id,
    });

    res.status(201).json({
      message: "Todo Created Successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-in User Todos Only
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({
      assignedTo: req.user._id,
    });

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Own Todo Only
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        assignedTo: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found or not authorized",
      });
    }

    res.status(200).json({
      message: "Todo Updated Successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Own Todo Only
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      assignedTo: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found or not authorized",
      });
    }

    res.status(200).json({
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};