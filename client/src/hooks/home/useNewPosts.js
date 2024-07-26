import { useState, useEffect } from 'react';
import { API_URL } from "../../App";
import axios from 'axios';

export const useNewPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/homeuser/newpost`);
        setPosts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewPosts();
  }, []);

  return { posts, error, loading };
};
