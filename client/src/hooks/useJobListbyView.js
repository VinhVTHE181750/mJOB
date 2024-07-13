import axios from "axios";
import {useEffect, useState} from "react";

const API_URL = "http://localhost:8000/api";

const useJobList = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const url = `${API_URL}/joblist/byView`;
        const response = await axios.get(url);
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

export default useJobList;
