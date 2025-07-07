const { Router } = require("express")
const usersController = require("../controllers/usersController")

const usersRouter = Router()

usersRouter.post("/signup", usersController.createUser)
// usersRouter.post("/login")
// usersRouter.post("/admin")

module.exports = usersRouter;