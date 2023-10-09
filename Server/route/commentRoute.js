import express from "express";

//========================= IMPORT FROM CONTROLLERS =====================================//

import { addComment, deleteComment, getComments } from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const commentRouter = express.Router()


commentRouter.post("/", verifyToken, addComment)
commentRouter.delete("/:id", verifyToken, deleteComment)
commentRouter.get("/:videoId", getComments)

export default commentRouter