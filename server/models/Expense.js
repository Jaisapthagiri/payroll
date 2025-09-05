import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    employee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    month: { type: String, required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Expense = mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

export default Expense;
