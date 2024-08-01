import { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"; // Changed to 'react-router-dom' for consistency
import http from "../functions/httpService";
import { jwtDecode } from "jwt-decode";
import useWhoAmI from "../hooks/user/useWhoAmI";

const UserInformationContext = createContext();

const UserInformationProvider = ({ children }) => {
  const { fetchMe } = useWhoAmI();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const [userInformation, setUserInformation] = useState({});
  const [isEmployerMode, setEmployerMode] = useState(() => {
    // Retrieve employer mode from local storage if available
    return JSON.parse(localStorage.getItem('isEmployerMode')) || false;
  });
  const [isLogin, setIsLogin] = useState(() => cookies.token || false);

  useEffect(() => {
    if (cookies.token) {
      try {
        const decoded = jwtDecode(cookies.token);
        setUserInformation(decoded);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, [cookies]);

  useEffect(() => {
    // Save employer mode to local storage
    localStorage.setItem('isEmployerMode', JSON.stringify(isEmployerMode));
  }, [isEmployerMode]);

  const handleRedirectError = (message) => {
    navigate("/error", { state: { message } });
  };

  const handleLogout = async () => {
    try {
      const request = await http.post("/auth/logout");
      if (request.status === 200) {
        setIsLogin(false);
        // Clear local storage and cookies
        localStorage.removeItem('isEmployerMode');
        setCookie('token', '', { path: '/' });
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
        isEmployerMode,
        setEmployerMode
      }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(UserInformationContext);
  if (!auth) {
    throw new Error("useAuth must be used within a UserInformationProvider");
  }
  return auth;
};

export default UserInformationProvider;
