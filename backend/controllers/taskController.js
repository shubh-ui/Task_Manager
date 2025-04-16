const Task = require("../models/Task");

// @desc    Get all dashboard data (admin only)
// @route   GET /api/tasks/dashboardData
// @access  Admin
const getDashboardData = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
}

// @desc    Get user dashboard data 
// @route   GET /api/tasks/user-dashboard-data
// @access  Private

const getUserDashboardData = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
}


// @desc   Get all task 
// @route  GET /api/tasks/
// @access Private

const getTasks = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
}


// @desc   Get task by id
// @route  GET /api/tasks/:id
// @access Private

const getTasksById = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
}


// @desc    Create Task
// @route   POST /api/tasks/
// @access  Private

const createTask = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
}


// @desc    Update Task
// @route   PUT /api/task/:id
// @access  Private

const updateTask = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error." })
    }
}


// @desc   Delete a task
// @route  DELETE /api/tasks/:id
// @access Private (Admin)

const deleteTask = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error." });
    }
}


module.exports = { getDashboardData, getUserDashboardData, getTasks, getTasksById, createTask, updateTask, deleteTask }