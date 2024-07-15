import Cookies from "js-cookie";
import { createContext, useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import http from "../functions/httpService";

const UserInformationContext = createContext();

const UserInformationProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookie] = useCookies(["token"]);

  const [isLogin, setIsLogin] = useState(
    // () => cookies.get("token") || false
    () => cookie.token || false
  );

  const handleLogout = async () => {
    try {
      const request = await http.post("/auth/logout");
      if (request.status === 200) {
        setIsLogin(false);
        Cookies.remove("token");
        navigate("/");
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
      }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const auth = useContext(UserInformationContext);
  return auth;
};

export default UserInformationProvider;
