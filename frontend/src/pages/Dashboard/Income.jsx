import React, { useState, useEffect } from "react";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth} from "../../hooks/useUserAuth"

const Income = () => {
  useUserAuth();

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Fetch all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.GET_USER_INCOME
      );
      const data = response.data || [];
      setIncomeData(data);
    } catch (error) {
      console.error(
        "Something went wrong while fetching income:",
        error.response || error
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle add income
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;
    //Validation checks
    if (!source.trim()) {
      toast.error("source is expired");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("amount should be a valid number greater than 0 ");
      return;
    }
    if (!date) {
      toast.error("Date is required");
      return;
    }
    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error adding Income:",
        error.response?.data?.message || error.message
      );
    }
  };

  // Delete income (to be implemented later)
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null});
      toast.success("Income Details Delted successfully ");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error Deleting income:",
        error.response?.data?.message || error.message 
      );
    }
  };

  // Handle download income details (to be implemented later)
  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    fetchIncomeDetails();
  }, []);

  return (
    <div className="my-5 mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <IncomeOverview
            transactions={incomeData} // <-- correct prop name
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />
        </div>
        <IncomeList
          transactions={incomeData}
          onOpenDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
          onDownload={handleDownloadIncomeDetails}
        />
      </div>

      {/* Add Income Modal */}
      <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>
      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Income"
      >
        <DeleteAlert
          content="Are you sure you want to delete this Income detail?"
          onDelete={() => deleteIncome(openDeleteAlert.data)}
        />
      </Modal>
    </div>
  );
};

export default Income;
