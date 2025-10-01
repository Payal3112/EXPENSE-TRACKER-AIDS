const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

// Dashboard Data with AI Insights
exports.getDashboardData = async (req, res) => {
  try {
    // Ensure correct ObjectId usage
    const userId = req.user._id; // Use _id from req.user
    const userObjectId = new Types.ObjectId(userId);

    // Total income
    const totalIncomeAgg = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalIncome = totalIncomeAgg[0]?.total || 0;

    // Total expense
    const totalExpenseAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalExpense = totalExpenseAgg[0]?.total || 0;

    // Income transactions in last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Expense transactions in last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last 5 transactions (income + expense)
    const lastTransaction = [
      ...(await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map((txn) => ({
        ...txn.toObject(),
        type: "income",
      })),
      ...(await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map((txn) => ({
        ...txn.toObject(),
        type: "expense",
      })),
    ].sort((a, b) => b.date - a.date);

    // ----- AI Insights -----
    let insights = [];

    // Calculate % of income spent
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

    // Highlight latest big expense
    const latestExpense = await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(1);
    if (latestExpense.length > 0) {
      const lastExp = latestExpense[0];
      const description = lastExp.description || "No description";
      if (lastExp.amount > totalIncome * 0.3) {
        insights.push(`⚠️ Your recent expense of ₹${lastExp.amount} for "${description}" is quite high.`);
      }
    }

    // Always return something
    if (insights.length === 0) insights.push("ℹ️ No insights generated yet.");

    // Final response
    res.json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: lastTransaction,
      insights, // <-- AI Insights included here
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error, insights: ["❌ Unable to fetch insights"] });
  }
};
