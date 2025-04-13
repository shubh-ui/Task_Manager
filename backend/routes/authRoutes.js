const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();


// const loginUser = require("../controllers/authController/loginUser")
// const getUserProfile = require("../controllers/authController/getUserProfile")
// const updateUserProfile = require("../controllers/authController/updateUserProfile");
// const { protect } = require("../middlewares/authMiddleware");


router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/profile",protect, getUserProfile);
// router.put("/profile",protect, updateUserProfile);

module.exports = router;