import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../App';

export const usePendingJobs = (userId) => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/homeuser/pending/${userId}`);
        setJobs(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingJobs();
  }, [userId]);

  return { jobs, error, loading };
};
