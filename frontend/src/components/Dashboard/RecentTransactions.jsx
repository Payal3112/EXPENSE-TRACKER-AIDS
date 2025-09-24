import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

// Map categories or sources to images
const categoryIcons = {
  Food: "https://i.postimg.cc/wTvsxzMV/food.jpg",
  Bills: "https://i.postimg.cc/0yFh1r0Z/bills.png",
  Salary: "https://i.postimg.cc/5tHfFvDv/salary.png",
  Transport: "https://i.postimg.cc/3wJ8f6xQ/transport.png",
  Shopping: "https://i.postimg.cc/MGfXf6hY/shopping.png",
  Rent: "https://i.postimg.cc/3x3Q2dzt/rent.png",
  Freelance: "💼", // optional emoji for income categories
  Gift: "🎁",
  Trading: "📈",
  // add more categories or income sources as needed
};

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
              // Use category for expenses, source/title for income
              const title = item.category || item.source || item.title || "Transaction";

              // Choose icon based on category or source
              const icon =
                categoryIcons[item.category] ||
                categoryIcons[item.source] ||
                "💰";

              return (
                <TransactionInfoCard
                  key={item._id}
                  title={title}
                  icon={icon}
                  date={moment(item.date).format("Do MMM YYYY")}
                  amount={item.amount}
                  type={item.type} // "income" or "expense"
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
