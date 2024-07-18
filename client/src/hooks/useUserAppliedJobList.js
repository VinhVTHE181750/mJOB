import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../functions/httpService";



const useUserAppliedJobList = (userId) => {
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchJobList = async () => {
      try {
        const url = `/myjobs/appliedlist/${userId}`;
        const response = await http.get(url);
        setJobList(response.data);
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
      fetchJobList();
    }
  }, []);
  // console.log('Hook data: ', jobList);
  return { jobList, loading, error };
};

export default useUserAppliedJobList;
