import express from "express";

//========================= IMPORT FROM CONTROLLERS =====================================//

import { deleteUser, disLike, getUser, like, subscribed, unsubscribed, update } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const userRouter = express.Router()


userRouter.put("/:id", verifyToken, update);

//delete user
userRouter.delete("/:id", verifyToken, deleteUser);

//get a user
userRouter.get("/find/:id", getUser);

//subscribe a user
userRouter.put("/sub/:id", verifyToken, subscribed);

//unsubscribe a user
userRouter.put("/unsub/:id", verifyToken, unsubscribed);

//like a video
userRouter.put("/like/:videoId", verifyToken, like);

//dislike a video
userRouter.put("/dislike/:videoId", verifyToken, disLike);

export default userRouter