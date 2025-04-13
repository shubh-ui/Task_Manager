const mongoos = require('mongoose');

const connectDB = async () => {
    const MONGO_URI = "mongodb://localhost:27017/taskManager"
    try {
        await mongoos.connect(MONGO_URI);
        console.log("Mongo DB connected");
    } catch (error) {
        console.error("Error connecting mongo DB", error);
        process.exit(1);
    }
}

module.exports = connectDB;