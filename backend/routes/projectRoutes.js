const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { createProject, addMembersToProject } = require("../controllers/projectContoller");

const router = express.Router();

router.post("/", protect, adminOnly, createProject);
router.post("/:projectId/members", protect, adminOnly, addMembersToProject);

module.exports = router;