import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import Modal from "../../components/Modal";
import ExpenseList from "../../components/Expense/ExpenseList";
import DeleteAlert from "../../components/DeleteAlert";

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Fetch all expense details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE // ✅ fixed path
      );
      const data = response.data || [];
      console.log("Fetched expenses:", data); // debug
      setExpenseData(data);
    } catch (error) {
      console.error(
        "Something went wrong while fetching expense:",
        error.response || error
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle add expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category || !category.trim()) {
      toast.error("Category is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error adding expense:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null});
      toast.success("Expense Details Deleted successfully ");
      fetchExpenseDetails();
    } catch (error) {
      console.error(
        "Error Deleting expense:",
        error.response?.data?.message || error.message 
      );
    }
  };

  // Handle download expense details (to be implemented later)
  const handleDownloadExpenseDetails = async () => {
    try{
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob"
        }
      );

      // create a url for the blob 
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("failed to download expense details. Please try again");
    }
  

  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  return (
    <div className="my-5 mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <ExpenseOverview
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModal(true)}
          />
        </div>
        <ExpenseList
          transactions={expenseData}
          onDelete={(id) =>{
            setOpenDeleteAlert({ show: true, data: id })
          }}
          onDownload={handleDownloadExpenseDetails}
        />
      </div>

      <Modal
        isOpen={openAddExpenseModal} // ✅ camelCase
        onClose={() => setOpenAddExpenseModal(false)} // ✅ camelCase
        title="Add Expense"
      >
        <AddExpenseForm onAddExpense={handleAddExpense} />
      </Modal>
      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Expense"
      >
        <DeleteAlert
          content="Are you sure you want to delete this Expense detail?"
          onDelete={() => deleteExpense(openDeleteAlert.data)}
        />
      </Modal>
    </div>
  );
};

export default Expense;
