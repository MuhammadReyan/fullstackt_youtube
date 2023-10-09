import express from "express";

//========================= IMPORT FROM CONTROLLERS =====================================//

import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend, updateVideo } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const videoRouter = express.Router()


videoRouter.post("/", verifyToken, addVideo)
videoRouter.put("/:id", verifyToken, addVideo)
videoRouter.delete("/:id", verifyToken, addVideo)
videoRouter.get("/find/:id", getVideo)
videoRouter.put("/view/:id", addView)
videoRouter.get("/trend", trend)
videoRouter.get("/random", random)
videoRouter.get("/sub", verifyToken, sub)
videoRouter.get("/tags", getByTag)
videoRouter.get("/search", search)


export default videoRouter