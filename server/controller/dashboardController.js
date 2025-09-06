import SalarySlip from "../models/SalarySlip.js";
import Expense from "../models/Expense.js";

// GET http://localhost:4000/api/dashboard/employee
export const getEmployeeDashboard = async (req, res) => {
  try {
    const salarySlips = await SalarySlip.find({ employee: req.user.id });
    const expenses = await Expense.find({ employee: req.user.id });

    return res.json({
      success: true,
      salary: salarySlips,
      expenses: expenses,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET http://localhost:4000/api/dashboard/admin
export const getAdminDashboardData = async (req, res) => {
  try {
    const totalSalary = await SalarySlip.aggregate([
      { $group: { _id: null, total: { $sum: "$netSalary" } } },
    ]);

    const totalExpenses = await Expense.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    return res.json({
      success: true,
      totalSalary: totalSalary[0]?.total || 0,
      totalExpenses: totalExpenses[0]?.total || 0,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};