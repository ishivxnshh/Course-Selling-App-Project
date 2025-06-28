const { Router } = require('express');
const userRouter = Router();
const { userModel, purchaseModel } = require('../db');
const jwt = require('jsonwebtoken');
const  { JWT_USER_PASSWORD } = require("../config");
const zod = require('zod');
const bcrypt = require('bcrypt');
const userMiddleware = require('../middlewares/admin');

userRouter.post("/signup", async function (req, res) {

    const requiredBodySchema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(6),
        firstName: zod.string().min(5).max(15),
        lastName: zod.string().min(5).max(15)
    })

    const parsedDataWithSuccess = requiredBodySchema.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parsedDataWithSuccess.error
        });
    }

    const { email, password, firstName, lastName } = req.body;

    let errorThrown = false;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
    } catch (error) {
        return res.status(500).json({
            message: "User already exists!"
        });
        errorThrown = true;
    }
    if (!errorThrown) {
        res.json({
            message: "User created successfully!"
        });
    }
});

userRouter.post("/login", async function (req, res) {

    const requiredBodySchema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(6),
    });

    const parsedDataWithSuccess = requiredBodySchema.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        return res.status(400).json({
            message: "Invalid input",
            errors: parsedDataWithSuccess.error.errors
        });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
        const token = jwt.sign(
            { id: user._id.toString() },
            JWT_USER_PASSWORD
        );

        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials!"
        })
    }
});

userRouter.get("/purchases",userMiddleware, async function (req, res) {
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId: userId
    })

    res.json({
        purchases: purchases
    })
});

module.exports = {
    userRouter: userRouter
};