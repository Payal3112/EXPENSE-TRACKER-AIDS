import React, { useState, useEffect } from "react";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";

const Income = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Fetch all income details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_USER_INCOME);
      const data = response.data || [];
      setIncomeData(data);
    } catch (error) {
      console.error("Something went wrong while fetching income:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

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
      </div>

      <Modal
        onOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <div>Add Income Form</div>
      </Modal>
    </div>
  );
};

export default Income;
