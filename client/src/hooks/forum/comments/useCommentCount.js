import axios from "axios";
import {useEffect, useState} from "react";



const useCommentCount = (id) => {
  const [comment, setComment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const url = `/forum/comments/count/${id}`;
        const response = await http.get(url);
        setComment(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchComment();
  }, [id]);
  return { comment, loading, error };
};

export default useCommentCount;