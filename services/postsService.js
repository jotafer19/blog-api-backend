const { PrismaClient } = require("@prisma/client")
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
        }
    })
}

async function createPost(title, content, authorId) {
    // add user
    return await prisma.post.create({
        data: {
            title,
            content,
            authorId
        }
    })
}

async function createComment(postId, content) {
    // move to comment
    // add user
    return await prisma.comment.create({
        data: {
            postId,
            content
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
    return await prisma.post.delete({
        where: {
            id: postId
        }
    })
}

async function deleteComment(commentId) {
    return await prisma.comment.delete({
        where: {
            id: commentId
        }
    })
}

module.exports = {
    getPublishedPosts,
    getPostById,
    createPost,
    createComment,
    editPost,
    editComment,
    deletePost,
    deleteComment
}