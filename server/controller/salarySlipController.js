import SalarySlip from "../models/SalarySlip.js";

// POST http://localhost:4000/api/salaries/create

export const createSalarySlip = async (req, res) => {
  try {
    const { employeeId, month, basicPay, allowances, deductions } = req.body;

    if (!employeeId || !month || !basicPay) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    const netSalary = basicPay + (allowances || 0) - (deductions || 0);

    const slip = await SalarySlip.create({
      employee: employeeId,
      month,
      basicPay,
      allowances,
      deductions,
      netSalary,
    });

    return res.json({ success: true, salarySlip: slip });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT http://localhost:4000/api/salaries/update/:id
export const updateSalarySlip = async (req, res) => {
  try {
    const { id } = req.params;
    const { basicPay, allowances, deductions } = req.body;

    const slip = await SalarySlip.findById(id);
    if (!slip) return res.status(404).json({ success: false, message: "Salary slip not found" });

    if (basicPay !== undefined) slip.basicPay = basicPay;
    if (allowances !== undefined) slip.allowances = allowances;
    if (deductions !== undefined) slip.deductions = deductions;
    slip.netSalary = slip.basicPay + slip.allowances - slip.deductions;

    await slip.save();
    return res.json({ success: true, salarySlip: slip });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET http://localhost:4000/api/salaries/my-salaries
export const getMySalarySlips = async (req, res) => {
  try {
    const slips = await SalarySlip.find({ employee: req.user.id }).sort({ createdAt: -1 });
    return res.json({ success: true, slips });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET http://localhost:4000/api/salaries/all
export const getAllSalarySlips = async (req, res) => {
  try {
    const slips = await SalarySlip.find().populate("employee", "name email department");
    return res.json({ success: true, slips });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
