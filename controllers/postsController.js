const postsService = require("../services/postsService")
const asyncHandler = require("express-async-handler")
const CustomError = require("../utils/customError")
const stringValidator = require("validator")
const { validationResult } = require("express-validator")
const { postValidator, commentValidator } = require("../middleware/validators")

exports.getPublishedPosts = asyncHandler(async (req, res) => {
    const posts = await postsService.getPublishedPosts()

    res.status(200).json({
        success: true,
        data: posts,
        message: "Posts retrieved successfully"
    })
})

exports.getPostById = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!stringValidator.isUUID(postId)) throw new CustomError("Invalid UUID format", 400)

    const post = await postsService.getPostById(postId)

    if (!post) throw new CustomError("Post not found", 404)

    res.status(200).json({
        success: true,
        data: post,
        message: "Post retrieved successfully"
    })
})

exports.getPostComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!stringValidator.isUUID(postId)) throw new CustomError("Invalid UUID format", 400)

    const post = await postsService.getPostById(postId)

    if (!post) throw new CustomError("Post not found", 404)

    const comments = post.comments

    res.status(200).json({
        success: true,
        data: comments,
        message: "Comments retrieved successfully"
    })
})

exports.createPost = [
    postValidator,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
                message: "Post cannot be created"
            })
        }

        const { id } = req.user;
        const { title, content } = req.body;

        const post = await postsService.createPost(title, content, id)

        res.status(201).json({
            success: true,
            post,
            message: "Post created successfully",
        })
    })
]

exports.createComment = [
    commentValidator,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
                message: "Comment cannot be created"
            })
        }

        const { id } = req.user
        const { postId } = req.params
        const { content } = req.body

        if (!stringValidator.isUUID(postId)) throw new CustomError("Invalid UUID format", 400)

        const post = await postsService.getPostById(postId)

        if (!post) throw new CustomError("Post not found", 404)

        const comment = await postsService.createComment(postId, content, id)

        res.status(201).json({
            success: true,
            comment,
            message: "Comment created successfully"
        })
    })
]

exports.editPost = [
    postValidator,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
                message: "Post cannot be created"
            })
        }

        const { postId } = req.params
        const { title, content } = req.body

        if (!stringValidator.isUUID(postId)) throw new CustomError("Invalid UUID format", 400)

        const post = await postsService.editPost(postId, title, content)

        res.status(200).json({
            success: true,
            post,
            message: "Post updated successfully"
        })
    })
]

exports.editComment = [
    commentValidator,
    asyncHandler(async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array(),
                message: "Comment cannot be created"
            })
        }

        const { commentId } = req.params
        const { content } = req.body;

        if (!stringValidator.isUUID(commentId)) throw new CustomError("Invalid UUID format", 400)

        const comment = await postsService.editComment(commentId, content)

        res.status(200).json({
            success: true,
            comment,
            message: "Comment updated successfully"
        })
    })
]

exports.deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if (!stringValidator.isUUID(postId)) throw new CustomError("Invalid UUID format", 400)

    const post = await postsService.deletePost(postId)

    if (!post) throw new CustomError("Post not found", 400)

    res.status(200).json({
        success: true,
        message: "Post deleted successfully"
    })
})

exports.deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;

    if (!stringValidator.isUUID(commentId)) throw new CustomError("Invalid UUID format", 400)

    const comment = await postsService.deleteComment(commentId)

    if (!comment) throw new CustomError("Comment not found", 400)

    res.status(200).json({
        success: true,
        message: "Comment deleted successfully"
    })
})