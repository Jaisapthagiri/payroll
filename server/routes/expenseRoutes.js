import express from "express";
import authUser from "../middleware/authUser.js";
import authAdmin from "../middleware/authAdmin.js";
import { createExpense, getMyExpenses, getAllExpenses } from "../controller/expenseController.js";

const router = express.Router();

// Employee
router.post("/create", authUser, createExpense);
router.get("/my-expenses", authUser, getMyExpenses);

// Admin
router.get("/all", authAdmin, getAllExpenses);

export default router;
