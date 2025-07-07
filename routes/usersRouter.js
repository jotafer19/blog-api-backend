const { Router } = require("express")
const usersController = require("../controllers/usersController")

const usersRouter = Router()

usersRouter.post("/signup", usersController.createUser)


module.exports = usersRouter;