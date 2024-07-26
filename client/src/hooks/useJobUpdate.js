import { useEffect, useState } from 'react';
import http from '../functions/httpService';

const useJobUpdate = (id) => {
  const [job, setJob] = useState(null);
  const [reqs, setReqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await http.get(`/jobs/${id}`);
        setJob(response.data.job);
        setReqs(response.data.requirements);
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

  const handleRequirementChange = (index, field, value) => {
    setReqs((prevReqs) => {
      const updatedReqs = [...prevReqs];
      updatedReqs[index][field] = value;
      return updatedReqs;
    });
  };

  const handleSubmit = async (navigate) => {
    setLoading(true);
    try {
      await http.put(`/jobs/update`, { ...job, job_requirements: reqs });
      setLoading(false);
      setSuccess('Job updated successfully!');
      setTimeout(() => {
        setSuccess('');
        navigate();
      }, 2000);
    } catch (error) {
      setError('Error updating job details.');
      setLoading(false);
    }
  };

  return { job, reqs, loading, error, success, handleInputChange, handleRequirementChange, handleSubmit };
};

export default useJobUpdate;
