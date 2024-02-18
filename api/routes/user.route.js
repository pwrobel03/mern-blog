import express from "express";
const router = express.Router();
import { test } from "../controllers/user.controller.js";
import { updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../controllers/utils/verifyUser.js";

router.get("/test", test)
router.get("/update/:userId", verifyToken, updateUser)

export default router;