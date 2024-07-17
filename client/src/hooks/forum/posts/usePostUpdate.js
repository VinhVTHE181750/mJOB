import { useState } from "react";
import axios from "axios";
import http from "../../../functions/httpService";

const API_URL = "http://localhost:8000/api";

const usePostUpdate = (id) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatePost = async (
    id,
    title,
    content,
    userId,
    status,
    category,
    tags
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await http.put(`/forum/posts`, {
        id: id,
        title: title,
        content: content,
        userId: userId,
        status: status,
        category: category,
        tags: tags,
      });
      setLoading(false);
      return response.status === 200;
    } catch (err) {
      // console.log(err);
      setLoading(false);
    }
  };

  return { updatePost, loading, error };
};

export default usePostUpdate;
