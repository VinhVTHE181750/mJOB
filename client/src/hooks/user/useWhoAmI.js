import { useEffect, useState } from "react";
import http from "../../functions/httpService";

const useWhoAmI = () => {
  const [role, setRole] = useState("USER");
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMe = async () => {
    try {
      const res = await http.get("/whoami");
      if (res.data) {
        setRole(res.data.role);
        setUserId(res.data.userId);
        setUsername(res.data.username);
        setLoading(false);
      }
      return res.data;
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return { fetchMe, userId, username, role, loading, error };
};

export default useWhoAmI;
