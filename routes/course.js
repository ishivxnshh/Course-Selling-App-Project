const { Router } = require('express');

const courseRouter = Router();

courseRouter.post("/purchase", function (req, res) {
    res.json({ message: "Course purchased successfully" });
});

courseRouter.get("/preview", function (req, res) {
    res.json({ message: "Course preview" });
});

module.exports = {
    courseRouter: courseRouter
};