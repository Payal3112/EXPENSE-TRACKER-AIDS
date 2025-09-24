import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareExpenseLineChartData } from "../../utils/helper";
import CustomLineChart from "../Charts/CustomLineChart";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    console.log("Chart Data:", result); // Debug chart data
    setChartData(result);
  }, [transactions]);

  return (
    <div className="card bg-white rounded-lg p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold">Expense Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your spending trends over time and gain insights into where
            your money goes.
          </p>
        </div>
        <button
          className="add-btn flex items-center gap-1 px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
          onClick={onExpenseIncome}
        >
          <LuPlus className="text-lg" /> Add Expense
        </button>
      </div>

      <div className="mt-6">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
