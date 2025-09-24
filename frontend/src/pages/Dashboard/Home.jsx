import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../hooks/useUserAuth";
import InfoCard from "../../components/Cards/InfoCard";
import { IoMdCard } from "react-icons/io";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { addThousandsSeparator } from "../../utils/helper";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../../components/Dashboard/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/Last30DaysExpenses";
import RecentTransactionWithChart from "../../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const Home = () => {
  const user = useUserAuth();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) setDashboardData(response.data);
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="my-5 mx-auto">
      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard
          icon={<IoMdCard />}
          label="Total Balance"
          value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
          color="bg-primary"
        />
        <InfoCard
          icon={<LuWalletMinimal />}
          label="Total Income"
          value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
          color="bg-orange-500"
        />
        <InfoCard
          icon={<LuHandCoins />}
          label="Total Expense"
          value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
          color="bg-red-500"
        />
      </div>

      {/* Dashboard Grid → 2 columns × 3 rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* ✅ Fixed: Recent Transactions → show both income + expense */}
        <RecentTransactions
          transactions={[
            ...(dashboardData?.last30DaysExpenses?.transactions || []).map(tx => ({
              ...tx,
              type: "expense",
            })),
            ...(dashboardData?.last60DaysIncome?.transactions || []).map(tx => ({
              ...tx,
              type: "income",
            })),
          ].sort((a, b) => new Date(b.date) - new Date(a.date))}
          onSeeMore={() => navigate("/transactions")}
        />

        <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0}
        />

        <ExpenseTransactions
          transactions={dashboardData?.last30DaysExpenses?.transactions || []}
          onSeeMore={() => navigate("/expense")}
        />

        <Last30DaysExpenses
          data={dashboardData?.last30DaysExpenses?.transactions || []}
        />

        <RecentTransactionWithChart
          data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
          totalIncome={dashboardData?.totalIncome || 0}
        />

        <RecentIncome
          transactions={dashboardData?.last60DaysIncome?.transactions || []}
          onSeemore={() => navigate("/income")}
        />
      </div>
    </div>
  );
};

export default Home;