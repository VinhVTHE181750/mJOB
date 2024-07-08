import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const API_URL = "http://localhost:8000/api";

const useUserTotalCompletedJob = (userId) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCompletedJobsCount = async () => {
      try {
        const url = `${API_URL}/myjobs/completed/${userId}`;
        const response = await axios.get(url);
        setCount(response.data);
        setCount(response.data.total);
        setLoading(false);
      } catch (error) {
        navigate("/error", {
          state: {
            message: error.response
              ? error.response.data.message
              : "An error occurred",
          },
        });
        setError(error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchCompletedJobsCount();
    }
  }, [userId, navigate]);
  return { count, loading, error };
};

export default useUserTotalCompletedJob;