const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const { getDashboardData } = require("../controllers/dashboardController");
const { getInsights } = require("../controllers/insightController");

const router = express.Router();

router.get("/", protect, getDashboardData);
router.get("/insights", protect, getInsights);

module.exports = router;
