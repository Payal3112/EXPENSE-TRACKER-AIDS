import React, { useState, useEffect } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData, formatCurrency } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    // Map amounts to formatted currency for tooltips
    const formattedResult = result.map(item => ({
      ...item,
      amount: Number(item.amount) // keep number for chart calculations
    }));
    setChartData(formattedResult);
  }, [transactions]);

  return (
    <div className="card bg-white rounded-lg p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-semibold">Income Overview</h5>
          <p className="text-xs text-gray-400 mt-0.5">
            Track your earnings over time and analyze your income
          </p>
        </div>

        <button
          className="add-btn flex items-center gap-1 px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
          onClick={onAddIncome}
        >
          <LuPlus className="text-lg" /> Add Income
        </button>
      </div>

      <div className="mt-6">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverview;
