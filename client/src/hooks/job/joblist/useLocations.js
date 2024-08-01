import { useState, useEffect } from 'react';
import http from "../../../functions/httpService";

const useLocations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const url = `/joblist/locations`;
        const response = await http.get(url);
        setLocations(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  return { locations, loading, error };
};

export default useLocations;