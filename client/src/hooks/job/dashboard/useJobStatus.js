import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8000/api/myjobs";

const useJobStatus = (userId) => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const url = `${API_URL}/jobhistory/status/${userId}`;
        const response = await axios.get(url);
        setStatuses(response.data);
useJobStatus      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, [userId]);

  return { statuses, loading, error };
};

export default useJobStatus;
