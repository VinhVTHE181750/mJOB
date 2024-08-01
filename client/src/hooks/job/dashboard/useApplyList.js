import { useState, useEffect } from 'react';
import http from "../../../functions/httpService";

const useApplyList = (  ) => {
  const [applyList, setApplyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const fetchApplyList = async (userId) => {
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


  return { applyList, loading, error, fetchApplyList };
};

export default useApplyList;
