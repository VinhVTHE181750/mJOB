import {useEffect, useState} from 'react';
import axios from 'axios';

const useJobUpdate = (jobId) => {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/jobs/${jobId}`);
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching job details.');
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({ ...prevJob, [name]: value }));
  };

  const handleSubmit = async (navigate) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8000/api/jobs/update`, job);
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