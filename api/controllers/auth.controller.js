import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "./utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !password || !email || username === "" || password === "" || email === "") {
        next(errorHandler(400, "All fields are required"))
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    console.log(newUser);

    try {
        await newUser.save()
        res.json({ message: "Sign Up successful" });
    } catch (error) {
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password || email === "" || password === "") {
        return next(errorHandler(400, "All fields are required"))
    }

    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, "Something goes wrong"))
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(400, "Something goes wrong"))
        }
        validUser.password = null

        const token = jwt.sign(
            { userId: validUser._id },
            process.env.JWT_SECRET_KEY
        )

        res
            .status(200)
            .cookie("access_token", token, { httpOnly: true })
            .json(validUser)

    } catch (error) {
        next(error);
    }
}