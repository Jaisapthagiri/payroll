import Expense from "../models/Expense.js";

// POST http://localhost:4000/api/expenses/create
export const createExpense = async (req, res) => {
  try {
    const { month, amount, description } = req.body;

    if (!month || !amount) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const expense = await Expense.create({
      employee: req.user.id,
      month,
      amount,
      description,
    });

    return res.json({ success: true, expense });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET http://localhost:4000/api/expenses/my-expenses
export const getMyExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ employee: req.user.id }).sort({ createdAt: -1 });
    return res.json({ success: true, expenses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// GET http://localhost:4000/api/expenses/all
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("employee", "name email department");
    return res.json({ success: true, expenses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
