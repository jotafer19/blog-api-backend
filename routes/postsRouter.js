const { Router } = require("express")
const postsController = require("../controllers/postsController")

const postsRouter = Router()

postsRouter.get("/", postsController.getPublishedPosts)
postsRouter.get("/:postId", postsController.getPostById)
postsRouter.get("/:postId/comments", postsController.getPostComments)

postsRouter.post("/", postsController.createPost)
postsRouter.post("/:postId/comments", postsController.createComment)

postsRouter.put("/:postId", postsController.editPost)
postsRouter.put("/:postId/comments/:commentId", postsController.editComment)

postsRouter.delete("/:postId", postsController.deletePost)
postsRouter.delete("/:postId/comments/:commentId", postsController.deleteComment)


module.exports = postsRouter