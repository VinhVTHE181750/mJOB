import { useState } from "react";
import axios from "axios";
import { useAuth } from "./useAuthentication";

export const useLoginQuery = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    const { setIsLogin, setUserInformation } = useAuth();
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        { username, password },
        {
          headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          },
        }
      );
      setData(response.data);
      setUserInformation(response.data);
      setIsLogin(true);

      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { login, data, error, loading };
};
