import { useEffect, useState } from "react";
import http from "../../functions/httpService";
const useBalance = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        const response = await http.get(`/payment/balance`);
        const data = response.data;
        setLoading(false);
        setBalance(data.balance);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  return { balance, loading, error };
};

export { useBalance };
