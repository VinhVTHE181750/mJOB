import { useEffect, useState } from "react";
import http from "../../../functions/httpService";

const useJobStatus = (userId) => {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const url = `/myjobs/jobhistory/status/${userId}`;
        const response = await http.get(url);
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
