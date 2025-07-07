const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function createUser(username, email, password) {
    return await prisma.user.create({
        data: {
            username,
            email,
            password
        }
    })
}

async function getUserById(id) {
    return prisma.user.findUnique({
        where: {
            id
        }
    })
}

async function getUserByEmail(email) {
    return prisma.user.findUnique({
        where: {
            email
        }
    })
}

module.exports = {
    createUser,
    getUserById,
    getUserByEmail
}