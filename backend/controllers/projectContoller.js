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


const addMembersToProject = async (req, res) => {
    const projectId = req.params.projectId;
    const memberIds  = req.body.members;

    try {
        const project = await Project.findById(projectId);

        if(!project) return res.status(404).json({message: " Project not found."});

        if(project.createdBy.toString() != req.user._id) {
            return res.status(403).json({message: "Only the project creator can add members"})
        }

        if(!Array.isArray(memberIds)) {
            return res.status(400).json({message: "memberIds must be an array"});
        }

        const newMembers = memberIds.filter(memberId => !project.members.includes(memberId));

        if(newMembers.length) {
            project.members.push(...newMembers);
            await project.save();
        }

        res.status(201).json({message: "members added sucessfully.", newMembers});


    } catch (error) {
        res.status(500).json({message : "Internal server error."});
    }
}



module.exports = { createProject , addMembersToProject }