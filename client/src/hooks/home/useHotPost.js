import { useEffect, useState } from "react";
import http from "../../functions/httpService";

const useHotPosts = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchcontents = async () => {
      try {
        const url = `/homeguest/hotposts`;
        const response = await http.get(url);
        console.log(response.data);
        setContents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchcontents();
  }, []);

  return {contents, loading, error , useHotPosts};
};

export default useHotPosts;
