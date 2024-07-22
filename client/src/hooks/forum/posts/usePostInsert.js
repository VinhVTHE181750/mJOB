import { useState } from "react";
import http from "../../../functions/httpService";



const usePostInsert = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const insertPost = async (title, content, status, category, tags) => {
    alert(status);
    setLoading(true);
    setError(null);

    try {
      const response = await http.post(`/forum/posts`, {
        title,
        content,
        status,
        category,
        tags,
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response.data.message || err.message);
      setLoading(false);
    }
  };

  return { insertPost, loading, error };
};

export default usePostInsert;
