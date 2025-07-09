const { PrismaClient } = require("@prisma/client")
const CustomError = require("../utils/customError")
const prisma = new PrismaClient()

async function getPublishedPosts() {
    return await prisma.post.findMany({
        where: {
            isPublished: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

async function getPostById(postId) {
    return await prisma.post.findUnique({
        where: {
            id: postId
        },
        include: {
            comments: true
        }
    })
}

async function getPostComments(postId) {
    return await prisma.comment.findMany({
        where: {
            postId,
        }
    })
}

async function createPost(title, content, authorId) {
    return await prisma.post.create({
        data: {
            title,
            content,
            authorId
        }
    })
}

async function createComment(postId, content, authorId) {
    return await prisma.comment.create({
        data: {
            postId,
            content,
            authorId
        }
    })
}

async function editPost(postId, title, content) {
    return prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            title,
            content
        }
    })
}

async function editComment(commentId, content) {
    return await prisma.comment.update({
        where: {
            id: commentId,
        },
        data: {
            content
        }
    })
}

async function deletePost(postId) {
    const post = await prisma.post.findUnique({
        where: {
            id: postId
        }
    })

    if (!post) return null;

    return await prisma.post.delete({
        where: {
            id: postId
        }
    })
}

async function deleteComment(commentId) {
    const comment = await prisma.comment.findUnique({
        where: {
            id: commentId
        }
    })

    if (!comment) return null

    return await prisma.comment.delete({
        where: {
            id: commentId
        }
    })
}

module.exports = {
    getPublishedPosts,
    getPostById,
    getPostComments,
    createPost,
    createComment,
    editPost,
    editComment,
    deletePost,
    deleteComment
}