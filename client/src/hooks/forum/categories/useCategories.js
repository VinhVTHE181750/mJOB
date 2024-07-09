import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/api";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const url = `${API_URL}/forum/categories`;
        const response = await axios.get(url);
        setLoading(false);
        setCategories(response.data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPost();
  }, []);
  return { categories, loading, error };
};

export default useCategories;
