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

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) =>  ({
    category: item?.category,
    amount: item?.amount,
  }));
  return  chartData;
};
