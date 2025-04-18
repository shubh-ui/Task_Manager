const jwt = require("jsonwebtoken");
const User = require("../models/User");
const envConstants = require("../constants/envConstants");


// Middleware to protect route

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1]; //Extract token;
            const decoded = jwt.verify(token, envConstants.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next()
        }
        else {
            res.status(401).json({ message: "Not authorized, No token" });
        }
    } catch (error) {
        res.status(401).json({ message: "Token failed", error: error.message })
    }
}

//middleware to access admin only

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role == "admin") {
        next();
    }
    else {
        res.status(403).json({ message: "Access denied, Admin only" })
    }
}


module.exports = { protect, adminOnly }