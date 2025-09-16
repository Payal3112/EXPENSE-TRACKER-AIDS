const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const incomeRoutes = require("./routes/incomeRoutes");
const authRoutes = require("./routes/authRoutes"); // ✅ ADD THIS

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Mount both route groups
app.use("/api/v1/auth", authRoutes);     // <-- ADD THIS LINE
app.use("/api/v1/income", incomeRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
