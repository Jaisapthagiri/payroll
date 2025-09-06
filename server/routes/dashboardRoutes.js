import express from "express";
import authUser from "../middleware/authUser.js";
import authAdmin from "../middleware/authAdmin.js";
import { getEmployeeDashboard, getAdminDashboardData } from "../controller/dashboardController.js";

const router = express.Router();

router.get("/me", authUser, getEmployeeDashboard);
router.get("/admin", authUser, authAdmin, getAdminDashboardData);

export default router;
