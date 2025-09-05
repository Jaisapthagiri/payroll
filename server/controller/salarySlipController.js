import SalarySlip from "../models/SalarySlip.js";

// Admin: Generate salary slip
export const generateSlip = async (req, res) => {
  try {
    const { employee, month, basicPay, allowances, deductions } = req.body;
    const netSalary = basicPay + allowances - deductions;

    const slip = await SalarySlip.create({
      employee,
      month,
      basicPay,
      allowances,
      deductions,
      netSalary,
    });

    res.status(201).json({ message: "Salary slip generated successfully", slip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: Update salary slip
export const updateSlip = async (req, res) => {
  try {
    const { id } = req.params;
    const { basicPay, allowances, deductions } = req.body;
    const netSalary = basicPay + allowances - deductions;

    const slip = await SalarySlip.findByIdAndUpdate(
      id,
      { basicPay, allowances, deductions, netSalary },
      { new: true }
    );

    if (!slip) return res.status(404).json({ message: "Salary slip not found" });

    res.json({ message: "Salary slip updated successfully", slip });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Employee: View own slips
export const getMySlips = async (req, res) => {
  try {
    const slips = await SalarySlip.find({ employee: req.user.id }).sort({ createdAt: -1 });
    res.json(slips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin: View all slips (optional, for payroll report)
export const getAllSlips = async (req, res) => {
  try {
    const slips = await SalarySlip.find().populate("employee", "name email department");
    res.json(slips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
