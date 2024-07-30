import { useState, useEffect } from 'react';
import http from "../../../functions/httpService";

const useApplyList = ( userId ) => {
  const [applyList, setApplyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplyList = async () => {
      try {
        const url = `/myjobs/applylist/${userId}`;
        const response = await http.get( url);
        setApplyList(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplyList();
  }, []);

  return { applyList, loading, error };
};

export default useApplyList;
