import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../functions/httpService";



const useUserAppliedJobList = (userId) => {
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobList = async () => {
      try {
        const url = `/myjobs/appliedlist/${userId}`;
        const response = await http.get(url);
        setJobList(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchJobList();
    }
  }, []);
  return { jobList, loading, error };
};

export default useUserAppliedJobList;
