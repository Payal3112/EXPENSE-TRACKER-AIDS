import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomerPieChart"; // check correct path
import { formatCurrency } from "../../utils/helper";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentTransactionWithChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const preparedData = data?.map((item) => ({
      name: item.source,
      amount: Number(item.amount || 0),
    })) || [];

    setChartData(preparedData);

    // ✅ Calculate total dynamically
    const total = preparedData.reduce((sum, item) => sum + item.amount, 0);
    setTotalAmount(total);
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={totalAmount} // pass numeric value
        showTextAnchor
        HiColorSwatch={COLORS}
      />
    </div>
  );
};

export default RecentTransactionWithChart;
