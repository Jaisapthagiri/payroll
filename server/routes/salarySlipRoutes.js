import express from "express";
import authUser from "../middleware/authUser.js";
import authAdmin from "../middleware/authAdmin.js";
import { createSalarySlip, updateSalarySlip, getMySalarySlips, getAllSalarySlips } from "../controller/salarySlipController.js";


const router = express.Router();

router.get("/my-salaries", authUser, getMySalarySlips);
// Admin
router.post("/create", authAdmin, createSalarySlip);
router.put("/update/:id", authAdmin, updateSalarySlip);
router.get("/all", authAdmin, getAllSalarySlips);

export default router;
