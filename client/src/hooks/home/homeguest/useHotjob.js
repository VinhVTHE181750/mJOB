import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import http from "../../../functions/httpService";
const useHotJobs = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const url = `/homeguest/hotjobs`;
        const response = await http.get(url);
        // console.log("Top 3: ", response.data);
        setContents(response.data);
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

    fetchContents();
  }, []);

  return { contents, loading, error };
};

export default useHotJobs;