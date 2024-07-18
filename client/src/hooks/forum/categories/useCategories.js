import { useEffect, useState } from "react";
import http from "../../../functions/httpService";



const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState({});

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const url = `/forum/categories`;
        const response = await http.get(url);
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
      const url = `/forum/categories/${id}`;
      const response = await http.get(url);
      return response.data;
    } catch (error) {
      setError(error);
      return null;
    }
  };
  

  return { categories, getCategory, loading, error };
};

export default useCategories;
