import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const API_URL = "http://localhost:8000/api";

const usePostDetail = (id) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const url = `${API_URL}/forum/posts/${id}`;
        const response = await axios.get(url);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPost();
  }, []);
  return { post, loading, error };
};

export default usePostDetail;