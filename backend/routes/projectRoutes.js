const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { createProject } = require("../controllers/projectContoller");

const router = express.Router();

router.post("/", protect, adminOnly, createProject);

module.exports = router;