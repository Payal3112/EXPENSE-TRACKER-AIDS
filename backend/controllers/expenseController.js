const xlsx = require('xlsx');
const Expense = require("../models/Expense");

// Add Expense
exports.addExpense = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "User not authenticated" });

        const userId = req.user.id;
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) return res.status(400).json({ message: "All fields are required" });

        const newExpense = new Expense({ userId, icon, category, amount, date: new Date(date) });
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Expenses
exports.getAllExpense = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "User not authenticated" });

        const expense = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
        res.status(200).json(expense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "User not authenticated" });

        const expense = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!expense) return res.status(404).json({ message: "Expense not found" });

        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Download Expense as Excel
exports.downloadExpenseExcel = async (req, res) => {
    try {
        if (!req.user) return res.status(401).json({ message: "User not authenticated" });

        const expense = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
        if (!expense || expense.length === 0) return res.status(404).json({ message: "No expense data found" });

        const data = expense.map(item => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split("T")[0]
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

        res.setHeader("Content-Disposition", "attachment; filename=expense_details.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
