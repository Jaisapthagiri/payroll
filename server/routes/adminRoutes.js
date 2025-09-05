import express from "express";
import { adminLogin, adminLogout, getAdminDashboard } from "../controller/adminController.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.get("/dashboard", authAdmin, getAdminDashboard);

export default router;
