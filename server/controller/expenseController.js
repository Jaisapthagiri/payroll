import Expense from '../models/Expense.js'

// Employee: Submit an expense
export const addExpense = async (req, res) => {
  try {
    const { month, amount, description } = req.body;

    const expense = await Expense.create({
      employee: req.user.id,  
      month,
      amount,
      description,
    });

    res.status(201).json({ message: "Expense submitted successfully", expense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Employee: View own expenses
export const getMyExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ employee: req.user.id }).sort({ createdAt: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: View all expenses (optional, if admin needs reports)
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate("employee", "name email department");
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
