import { useState } from "react";
import http from "../../functions/httpService";


const useUpdateUserBalance = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const updateUserBalance = async (userId, balance) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await http.put(`/payment/update-balance`, {
        userId,
        balance,
      });
      setSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, updateUserBalance };
};

export default useUpdateUserBalance;
