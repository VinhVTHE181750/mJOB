import { useState } from "react";
import http from "../../functions/httpService";

const useInsertPaymentHistory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const insertPaymentHistory = async (paymentData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Structure the payment data object here
      const formattedData = {
        from: "1",
        to: "2",
        amount: 100,
        onPlatform: true,
        action: "Transfer",
        status: "Success",
        createdAt: new Date().toISOString(),
        userId: 1,
      };

      // console.log("Formatted Payment data: ", paymentData);

      const response = await http.post(`/payment/insert-payment-history`, paymentData);
      setSuccess(true);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, insertPaymentHistory };
};

export default useInsertPaymentHistory;
