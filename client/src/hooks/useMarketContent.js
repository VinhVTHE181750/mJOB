import { useEffect, useState } from "react";
import http from "../functions/httpService";



const useMarketContent = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const url = `/marketing`;
        const response = await http.get(url);
        setContents(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  return { contents, loading, error };
};

export default useMarketContent;
