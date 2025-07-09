const { body } = require("express-validator")
const authService = require("../services/authService")

const signUpValidator = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("Username is required")
        .isLength({ min: 2, max: 20 })
        .withMessage("Username should be between 2 and 20 characters long"),
    body("email")
        .trim()
        .normalizeEmail()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("You should enter a valid email")
        .custom(async (value) => {
            const isUsed = await authService.getUserByEmail(value)

            if (isUsed) throw new Error("Email is already in use");

            return true
        }),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 4, max: 16 })
        .withMessage("Password should be between 4 and 16 characters long")
        .matches(/[A-Z]/)
        .withMessage("Password should contain at least an uppercase letter.")
        .matches(/[a-z]/)
        .withMessage("Password should contain at least a lowercase letter.")
        .matches(/\d/)
        .withMessage("Password should contain at least a digit."),
    body("confirmPassword")
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match")
            }

            return true;
        })
]

const postValidator = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({ max: 255 })
        .withMessage("Title should be at most 255 characters long"),
    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required")
]

const commentValidator = [
    body("content")
        .trim()
        .notEmpty()
        .withMessage("Content is required")
]

module.exports = {
    signUpValidator,
    postValidator,
    commentValidator
}