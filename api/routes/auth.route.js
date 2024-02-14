import express from "express"
const router = express.Router();
import { signup, signIn, google } from "../controllers/auth.controller.js"

router.post("/signup", signup)
router.post("/signin", signIn)
router.post("/google", google)

export default router