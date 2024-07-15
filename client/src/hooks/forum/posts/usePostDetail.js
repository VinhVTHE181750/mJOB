import { useEffect, useState } from "react";
import http from "../../../functions/httpService";

const usePostDetail = (id) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const url = `/forum/posts/${id}`;
        const response = await http.get(url);
        setLoading(false);
        setPost(response.data);
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
