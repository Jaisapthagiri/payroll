import mongoose from "mongoose";

const salarySlipSchema = new mongoose.Schema({
    employee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    month: { type: String, required: true },
    basicPay: { type: Number, required: true },
    allowances: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    netSalary: { type: Number, required: true },
    generatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const SalarySlip = mongoose.models.SalarySlip || mongoose.model("SalarySlip", salarySlipSchema);

export default SalarySlip;
