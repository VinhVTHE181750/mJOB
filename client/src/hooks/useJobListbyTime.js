import { useEffect, useState } from "react";
import http from "../functions/httpService";
const useJobList = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const url = `/joblist/byDayCreated`;
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

export default useJobList;
