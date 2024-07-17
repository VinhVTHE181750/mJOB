import { useEffect, useState } from "react";
import { API_URL } from "../../App";
import axios from "axios";
const useCheckUserTranferTo = (userId) => {
  const [info, setInfo] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/payment/tranferuser/${userId}`);
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

  return { info, loading, error };
};

export default useCheckUserTranferTo;
