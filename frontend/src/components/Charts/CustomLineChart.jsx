import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { formatCurrency } from "../../utils/helper"; // use helper

const CustomLineChart = ({ data }) => {
  const [newPointIndex, setNewPointIndex] = useState(null);

  useEffect(() => {
    if (data.length) {
      setNewPointIndex(data.length - 1);
      const timeout = setTimeout(() => setNewPointIndex(null), 1000); // glow lasts 1s
      return () => clearTimeout(timeout);
    }
  }, [data]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-sm font-semibold text-purple-800 mb-1">
            {payload[0].payload.month}
          </p>
          <p className="text-sm text-gray-600">
            Total Amount:{" "}
            <span className="text-sm font-medium text-gray-900">
              {formatCurrency(payload[0].payload.amount)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const AnimatedDot = (props) => {
    const { cx, cy, index } = props;
    const isNew = index === newPointIndex;
    return (
      <g>
        {isNew && <circle cx={cx} cy={cy} r={10} fill="#875cf5" filter="url(#glow)" />}
        <circle cx={cx} cy={cy} r={5} fill="#875cf5" />
      </g>
    );
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#875cf5"
            strokeWidth={3}
            dot={<AnimatedDot />}
            activeDot={{ r: 6, fill: "#875cf5" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
