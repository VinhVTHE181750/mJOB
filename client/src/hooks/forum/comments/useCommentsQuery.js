import { useEffect, useState } from "react";
import http from "../../../functions/httpService";
import socket from "../../../socket";

const useCommentsQuery = (id) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const url = `/forum/comments/${id}`;
        const response = await http.get(url);
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchComments();

    const event = `forum/comments/${id}`;
    socket.on(event, fetchComments);

    return () => {
      socket.off(event, fetchComments);
    };
  }, [id]); // Added id to the dependency array to ensure re-subscription on id change

  return { comments, loading, error };
};

export default useCommentsQuery;