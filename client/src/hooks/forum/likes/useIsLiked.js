import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/api";

const useIsLiked = (userId, postId, commentId) => {
  const [liked, setLiked] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiked = async () => {
      try {
        let url = `${API_URL}/forum/likes/liked?`;
        if (userId) url += `userId=${userId}`;
        if (postId) url += `&postId=${postId}`;
        if (commentId) url += `&commentId=${commentId}`;
        const response = await axios.get(url);
        if (response.status === 200) {
          setLiked(true);
          setIsDislike(response.data[0].isDislike);
          setLoading(false);
        }
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

  return { liked, isDislike, loading, error };
};

export default useIsLiked;
