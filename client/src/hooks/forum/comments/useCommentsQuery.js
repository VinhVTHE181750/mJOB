import axios from "axios";
import {useEffect, useState} from "react";
import http from "../../../functions/httpService";



const useCommentsQuery = (id) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // call /forum/comments and add commentId to body
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
  }, []);

  return { comments, loading, error };
};

export default useCommentsQuery;
