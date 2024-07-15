import { useState } from "react";
import http from "../../../functions/httpService";

const useLikesUpdate = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateLikes = async (type, id, like) => {
    try {
      const url = `/forum/likes`;
      await http.post(url, {
        type,
        id,
        like,
      });

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { loading, error, updateLikes };
};

export default useLikesUpdate;
