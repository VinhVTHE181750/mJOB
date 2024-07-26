import { useEffect, useState } from "react";
import http from "../../functions/httpService";
const useBalancebyId = (userId) => {
  const [info, setInfo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const response = await http.get(`/payment/balance/${userId}`);
        const data = response.data;
        setLoading(false);
        setInfo(data);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);
  const fetchToUserInfo = async (toUserId) => {
    try {
      const response = await http.get(`/payment/balance/${toUserId}`);
      const data = response.data;
      // setToUserInfo({ user_id: data.user_id, username: data.username });
    } catch (error) {
      // setTransferError('Failed to fetch recipient information.');
    }
  };


  return { info, loading, error, fetchToUserInfo };
};

export default useBalancebyId ;
