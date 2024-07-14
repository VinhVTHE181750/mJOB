import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/api/myjobs";

const useJobListByStatus = (userId, jobStatus) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const url = `${API_URL}/jobhistory/jobstatus/${userId}/${jobStatus}`;
        const response = await axios.get(url);
        setJobs(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [userId, jobStatus]);

  return { jobs, loading, error };
};

export default useJobListByStatus;
