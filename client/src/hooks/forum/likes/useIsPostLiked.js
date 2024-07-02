import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/api";

const useIsPostLiked = (postId, userId) => {
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiked = async () => {
      try {
        const url = `${API_URL}/forum/likes/post/liked/${postId}/${userId}`;
        const response = await axios.get(url);
        setLiked(response.data);
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

    fetchLiked();
  }, []);

  return { liked, loading, error };
};

export default useIsPostLiked;