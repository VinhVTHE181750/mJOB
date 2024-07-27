import { useState, useEffect } from 'react';
import http from "../../../functions/httpService";


export const useNewPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewPosts = async () => {
      try {
        const url = `/homeuser/newpost`;
        const response = await http.get(url);
        setPosts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewPosts();
  }, []);

  return { posts, error, loading, useNewPosts };
};

export default useNewPosts;