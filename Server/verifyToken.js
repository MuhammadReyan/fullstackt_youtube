import jwt from "jsonwebtoken";

import { CreateError } from "./error.js";


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return next(CreateError(401, "You are not authenticated!"))

    jwt.verify(token, process.env.JWT, (error, user) => {
        if (error) return next(CreateError(403, "Token is not valid!"))
        req.user = user
        next()
    })
}
