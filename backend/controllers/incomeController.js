const xlsx = require('xlsx');
const Income = require("../models/Income");
const User = require("../models/User");

// ===============================
// Add Income Source
// ===============================
exports.addIncome = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const userId = req.user.id;
        const { icon, source, amount, date } = req.body;

        // Validation
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// ===============================
// Get All Income Sources
// ===============================
exports.getAllIncome = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const userId = req.user.id;
        const income = await Income.find({ userId }).sort({ date: -1 });

        res.status(200).json(income);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// ===============================
// Delete Income Source
// ===============================
exports.deleteIncome = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const income = await Income.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.json({ message: "Income deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// ===============================
// Download Income as Excel
// ===============================
// Download Income as Excel
exports.downloadIncomeExcel = async (req, res) => {
    try {
        const userId = req.user.id;
        const income = await Income.find({ userId }).sort({ date: -1 });

        if (!income || income.length === 0) {
            return res.status(404).json({ message: "No income data found" });
        }

        // Prepare data for Excel
        const data = income.map(item => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split("T")[0]
        }));

        // Create workbook and worksheet
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Write to buffer
        const buffer = xlsx.write(wb, { bookType: "xlsx", type: "buffer" });

        // Set headers and send file
        res.setHeader("Content-Disposition", "attachment; filename=income_details.xlsx");
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.send(buffer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};