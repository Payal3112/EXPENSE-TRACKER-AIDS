const User = require("../models/User");
const Income = require("../models/Income");

// Add Income Source
exports.addIncome = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const userId = req.user.id;
        const { icon, source, amount, date } = req.body;

        // Validation: Check for missing fields
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
        console.error(error); // Log the real error
        res.status(500).json({ message: "Server Error" });
    }
};

// Get All Income Sources
exports.getAllIncome = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const userId = req.user.id;
        const income = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(income);

    } catch (error) {
        console.error(error); // Log the real error
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete a specific Income Source
exports.deleteIncome = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const incomeId = req.params.id;
        const userId = req.user.id;

        const income = await Income.findOne({ _id: incomeId, userId });
        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        await Income.deleteOne({ _id: incomeId });
        res.status(200).json({ message: "Income deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Download Income as Excel (placeholder)
exports.downloadIncomeExcel = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // You can implement Excel download here
        res.status(200).json({ message: "Excel download not implemented yet" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
