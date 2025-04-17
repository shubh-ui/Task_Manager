const Project = require("../models/Project")

const createProject = async (req, res) => {
    const { name, description, members } = req.body;
    console.log("project route called")
    const userId = req.user._id;

    try {

        const project = await Project.create({
            name,
            description,
            createdBy: userId,
            members
        });

        await project.save();
        res.status(201).json({ message: "Project created successfully", project });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};



module.exports = { createProject }