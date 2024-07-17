import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import http from "../functions/httpService";



const useUserCompletedJobList = (userId) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompletedJobs = async () => {
      try {
        const url = `/myjobs/completedlist/${userId}`;
        const response = await http.get(url);
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

  // console.log(jobs);
  return { jobs, loading, error };
};

export default useUserCompletedJobList;
