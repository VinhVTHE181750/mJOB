import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import http from "../functions/httpService";
import { jwtDecode } from "jwt-decode";
import useWhoAmI from "../hooks/user/useWhoAmI";
const UserInformationContext = createContext();

const UserInformationProvider = ({ children }) => {
  const { fetchMe } = useWhoAmI();
  const navigate = useNavigate();
  const [cookie] = useCookies(["token"]);
  const [userInformation, setUserInformation] = useState({});
  // console.log("🚀 ~ UserInformationProvider ~ userInformation:", userInformation)

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

  const handleLogout = async () => {
    try {
      const request = await http.post("/auth/logout");
      if (request.status === 200) {
        setIsLogin(false);        
        navigate("/login");
      }
    } catch (error) {
      // // console.log(error);
    }
  };

  return (
    <UserInformationContext.Provider
      value={{
        setIsLogin,
        isLogin,
        handleLogout,
        userInformation,
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
