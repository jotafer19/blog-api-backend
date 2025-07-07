const authServices = require("../services/authService")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body)
    const hashedPassword = await bcryptjs.hash(password, 10)

    const user = await authServices.createUser(username, email, hashedPassword)

    res.status(201).json({ message: "User created", user })
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists in database
    const user = await authServices.getUserByEmail(email)

    // Check if passwords match
    const isMatch = await bcryptjs.compare(password, user.password)

    // Create a payload to avoid putting the whole user object in the token (don't expose password hash)
    // const payload = {
    //     id: user.id,
    //     username: user.username,
    //     email: user.email,
    //     role: user.role
    // }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY)
    res.json({ accessToken })
}