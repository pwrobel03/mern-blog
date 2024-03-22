import Post from "../models/post.model.js";
import { errorHandler } from "./utils/error.js"

export const createPost = async (req, res, next) => {

    // user is admin
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You're not allowed to create a post!"))
    }

    // all data provided
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Please provide all required fields."))
    }

    // new post was created
    const slug = req.body.title.split(" ").join("-").toLowerCase().replace(/[^a-zA-Z0-9-]/g, "");
    const newPost = new Post({
        ...req.body, slug, userId: req.user.userId
    })
    // post was saved in database
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost)
    } catch (error) {
        next(error)
    }

}