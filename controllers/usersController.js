const usersServices = require("../services/usersService")
const asyncHandler = require("express-async-handler")

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    const user = await usersServices.createUser(username, email, password)

    res.status(201).json({ message: "User created", user })
}