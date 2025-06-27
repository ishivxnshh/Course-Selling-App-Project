const { Router } = require('express');
const adminRouter = Router();
const { adminModel } = require("../db");

adminRouter.post("/signup", function (req, res) {
    res.json({ message: "Admin signup route" });
})

adminRouter.post("/login", function (req, res) {
    res.json({ message: "Admin login route" });
})

adminRouter.post("/course", function (req, res) {
    res.json({ message: "Course created successfully" });
});

adminRouter.put("/course", function (req, res) {
    res.json({ message: "Course updated successfully" });
});

adminRouter.get("/course/bulk", function (req, res) {
    res.json({ message: "Bulk course retrieval route" });
});

module.exports = {
    adminRouter: adminRouter
};