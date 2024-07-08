import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const API_URL = "http://localhost:8000/api";

const useViewCount = (id) => {
  const [view, setView] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchView = async () => {
      try {
        const url = `${API_URL}/forum/posts/views/${id}`;
        const response = await axios.get(url);
        setView(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchView();
  }, [id]);

  return { view, loading, error };
};

export default useViewCount;
