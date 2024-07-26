import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import http from "../functions/httpService";



const useUserTotalCreatedJob = (userId) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCompletedJobsCount = async () => {
      try {
        const url = `/myjobs/created/${userId}`;
        const response = await http.get(url);
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

export default useUserTotalCreatedJob;