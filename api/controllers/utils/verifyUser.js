import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js"


export const verifyToken = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.access_token;
    console.log(token);
    if (!token) {
        return next(errorHandler(401, "Unauthorized request"))
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) {
            return next(errorHandler(401, "Unauthorized request, wrong data provided"))
        }

        req.user = user
        next()
    })
}