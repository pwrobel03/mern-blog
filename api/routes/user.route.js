import express from "express";
const router = express.Router();
import { test, updateUser, deleteUser, signOut, getUsers } from "../controllers/user.controller.js";
import { verifyToken } from "../controllers/utils/verifyUser.js";

router.get("/test", test)
router.put("/update/:userId", verifyToken, updateUser)
router.delete("/delete/:userId", verifyToken, deleteUser)
router.post("/signout", signOut)
router.get("/get-users", verifyToken, getUsers)
router.get("/delete-user/:", verifyToken, getUsers)

export default router;