import {useState} from 'react';
import axios from 'axios';

const API_URL = "http://localhost:8000/api";

const usePostUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatePost = async (title, content, user_id, post_id) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`${API_URL}/forum/posts/update`, { title, content, user_id, post_id });
      setLoading(false);
      return response.status === 200;
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return { updatePost, loading, error };
};

export default usePostUpdate;