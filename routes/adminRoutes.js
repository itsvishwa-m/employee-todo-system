const express = require("express");
const router = express.Router();

const { getUsers } = require("../controllers/adminController");
const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// Admin Route
router.get("/users", protect, adminOnly, getUsers);

module.exports = router;