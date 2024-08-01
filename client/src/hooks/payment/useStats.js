// hooks/payment/usePaymentStats.js
import { useState, useEffect } from "react";
import http from "../../functions/httpService"; // Adjust the import based on your project's structure

const useStats = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await http.get("/payment/balance/stats");
        setStats(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

export default useStats;