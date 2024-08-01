import { useEffect, useState } from "react";
import http from "../../functions/httpService";
import socket from "../../socket";
import useWhoAmI from "../user/useWhoAmI";

const useBalance = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useWhoAmI();

  useEffect(() => {
    if(!userId) return;
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

    const handlePaymentUpdate = (data) => {
      setBalance(data.balance);
    };

    socket.on(`payment/${userId}`, handlePaymentUpdate);

    return () => {
      socket.off(`payment/${userId}`, handlePaymentUpdate);
    };
  }, [userId]);

  return { balance, loading, error };
};

export { useBalance };