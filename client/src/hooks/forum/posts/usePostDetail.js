import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/api";

const usePostDetail = (id) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // setTimeout(() => {
    setLoading(false);
    const fetchPost = async () => {
      try {
        const url = `${API_URL}/forum/posts/${id}`;
        const response = await axios.get(url);
        setLoading(false);
        setPost(response.data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPost();
    // }, 5000);
  }, [id]);
  return { post, loading, error };
};

export default usePostDetail;
