const { Router } = require("express")
const postsController = require("../controllers/postsController")
const isAuthenticated = require("../middleware/isAuthenticated")
const isAdmin = require("../middleware/isAdmin")

const postsRouter = Router()

postsRouter.get("/", postsController.getPublishedPosts)
postsRouter.get("/:postId", postsController.getPostById)
postsRouter.get("/:postId/comments", postsController.getPostComments)

postsRouter.post("/", isAuthenticated, postsController.createPost)
postsRouter.post("/:postId/comments", isAuthenticated, postsController.createComment)

postsRouter.put("/:postId", isAuthenticated, isAdmin, postsController.editPost)
postsRouter.put("/:postId/comments/:commentId", isAuthenticated, postsController.editComment)

postsRouter.delete("/:postId", isAuthenticated, isAdmin, postsController.deletePost)
postsRouter.delete("/:postId/comments/:commentId", isAuthenticated, isAdmin, postsController.deleteComment)


module.exports = postsRouter