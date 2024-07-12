import axios from "axios";
import {useEffect, useState} from "react";

const API_URL = "http://localhost:8000/api";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState({});

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

  const getCategory = async (id) => {
    try {
      const url = `${API_URL}/forum/categories/${id}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      setError(error);
      return null;
    }
  };
  

  return { categories, getCategory, loading, error };
};

export default useCategories;
