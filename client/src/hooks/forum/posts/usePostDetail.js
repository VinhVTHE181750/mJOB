import { useEffect, useState } from "react";
import http from "../../../functions/httpService";

const usePostDetail = (id, refreshFlag) => { // Add refreshFlag as a parameter
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true); // Ensure loading is set to true when refetching
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
  }, [id, refreshFlag]); // Include refreshFlag in the dependency array

  return { post, loading, error };
};

export default usePostDetail;