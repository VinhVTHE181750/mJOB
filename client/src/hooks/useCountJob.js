import {useEffect, useState} from "react";
import http from "../functions/httpService";
const useCountJob = () => {
  const [count, setCount] = useState(0); // Assuming count is a number
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const url = `http://localhost:8000/api/job-count`;
        const response = await http.get(url);
        setCount(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchCount();
  }, []);

  return { count, loading, error };
};

export default useCountJob;
