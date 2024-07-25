import { useEffect, useState } from 'react';
import http from '../functions/httpService';

const useJobUpdate = (id) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await http.get(`/jobs/${id}`);
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching job details.');
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({ ...prevJob, [name]: value }));
  };

  const handleSubmit = async (navigate) => {
    setLoading(true);
    try {
      await http.put(`/jobs/update`, job);
      setLoading(false);
      setSuccess('Job updated successfully!');
      setTimeout(() => {
        setSuccess('');
        navigate(-1);
      }, 2000); // Delay to show the success message before navigating back
    } catch (error) {
      setError('Error updating job details.');
      setLoading(false);
    } 
  };

  return { job, loading, error, success, handleInputChange, handleSubmit };
};

export default useJobUpdate;