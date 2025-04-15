const multer = require("multer");

// consfigure store

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

// File filter 

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    }
    else {
        cb(new Error("Only allowed types are .jpeg, .png, .jpg"), false)
    }
}

const upload = multer({storage, fileFilter});

module.exports = upload;