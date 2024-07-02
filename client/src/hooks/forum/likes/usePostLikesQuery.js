import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/api";

const usePostLikesQuery = (postId) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const url = `${API_URL}/forum/likes/post/${postId}`;
        const response = await axios.get(url);
        setLikes(response.data.likes);
        setDislikes(response.data.dislikes);
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

    fetchLikes();
  }, []);

  return { likes, dislikes, loading, error };
};

export default usePostLikesQuery;