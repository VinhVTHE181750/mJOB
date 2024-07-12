import {useState} from "react";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

const usePostDelete = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deletePost = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `${API_URL}/forum/posts/${id}`
      );
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
