const { Router } = require('express');
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD } = require("../config");
const zod = require('zod');
const bcrypt = require('bcrypt');
const adminMiddleware = require("../middlewares/admin");

adminRouter.post("/signup", async function (req, res) {

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

        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        });
    } catch (error) {
        return res.status(500).json({
            message: "Admin already exists!"
        });
        errorThrown = true;
    }
    if (!errorThrown) {
        res.json({
            message: "Admin created successfully!"
        });
    }
})

adminRouter.post("/login", async function (req, res) {

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

    const admin = await adminModel.findOne({ email: email });

    if (!admin) {
        return res.status(404).json({
            message: "Admin not found"
        });
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (passwordMatch) {
        const token = jwt.sign(
            { id: admin._id.toString() },
            JWT_SECRET
        );

        res.json({
            token: token
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials!"
        })
    }
})

adminRouter.post("/course", adminMiddleware, async function (req, res) {

    const adminId = req.adminId;

    const { title, desription, price, imageUrl } = req.body;

    await courseModel.create({
        title: title,
        description: desription,
        price: price,
        imageUrl: imageUrl,
        adminId: adminId
    });

    res.json({
        message: "Course created successfully",
        courseId: course._id
    });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {

    const adminId = req.adminId;

    const { title, desription, price, imageUrl, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        adminId: adminId
    }, {
        title: title,
        description: desription,
        price: price,
        imageUrl: imageUrl,
        adminId: adminId
    });

    res.json({
        message: "Course updated successfully",
        courseId: course._id
    });
});

adminRouter.get("/course/bulk", async function (req, res) {
    
    const adminId = req.adminId;

    const courses = await courseModel.find({
        adminId: adminId
    });

    res.json({
        message: "Courses fetched successfully",
        courses: courses
    });
});

module.exports = {
    adminRouter: adminRouter
};