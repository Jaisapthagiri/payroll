import express from "express";
import { register, login, isAuth, logout } from '../controller/userController.js'
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authUser, isAuth); 
router.post("/logout", logout);

export default router;