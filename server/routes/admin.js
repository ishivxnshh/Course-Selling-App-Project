const { Router } = require('express');
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../config");
const zod = require('zod');
const bcrypt = require('bcrypt');
const { authMiddleware } = require("../middlewares/auth");

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
            errors: parsedDataWithSuccess.error.errors
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
            lastName: lastName,
            role: "admin"
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
            { 
                id: admin._id.toString(),
                role: admin.role
            },    
            JWT_SECRET
        );

        res.json({
            token: token,
            role: admin.role,
            name: admin.firstName
        });
    } else {
        res.status(403).json({
            message: "Incorrect credentials!"
        })
    }
})

adminRouter.post("/course", authMiddleware, async function (req, res) {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access only"
        })
    }

    const adminId = req.user.id;
    const { title, desription, price, imageUrl } = req.body;

    await courseModel.create({
        title: title,
        description: desription,
        price: price,
        imageUrl: imageUrl,
        adminId: adminId
    });

    res.json({
        message: "Course created successfully"
    });
});

adminRouter.put("/course", adminMiddleware, async function (req, res) {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access only"
        })
    }

    const adminId = req.user.id;
    const { title, desription, price, imageUrl, courseId } = req.body;

    await courseModel.updateOne({
        _id: courseId,
        adminId: adminId
    }, {
        title: title,
        description: desription,
        price: price,
        imageUrl: imageUrl
    });

    res.json({
        message: "Course updated successfully"
    });
});

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access only"
        })
    }

    const adminId = req.user.id;
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