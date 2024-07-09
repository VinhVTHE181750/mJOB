import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router";

const API_URL = "http://localhost:8000/api";

const useUserCompletedJobList = (userId) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompletedJobs = async () => {
      try {
        const url = `${API_URL}/myjobs/completedlist/${userId}`;
        const response = await axios.get(url);
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        navigate("/error", {
          state: {
            message: error.response
              ? error.response.data.message
              : "An error occurred",
          },
        });
        setError(error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchCompletedJobs();
    }
  }, [userId, navigate]);

  console.log(jobs);
  return { jobs, loading, error };
};

export default useUserCompletedJobList;
