import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import http from "../../../functions/httpService";

const API_URL = "http://localhost:8000/api";

const useLikesQuery = (type, id) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        let url1 = `/forum/likes?type=${type}&id=${id}&like=true`;
        let url2 = `/likes?type=${type}&id=${id}&like=false`;

        // Create promises for both requests
        const promise1 = http.get(url1);
        const promise2 = http.get(url2);

        // Use Promise.all to wait for both promises to resolve
        const [response1, response2] = await Promise.all([promise1, promise2]);

        // Set likes and dislikes from the responses
        setLikes(response1.data.likes);
        setDislikes(response2.data.dislikes);
        setLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        // Ensure loading is set to false after both requests are handled
        setLoading(false);
      }
    };

    fetchLikes();
  }, [type, id]);

  return { likes, dislikes, loading, error };
};

useLikesQuery.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default useLikesQuery;
