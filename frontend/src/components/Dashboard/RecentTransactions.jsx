import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Recent Transactions</h5>
        <button className="card-btn" onClick={onSeeMore}>
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* Transaction list */}
      <div className="mt-6 flex flex-col">
        {transactions && transactions.length > 0 ? (
          transactions
            .slice(0, 5)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((item) => {
              const title =
                item.category || item.source || item.title || "Transaction";

              // ✅ Use the same emoji/icon saved while adding transaction
              const icon = item.icon ;

              return (
                <TransactionInfoCard
                  key={item._id}
                  title={title}
                  icon={icon}
                  date={moment(item.date).format("Do MMM YYYY")}
                  amount={item.amount}
                  type={item.type}
                  hideDeleteBtn={true}
                />
              );
            })
        ) : (
          <p className="text-gray-500 mt-4">No recent transactions</p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;