import User from "../models/user.model.js";
import { errorHandler } from "./utils/error.js";
import bcryptjs from "bcryptjs"

export const test = (req, res) => {
    res.json("Api is working")
};

export const updateUser = async (req, res, next) => {
    console.log(req.user);
    console.log(req.params);
    if (req.user.userId !== req.params.userId) {
        return next(errorHandler(403, "Rou are not allowed to update data of this user"))
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(
                errorHandler(400, 'Username must be between 7 and 20 characters')
            );
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username cannot contain spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username must be lowercase'));
        }

        console.log(req.body.username);
        if (!req.body.username.match(/^[^ !"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+$/)) {
            console.log("uwasdasd");
            return next(
                errorHandler(400, 'Username can only contain letters and numbers')
            );
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password
            },
        }, { new: true })
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}