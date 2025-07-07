const express = require("express")
const passport = require("./config/passport")
const authRouter = require("./routes/authRouter")
const usersRouter = require("./routes/usersRouter")
const postsRouter = require("./routes/postsRouter")

require("dotenv").config()
// cors? Si lo añado, añadir también en la teoría.

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize())

const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

const main = async () => {
    const data = await prisma.comment.findMany()
    console.log(data)
}

main()

// Routes

app.use("/auth", authRouter)
// app.use("/users", usersRouter)
app.use("/posts", postsRouter)
// app.use("/comments")


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App is listening on port ${PORT}.`))