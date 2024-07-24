import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../App';

export const useRelatedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedJobs = async () => {
      try {
        const response = await axios.get(`${API_URL}/homeuser/relatedjobs`);
        setJobs(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedJobs();
  }, []);

  return { jobs, error, loading };
};
