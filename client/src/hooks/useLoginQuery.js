import { useState } from "react";
import http from "../functions/httpService"; // Import the instance
import { useAuth } from "../context/UserContext";

export const useLoginQuery = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setIsLogin } = useAuth();

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await http.post("/auth/login", { username, password });
      if (response.status === 200) {
        setIsLogin(true);
      }
      return response.status === 200;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
};
