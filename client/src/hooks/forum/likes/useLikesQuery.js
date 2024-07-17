import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import http from "../../../functions/httpService";
import { API_URL } from "../../../App";

const useLikesQuery = (type, id, refreshFlag) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isDislike, setIsDislike] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLikesAndDislikes = async () => {
      // these two don't need authorization
      const urlLikes = `${API_URL}/forum/likes?type=${type}&id=${id}&like=true`;
      const urlDislikes = `${API_URL}/forum/likes?type=${type}&id=${id}&like=false`;
  
      try {
        const [responseLikes, responseDislikes] = await Promise.all([
          http.get(urlLikes),
          http.get(urlDislikes),
        ]);
        setLikes(responseLikes.data.likes);
        setDislikes(responseDislikes.data.dislikes);
      } catch (error) {
        setError(error);
        // Optionally handle this error differently
      }
    };
  
    const fetchUserLikeStatus = async () => {
      // this one needs authorization
      const url = `${API_URL}/forum/likes/liked?type=${type}&id=${id}`;
      try {
        const response = await http.get(url);
        setLiked(response.data.liked);
        setIsDislike(response.data.isDislike || false);
      } catch (error) {
        // Handle unauthorized or other errors gracefully
        setError(error);
        // Don't set error state here if you want to allow unauthorized users to see likes/dislikes
      }
    };
    setLoading(false);
  
    fetchLikesAndDislikes();
    fetchUserLikeStatus();
  }, [type, id, refreshFlag]);

  return { likes, dislikes, liked, isDislike, loading, error };
};

useLikesQuery.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default useLikesQuery;
