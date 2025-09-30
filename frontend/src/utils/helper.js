import moment from "moment";

// Validate email using regex
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Get initials from full name (max 2 letters)
export const getInitials = (name) => {
  if (!name) return "";

  const words = name.trim().split(" ");
  return words
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
};

// Format number with thousands separator (commas)
export const addThousandsSeparator = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "";
  return Number(num).toLocaleString("en-IN");
};

// Format currency as Indian Rupee
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);
};

// Prepare expense chart
export const prepareExpenseBarChartData = (data = []) => {
  return data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));
};

// Prepare income chart
export const prepareIncomeBarChartData = (data = []) => {
  if (!data.length) return [];

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  const dailyMap = {};

  data.forEach((item) => {
    if (!item || !item.date || !item.amount) return;

    const day = moment(item.date).format("Do MMM"); // e.g., "24 Sep"
    if (!dailyMap[day]) dailyMap[day] = 0;

    dailyMap[day] += Number(item.amount);
  });

  const chartData = Object.keys(dailyMap)
    .sort((a, b) => moment(a, "Do MMM") - moment(b, "Do MMM"))
    .map((day) => ({
      month: day,
      amount: dailyMap[day],
    }));

  return chartData;
};
