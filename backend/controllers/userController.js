const User = require("../models/User");
const Task = require("../models/Task");

const bcrypt = require("bcryptjs");

// @desc    Get all users
// @route   GET /api/users
// @access  Private (admin)

const getUsers = async (req, res) => {
    try {
         const users = await User.find({ role: "member"}).select("-password");

         const userWithTaskCount = await Promise.all(users.map(async (user) => {
            const pendingTask = await Task.countDocuments({ assignedTo: user._id, status: "Pending"});
            const inProgressTask = await Task.countDocuments({ assignedTo: user._id, status: "In Progress"});
            const isCompletedTask = await Task.countDocuments({ assignedTo: user._id, status: "Completed"});

            return {
                ...user._doc,
                pendingTask,
                inProgressTask,
                isCompletedTask
            }

         }))


         res.status(200).json(userWithTaskCount);
    } catch (error) {
        res.status(500).json({ message: "Internal server error." })
    }
}

// @desc   Get user details by id
// @route  GET /api/users/:id
// @access Private

const getUserById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error." })
    }
}


module.exports = { getUsers, getUserById }