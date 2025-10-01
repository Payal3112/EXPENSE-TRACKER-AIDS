import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";

const AIInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useUserAuth();

  useEffect(() => {
    const fetchInsights = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/dashboard/insights`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInsights(res.data.insights || ["ℹ️ No insights available."]);
      } catch (err) {
        setInsights(["❌ Unable to fetch insights"]);
      } finally {
        setLoading(false);
      }
    };
    fetchInsights();
  }, [token]);

  if (!token) return null;

  return (
    <div className="card p-4 mb-4 shadow-md rounded-md bg-white">
      <h5 className="text-lg font-semibold mb-2">💡 AI Insights</h5>
      {loading ? (
        <p className="text-gray-500">Loading insights...</p>
      ) : (
        insights.map((i, idx) => (
          <p key={idx} className="text-gray-700">{i}</p>
        ))
      )}
    </div>
  );
};

export default AIInsights;
