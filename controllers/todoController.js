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

// Get Todos
const getTodos = async (req, res) => {
  try {
    let todos;

    // Admin can see all todos
    if (req.user.role === "Admin") {
      todos = await Todo.find().populate(
        "assignedTo",
        "name email role"
      );
    }
    // Employee can only see their own todos
    else {
      todos = await Todo.find({
        assignedTo: req.user._id,
      }).populate(
        "assignedTo",
        "name email role"
      );
    }

    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Todo
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    // Employee can update only their own todos
    if (
      req.user.role !== "Admin" &&
      todo.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Todo Updated Successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    // Employee can delete only their own todos
    if (
      req.user.role !== "Admin" &&
      todo.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    await Todo.findByIdAndDelete(req.params.id);

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