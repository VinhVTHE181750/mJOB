import { useEffect, useState } from "react";
import http from "../functions/httpService";



const useNewsContent = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchcontents = async () => {
      try {
        const url = `/datapost`;
        const response = await http.get(url);
        setContents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchcontents();
  }, []);

  return {contents, loading, error };
};

export default useNewsContent;
