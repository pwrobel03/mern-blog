import express from "express";
import { verifyToken } from "../controllers/utils/verifyUser.js";
import { createPost } from "../controllers/post.controller.js";

const router = express.Router()
router.post("/create-post", verifyToken, createPost)
export default router       