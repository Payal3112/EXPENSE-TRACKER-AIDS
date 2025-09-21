import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment"; 
import TransactionInfoCard from "../../components/Cards/TransactionInfoCard"; // ✅ adjust path as needed

const RecentIncome = ({ transactions = [], onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income</h5>

        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.source}
              icon={item.icon}
              date={moment(item.date).format("Do MMM YYYY")}
              amount={item.amount}
              type="income"
              hideDeleteBtn
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">No income records found.</p>
        )}
      </div>
    </div>
  );
};

export default RecentIncome;
