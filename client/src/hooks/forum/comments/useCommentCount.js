import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const API_URL = "http://localhost:8000/api";

const useCommentCount = (id) => {
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const url = `${API_URL}/forum/comments/count/${id}`;
        const response = await axios.get(url);
        setComment(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchComment();
  }, [id]);
  return { comment, loading, error };
};

export default useCommentCount;