import { useState, useEffect } from 'react';
import { API_URL } from "../../App";
import axios from 'axios';

export const useHotPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/homeuser/hotpost`);
        setPosts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotPosts();
  }, []);

  return { posts, error, loading };
};
