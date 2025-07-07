const postsService = require("../services/postsService")
const asyncHandler = require("express-async-handler")

exports.getPublishedPosts = async (req, res) => {
    const posts = await postsService.getPublishedPosts()

    res.status(200).json(posts)
}

exports.getPostById = async (req, res) => {
    const { postId } = req.params;

    const post = await postsService.getPostById(postId)

    res.status(200).json({ post })
}

exports.getPostComments = async (req, res) => {
    const { postId } = req.params;

    const post = await postsService.getPostById(postId)
    const comments = post.comments

    res.status(200).json(comments)
}

exports.createPost = async (req, res) => {
    const { id } = req.user;
    const { title, content } = req.body;

    const post = await postsService.createPost(title, content, id)

    res.status(201).json({
        message: "Post created",
        post
    })
}

exports.createComment = async (req, res) => {
    const { id } = req.user
    const { postId } = req.params
    const { content } = req.body

    const comment = await postsService.createComment(postId, content, id)

    res.status(201).json(comment)
}

exports.editPost = async (req, res) => {
    const { postId } = req.params
    const { title, content } = req.body

    const post = await postsService.editPost(postId, title, content)

    res.status(200).json(post)
}

exports.editComment = async (req, res) => {
    const { commentId } = req.params
    const { content } = req.body;

    const comment = await postsService.editComment(commentId, content)

    res.status(200).json(comment)
}

exports.deletePost = async (req, res) => {
    const { postId } = req.params;

    const deletedPost = await postsService.deletePost(postId)

    res.status(200).json({ message: "Deletion done" })
}

exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;

    const deleteComment = await postsService.deleteComment(commentId)

    res.status(200).json({ message: "Deletion done" })
}