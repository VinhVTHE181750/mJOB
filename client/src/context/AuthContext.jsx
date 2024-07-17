import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { useLoginQuery } from "../hooks/useLoginQuery";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const { login } = useLoginQuery();
  const [cookie, setCookie, removeCookie] = useCookies(['token'])

  const [loggedIn, setLoggedIn] = useState(() => {
    return cookie.token ? true : false;
  });

  // useEffect(() => {
  //   // // console.log(loggedIn)
  //   console.table(cookie);
  // }, [loggedIn]);

  const authenticate = async (username, password) => {
    if (loggedIn) return;
    const success = await login(username, password);
    if (success) {
      // Set the cookie and update loggedIn state here
      // setCookie('token', 'your_token_here'); // Example, replace 'your_token_here' with actual token
      setLoggedIn(true);
    } else {
      setError("Login failed");
    }
  };

  const logout = () => {
    // Remove 'token' cookie
    if (!loggedIn) return;
    removeCookie("token");
  };

  return (
    <AuthContext.Provider value={{ logout, authenticate, loggedIn, error }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext, AuthProvider };
