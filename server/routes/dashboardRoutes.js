import express from "express";
import authUser from "../middleware/authUser.js";
import authAdmin from "../middleware/authAdmin.js";
import { getDashboardData, getAdminDashboardData } from "../controller/dashboardController.js";

const router = express.Router();

router.get("/me", authUser, getDashboardData);
router.get("/admin", authUser, authAdmin, getAdminDashboardData);

export default router;
