const { Router } = require('express');

const courseRouter = Router();

courseRouter.post("/course/purchase", function (req, res) {

})

courseRouter.get("/course/preview", function (req, res) {

})

module.exports = {
    courseRouter: courseRouter
}