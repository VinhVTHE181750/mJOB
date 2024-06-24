import { useState } from "react";
import axios from "axios";

export const useLoginQuery = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    console.log("useLoginQuery.login(", username, password, ")");
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.get("http://localhost:8000/api/auth/login", {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        },
      });
      setData(response.data);
      return response.data;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { login, data, error, loading };
};
