import express from "express";
import { googleAuth, signIn, signup } from "../controllers/auth.js";

//========================= IMPORT FROM CONTROLLERS =====================================//



const authRoute = express.Router()


//================================ CREATE USER ========================================//

authRoute.post('/signup', signup)

//================================= SIGN IN =========================================//

authRoute.post('/signin', signIn)

//=============================== GOOGLE AUTH ======================================//
authRoute.post('/google', googleAuth)



export default authRoute