import React from "react";
import CustomPieChart from "../Charts/CustomerPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  // ✅ Calculate percentages
  const expensePercent =
    totalIncome > 0 ? ((totalExpense / totalIncome) * 100).toFixed(1) : 0;

  // ✅ AI insight message
  let insightMessage = "ℹ️ No data available yet.";
  let extraMessage = "";
  let insightClass = "text-gray-600";
  let extraClass = "text-gray-500";

  if (totalIncome > 0) {
    if (expensePercent > 80) {
      insightMessage = `⚠️ You’ve already spent ${expensePercent}% of your income.`;
      extraMessage = "🚨 High spending! Try to control expenses.";
      insightClass = "text-red-500 font-semibold";
      extraClass = "text-red-400";
    } else if (expensePercent > 50) {
      insightMessage = `📊 You’ve used ${expensePercent}% of your income.`;
      extraMessage = "⚠️ Be cautious — more than half your income is gone.";
      insightClass = "text-yellow-600 font-semibold";
      extraClass = "text-yellow-500";
    } else {
      insightMessage = `✅ You’ve used only ${expensePercent}% of your income.`;
      extraMessage = "🎉 Great job managing your finances!";
      insightClass = "text-green-600 font-semibold";
      extraClass = "text-green-500";
    }
  }

  return (
    <div className="card p-4">
      {/* AI Insights on Top */}
      <div className="mb-4">
        <h5 className="text-lg font-semibold flex items-center gap-2">
          💡 AI Insights
        </h5>
        <p className={`mt-1 ${insightClass}`}>{insightMessage}</p>
        <p className={`mt-1 text-sm ${extraClass}`}>{extraMessage}</p>
      </div>

      {/* Finance Overview */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={totalBalance}
        HiColorSwatch={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
