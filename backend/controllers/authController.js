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

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(403).json({ message: "User is already exist" });
        }

        let role = "member";
        if (adminInviteToken && adminInviteToken == envConstants.ADMIN_INVITE_TOKEN) {
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
        const { email, password } = req.body;

        console.log(req.body)
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({message: "Invalid email or password"});
        }

        // return the user

        res.status(200).json({
            _id: user._id,
            name:user.name,
            email:user.email,
            profileImageUrl:user.profileImageUrl,
            role: user.role,
            token: generateToken(user._id)
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.json })
    }
}


// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.json })
    }
}

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: "User not found." })
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();

        res.status(201).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id)
        })

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message })
    }
}


module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile }
