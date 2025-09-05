import express from "express";
import authUser from "../middleware/authUser.js";
import authAdmin from "../middleware/authAdmin.js";
import { addExpense, getMyExpenses, getAllExpenses } from "../controller/expenseController.js";

const router = express.Router();

router.post("/", authUser, addExpense);
router.get("/", authUser, getMyExpenses);
router.get("/all", authUser, authAdmin, getAllExpenses);

export default router;
