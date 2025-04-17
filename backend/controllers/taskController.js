const Task = require("../models/Task");
const Project = require("../models/Project")

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

const getTaskById = async (req, res) => {
    try {
        const taskId = req.params.id;
        const userId = req.user._id;

        // Fetch task and populate projectId to access project data
        const task = await Task.findById(taskId).populate('projectId');
        if (!task) {
            return res.status(404).json({ message: "Task not found." });
        }

        const project = task.projectId;
        if (!project) {
            return res.status(404).json({ message: "Project associated with this task not found." });
        }

        // Access control: Check if user is either the creator or a member
        const isProjectCreator = project.createdBy.toString() === userId.toString();
        const isProjectMember = project.members.some(
            member => member.toString() === userId.toString()
        );

        if (!isProjectCreator && !isProjectMember) {
            return res.status(403).json({ message: "Access denied to this task." });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error("Get task by ID error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


// @desc    Create Task
// @route   POST /api/tasks/
// @access  Private

const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            attachments,
            todoChecklist,
            projectId
        } = req.body;

        if (!projectId) {
            return res.status(400).json({ message: "Project ID is required" });
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Check if the user is the project creator (admin role enforcement)
        if (project.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Only the project creator can create tasks" });
        }

        if (!Array.isArray(assignedTo)) {
            return res.status(400).json({ message: "assignedTo must be an array of user IDs" });
        }

        // Optional: Validate assignees are project members
        const invalidAssignees = assignedTo.filter(
            userId => !project.members.map(m => m.toString()).includes(userId)
        );

        if (invalidAssignees.length > 0) {
            return res.status(400).json({ message: "One or more assigned users are not members of the project" });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user._id,
            attachments,
            todoChecklist,
            projectId
        });

        res.status(201).json({ message: "Task created successfully", task });
    } catch (error) {
        console.error("Task creation error:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


// @desc    Update Task
// @route   PUT /api/task/:id
// @access  Private

const updateTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        // console.log(req.body)
        if(!task) return res.status(404).json({message: "Task not found."});

        const { title, description, dueDate, priority, status, attachments } = req.body;
        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.priority = priority || task.priority;
        task.status = status || task.status;
        task.attachments = attachments || task.attachments;


        const updatedTask = await task.save();

        res.status(200).json({message: "Task updated sucessfully", updatedTask});
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


module.exports = { getDashboardData, getUserDashboardData, getTasks, getTaskById, createTask, updateTask, deleteTask }