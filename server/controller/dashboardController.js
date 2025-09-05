import Expense from "../models/Expense.js";
import SalarySlip from "../models/SalarySlip.js";

// Employee Dashboard: salary + expenses history
export const getDashboardData = async (req, res) => {
  try {
    const employeeId = req.user.id;

    const expenses = await Expense.find({ employee: employeeId }).sort({ month: 1 });
    const salarySlips = await SalarySlip.find({ employee: employeeId }).sort({ month: 1 });

    res.json({ expenses, salarySlips });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin Dashboard (optional): overview of all employees
export const getAdminDashboardData = async (req, res) => {
  try {
    const expenses = await Expense.aggregate([
      { $group: { _id: "$month", totalExpenses: { $sum: "$amount" } } }
    ]);

    const salaries = await SalarySlip.aggregate([
      { $group: { _id: "$month", totalSalaries: { $sum: "$netSalary" } } }
    ]);

    res.json({ expenses, salaries });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
