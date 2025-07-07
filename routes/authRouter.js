const { Router } = require("express")
const authController = require("../controllers/authController")

const authRouter = Router()

authRouter.post("/signup", authController.createUser)
authRouter.post("/login", authController.loginUser)
// authRouter.post("/logout")

module.exports = authRouter