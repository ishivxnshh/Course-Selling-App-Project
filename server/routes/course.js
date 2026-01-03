const { Router } = require('express');
const { authMiddleware } = require("../middlewares/auth");
const { purchaseModel, courseModel } = require('../db');
const courseRouter = Router();

courseRouter.post("/purchase", authMiddleware, async function (req, res) {

    if (req.user.role !== "user") {
        return res.status(403).json({
            message: "Only users can purchase courses"
        });
    }

    const userId = req.user.id;
    const courseId = req.body.courseId;

    const existingPurchase = await purchaseModel.findOne({
        userId: userId,
        courseId: courseId
    })

    if (existingPurchase) {
        return res.status(400).json({
            message: "Course already purchased"
        });
    }

    await purchaseModel.create({
        userId: userId,
        courseId: courseId
    })

    res.json({
        message: "You have successfully bought the course"
    })
});

courseRouter.get("/preview", async function (req, res) {
    
    const courses = await courseModel.find({});

    res.json({
        courses: courses
    })
});

module.exports = {
    courseRouter: courseRouter
};