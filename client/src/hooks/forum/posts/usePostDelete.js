import { useState } from "react";
import http from "../../../functions/httpService";

const usePostDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePost = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await http.delete(`/forum/posts/${id}`);
      setLoading(false);
      return response.data;
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return { deletePost, loading, error };
};

export default usePostDelete;
