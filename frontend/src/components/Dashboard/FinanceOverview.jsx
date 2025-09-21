import React from "react";
import CustomerPieChart from "../Charts/CustomerPieChart"; // make sure to import your chart

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Financial Overview</h5>
      </div>

      <CustomerPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={`$${totalBalance}`} // use backticks for template string
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
