import axios from "axios";
import {useEffect, useState} from "react";

const API_URL = "http://localhost:8000/api";

const useLikesQuery = (postId, commentId) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        let url = `${API_URL}/forum/likes`;
        if (postId) url += `?postId=${postId}`;
        if (commentId) url += `?commentId=${commentId}`;
        const response = await axios.get(url);
        setLikes(response.data[0].likes);
        setDislikes(response.data[0].dislikes);
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

export default useLikesQuery;
