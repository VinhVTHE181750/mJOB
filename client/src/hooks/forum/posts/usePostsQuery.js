import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const API_URL = "http://localhost:8000/api";

const usePostsQuery = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const url = `${API_URL}/forum/posts`;
        const response = await axios.get(url);
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        // navigate("/error", {
          // state: {
          //   message: error.response
          //     ? error.response.data.message
          //     : "An error occurred",
          // },
        // });
        setError(error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export default usePostsQuery;