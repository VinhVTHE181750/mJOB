import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import http from "../functions/httpService";



const useUserAppliedJobList = () => {
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
    console.log("1");
    const fetchJobList = async (userId) => {
      try {
        const url = `/myjobs/appliedlist/${userId}`;
        const response = await http.get(url);
        console.log("2");

        setJobList(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    // if (userId) {
    //   fetchJobList();
    //   console.log("3");

    // }
  
  return { jobList, loading, error, fetchJobList };
};

export default useUserAppliedJobList;
