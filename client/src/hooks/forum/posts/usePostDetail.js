import axios from "axios";
import {useEffect, useState} from "react";

const API_URL = "http://localhost:8000/api";

const usePostDetail = (id) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const url = `${API_URL}/forum/posts/${id}`;
        const response = await axios.get(url);
        setTimeout(() => {
          setLoading(false);
          setPost(response.data);
        }, 1000);
        
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);
  return { post, loading, error };
};

export default usePostDetail;