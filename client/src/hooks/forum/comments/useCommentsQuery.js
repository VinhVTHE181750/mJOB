import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

const API_URL = "http://localhost:8000/api";

const useCommentsQuery = (post_id) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // call /forum/comments and add commentId to body
        const url = `${API_URL}/forum/comments/${post_id}`;
        const response = await axios.get(url);
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchComments();

  }, []);

  return { comments, loading, error };
};

export default useCommentsQuery;
