import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";

const API_URL = "http://localhost:8000/api/homeguest";

const useTop3Jobs = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const url = `${API_URL}/top3jobs`;
        const response = await axios.get(url);
        // console.log("Top 3: ", response.data);
        setContents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  return { contents, loading, error };
};

export default useTop3Jobs;