import { useState } from 'react';
import http from '../../../functions/httpService'; // Adjust the path as needed

const useUpdateApplicationStatus = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const updateApplicationStatus = async (jobId, userId, status) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await http.put('myjobs/employer/updateapplication', { jobId, userId, status });
      setSuccess(response.data.message);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { updateApplicationStatus, loading, error, success };
};

export default useUpdateApplicationStatus;
