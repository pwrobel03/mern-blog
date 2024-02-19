import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "./utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const generatePassword = (
    length = 20,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
) =>
    Array.from(crypto.getRandomValues(new Uint32Array(length)))
        .map((x) => wishlist[x % wishlist.length])
        .join('')

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
            { isAdmin: validUser.isAdmin },
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

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body
    try {
        const user = await User.findOne({ email })
        console.log(user);
        // user exist
        if (user) {
            console.log("Login");
            const token = jwt.sign(
                {
                    userId: user._id,
                    isAdmin: user.isAdmin
                },
                process.env.JWT_SECRET_KEY
            )

            user.password = null
            res
                .status(200)
                .cookie("access_token", token,
                    { httpOnly: true }
                )
                .json(user)
        } else {
            console.log("Register");
            // new user
            const password = generatePassword()
            const hashedPassword = bcryptjs.hashSync(password, 10)
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl
            })
            console.log(googlePhotoUrl);
            await newUser.save()

            const token = jwt.sign(
                { userId: newUser._id },
                process.env.JWT_SECRET_KEY
            )

            newUser.password = null
            res
                .status(200)
                .cookie("access_token", token, { httpOnly: true })
                .json(newUser)
        }
    } catch (error) {
        next(error);
    }
}