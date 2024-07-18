import { useState, useEffect } from 'react';
import { API_URL } from "../../App";
import axios from 'axios';

export const useOngoingJobs = (userId) => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOngoingJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/homeuser/ongoing/${userId}`);
        setJobs(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOngoingJobs();
  }, [userId]);

  return { jobs, error, loading };
};
