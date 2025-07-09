const authServices = require("../services/authService")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator")
const { signUpValidator } = require("../middleware/validators")
const CustomError = require("../utils/customError")

exports.createUser = [
    signUpValidator,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
                message: "Validation error"
            })
        }

        const { username, email, password } = req.body;

        const hashedPassword = await bcryptjs.hash(password, 10)

        const user = await authServices.createUser(username, email, hashedPassword)

        res.status(201).json({
            success: true,
            message: "User created successfully"
        })
    })
]

exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists in database
    const user = await authServices.getUserByEmail(email)

    if (!user) return res.status(401).json({
        success: false,
        message: "Incorrect email or password"
    })

    // Check if passwords match
    const isMatch = await bcryptjs.compare(password, user.password)

    if (!isMatch) return res.status(401).json({
        success: false,
        message: "Incorrect email or password"
    })

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY)

    res.status(200).json({
        success: true,
        accessToken,
        message: "Login successfully"
    })
})