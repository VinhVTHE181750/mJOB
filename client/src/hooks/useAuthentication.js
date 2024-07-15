import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie"
import axios from "axios"

const UserInformationContext = createContext();

const UserInformationProvider = ({ children }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(
    () => Cookies.get("token") || false
  );

  const handleLogout = async () => {
    try {
      const request = await axios.post("/logout")
      if (request.status === 200) {
        setIsLogin(false);
        Cookies.remove("token")
        navigate("/");
      }
    } catch(error) {
      console.log(error)
    }
  };

  // useEffect(() => {
  //   if (userInformation)
  //     localStorage.setItem("userInformation", JSON.stringify(userInformation));
  // }, [userInformation]);

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
