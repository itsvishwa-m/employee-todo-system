const express = require("express");
const router = express.Router();

const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const { protect } = require("../middleware/authMiddleware");

// Create Todo (Protected)
router.post("/", protect, createTodo);

// Get All Todos (Protected)
router.get("/", protect, getTodos);

// Update Todo (Protected)
router.put("/:id", protect, updateTodo);

// Delete Todo (Protected)
router.delete("/:id", protect, deleteTodo);

module.exports = router;