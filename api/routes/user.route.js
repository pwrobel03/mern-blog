import express from "express";
const router = express.Router();
import { test, updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyToken } from "../controllers/utils/verifyUser.js";

router.get("/test", test)
router.put("/update/:userId", verifyToken, updateUser)
router.delete("/delete/:userId", verifyToken, deleteUser)

export default router;