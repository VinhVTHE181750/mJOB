import {useState} from 'react';
import axios from 'axios';

const useJobInsert = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const insertJob = async (jobData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // Replace the URL with your actual API endpoint
      const response = await axios.post('http://localhost:8000/api/jobs', jobData);
      if (response.status === 200) {
        setSuccess(true);
      } else {
        setError('An error occurred while inserting the job.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return { insertJob, loading, error, success };
};

export default useJobInsert;