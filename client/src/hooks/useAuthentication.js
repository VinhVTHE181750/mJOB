import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UserInformationContext = createContext();

const UserInformationProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userInformation, setUserInformation] = useState(
    () => JSON.parse(localStorage.getItem("userInformation")) || {}
  );

  const [isLogin, setIsLogin] = useState(
    () => JSON.parse(localStorage.getItem("isLogin")) || false
  );

  const handleLogout = async () => {
    setIsLogin(false);
    setUserInformation(null);
    localStorage.removeItem("userInformation");
    localStorage.removeItem("isLogin");
    navigate("/");
  };

  useEffect(() => {
    if (userInformation)
      localStorage.setItem("userInformation", JSON.stringify(userInformation));
  }, [userInformation]);

  useEffect(() => {
    if (isLogin) localStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [isLogin]);

  return (
    <UserInformationContext.Provider
      value={{
        userInformation,
        setUserInformation,
        setIsLogin,
        isLogin,
        handleLogout,
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
