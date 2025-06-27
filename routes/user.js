const { Router } = require('express');

const userRouter = Router();

userRouter.post("/signup", function (req, res) {
    res.json({ message: "Signup route" });
});

userRouter.post("/login", function (req, res) {
    res.json({ message: "Login route" });
});

userRouter.get("/purchases", function (req, res) {
    res.json({ message: "Purchases route" });
});

module.exports = {
    userRouter: userRouter
};