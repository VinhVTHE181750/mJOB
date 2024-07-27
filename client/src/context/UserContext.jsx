import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import http from "../functions/httpService";
import { jwtDecode } from "jwt-decode";

const UserInformationContext = createContext();

const UserInformationProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookie] = useCookies(["token"]);
  const [userInformation, setUserInformation] = useState({});

  const [isLogin, setIsLogin] = useState(
    // () => cookies.get("token") || false
    () => cookie.token || false
  );

  useEffect(() => {
    if (cookie) {
      try {
        const decoded = jwtDecode(cookie?.token);
        setUserInformation(decoded);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [cookie]);

  const handleRedirectError = (messsage) => {
    navigate("/error", { state: { messsage } });
  };

  const handleLogout = async () => {
    try {
      const request = await http.post("/auth/logout");
      if (request.status === 200) {
        setIsLogin(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserInformationContext.Provider
      value={{
        setIsLogin,
        isLogin,
        handleLogout,
        userInformation,
        handleRedirectError,
      }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(UserInformationContext);
  return auth;
};

export default UserInformationProvider;
