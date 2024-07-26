import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function ActiveAccountPage() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      const handleActiveAccount = async () => {
        try {
          const request = await axios.post("/auth/active-account", { email });
          if (request.status === 200) {
            alert("Active Account successfully");
            navigate("/");
          } else {
            alert("Error");
          }
        } catch (e) {
          console.error(e);
        }
      };
      handleActiveAccount();
    }
  }, [email]);
  return <></>;
}

export default ActiveAccountPage;
