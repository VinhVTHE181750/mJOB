import { useEffect, useState } from "react";
import http from "../../../functions/httpService";


const useJobListByStatus = (userId, jobStatus) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const url = `/myjobs/jobhistory/jobstatus/${userId}/${jobStatus}`;
        const response = await http.get(url);
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
