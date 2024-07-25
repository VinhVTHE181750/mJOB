import { useState } from "react";
import http from "../../../functions/httpService";

const useCommentInsert = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const insertComment = async (content, postId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await http.post(`/forum/comments`, {
        content,
        postId,
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response.data.message || err.message);
      setLoading(false);
    }
  };

  return { insertComment, loading, error };
};

export default useCommentInsert;
