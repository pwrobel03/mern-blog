import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !password || !email || username === "" || password === "" || email === "") {
        return res.status(400).json({ message: "All fields are required" })
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
        res.json({ message: "Sign Up successful" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }


};