const Income = require("../models/Income");
const Expense = require("../models/Expense");

exports.getInsights = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    const totalIncome = (await Income.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]))[0]?.total || 0;

    const totalExpense = (await Expense.aggregate([
      { $match: { userId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]))[0]?.total || 0;

    const latestExpense = await Expense.find({ userId }).sort({ date: -1 }).limit(1);

    let insights = [];

    const expensePercentage = totalIncome ? Math.round((totalExpense / totalIncome) * 100) : 0;

    if (totalIncome === 0) {
      insights.push("ℹ️ No income data available yet.");
    } else {
      insights.push(`📊 You’ve used ${expensePercentage}% of your income so far.`);

      if (expensePercentage < 50) {
        insights.push("💡 Good job! Your spending is under control.");
      } else if (expensePercentage < 80) {
        insights.push("⚠️ Be careful! You’re spending quite a lot.");
      } else {
        insights.push("🚨 Warning! Your spending is very high.");
      }
    }

    if (latestExpense.length > 0) {
      const lastExp = latestExpense[0];
      const description = lastExp.description || "No description";
      if (lastExp.amount > totalIncome * 0.3) {
        insights.push(`⚠️ Your recent expense of ₹${lastExp.amount} for "${description}" is quite high.`);
      }
    }

    res.json({ insights });
  } catch (error) {
    console.error(error);
    res.status(500).json({ insights: ["❌ Unable to fetch insights"] });
  }
};
