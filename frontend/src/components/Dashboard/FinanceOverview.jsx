import React from "react";
import CustomPieChart from "../Charts/CustomerPieChart";
import { formatCurrency } from "../../utils/helper";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  // ✅ pass numeric value, not preformatted string
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={totalBalance} // numeric value here
        HiColorSwatch={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;
