import { useState } from "react";
import http from "../../../functions/httpService";

const useLikesUpdate = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateLikes = async (type, id, like) => {
    setLoading(true); // Explicitly set loading to true at the start of the operation
    try {
      const url = `/forum/likes`;
      await http.post(url, {
        type, // post || comment
        id, // post id or comment id
        like, // true for like, false for dislike
      }).then((res) => {
        // console.log(res.data);
        setLoading(false);
      });

    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { loading, error, updateLikes };
};

export default useLikesUpdate;