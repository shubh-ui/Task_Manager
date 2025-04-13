const jwt = require("jsonwebtoken");
const User = require("../models/User");


// Middleware to protect route

const protect = async (req, res, next) => {
    try {
        const token = req.header.authorization;

        if (token && token.startsWith("Bearer")) {
            token = token.split(" ")[1]; //Extract token;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next()
        }
        else {
            res.status(401).message({ message: "Not authorized, No token" });
        }
    } catch (error) {
        res.status(401).message({ message: "Token failed", error: error.message })
    }
}

//middleware to access admin only

const adminOnly = (req, res, next) => {
    if (req.user && req.user.role == "admin") {
        next();
    }
    else {
        res.status(403).message({ message: "Access denied, Admin only" })
    }
}


module.exports = { protect, adminOnly }