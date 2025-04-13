const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const envConstants = require("../constants/envConstants");


const generateToken = (userId) => {
    return jwt.sign({ id: userId }, envConstants.JWT_SECRET, { expiresIn: "7d" });
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public

const registerUser = async (req, res) => {
    try {
        const { name, email, password, profileImageUrl, adminInviteToken } = req.body;

        console.log(req.body)

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(403).json({ message: "User is already exist" })
        }
    console.log("Register method called")

        let role = "member";
        if (adminInviteToken && adminInviteToken == process.env.ADMIN_INVITE_TOKEN) {
            role = "admin";
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            role
        })

        // return the created user
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            profileImageUrl: newUser.profileImageUrl,
            role: newUser.role,
            token: generateToken(newUser._id)
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}


// @desc    Login user
// @route   POST /api/auth/Login
// @access  Public

const loginUser = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.json })
    }
}


// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private

const getUserProfile = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.json })
    }
}

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private

const updateUserProfile = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.json })
    }
}


module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile }
