const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI;

const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin");
const { courseRouter } = require("./routes/course");
const app = express();
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({
        message: "Server is healthy"
    });
});

// Route Mounting
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);

async function main() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("Connected Successfully!!")
        app.listen(PORT, () => {
            console.log(`Server is running on https://localhost:${PORT}`)
        })
    }
    catch(error) {
        console.error("MongoDB connection FAILED!!")
        console.error(error.message);
        process.exit(1);
    }
}

main();