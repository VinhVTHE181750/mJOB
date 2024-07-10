import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000/api";

const useLikesUpdate = (postId, commentId, userId, isDislike) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateLikes = async () => {
    try {
      const url = `${API_URL}/forum/likes/like`;
      const response = await axios.put(url, {
        postId, commentId, userId, isDislike
      });
      setLikes(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    updateLikes();
  }, [postId, userId, isDislike]);

  return { loading, error, updateLikes };
};

export default useLikesUpdate;