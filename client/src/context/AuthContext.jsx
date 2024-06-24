import React, { createContext, useState, useEffect } from "react";
import { useLoginQuery } from "../hooks/useLoginQuery";
import { useNavigate } from "react-router";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const { login } = useLoginQuery();
  const [userId, setUserId] = useState(() => {
    const savedId = localStorage.getItem("userId");
    // const savedToken = localStorage.getItem("token");
    return savedId ? JSON.parse(savedId) : null;
    // return savedToken ? savedToken : null;
  });

  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", JSON.stringify(userId));
      // localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("userId");
      // localStorage.removeItem("token");
    }
  }, [userId]);

  const authenticate = async (username, password) => {
    console.log("authenticate(", username, ",", password, ")");
    const response = await login(username, password);
    if (response) {
      console.log("data.user_id: ", response.user_id);
      setError(null);
      setUserId(response.user_id);
      localStorage.setItem("userId", JSON.stringify(response.user_id));
      // setToken(data.token);
    } else {
      // should set state [error] here
      return false;
    }
  };

  const logout = () => {
    console.log("logout");
    setUserId(null);
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ userId, setUserId, logout, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

// import { createContext, useEffect, useState } from "react";
// import { useLoginQuery } from "../hooks/useLoginQuery";

// const AuthContext = createContext({});

// const AuthProvider = ({ children }) => {
//   //   const { login, data, error} = useLoginQuery();
//   const [userId, setUserId] = useState(() => {
//     const savedId = localStorage.getItem("userId");
//     return savedId ? JSON.parse(savedId) : null;
//   });

//   const { login: qLogin } = useLoginQuery();

//   useEffect(() => {
//     if (userId) {
//       localStorage.setItem("userId", JSON.stringify(userId));
//     } else {
//       localStorage.removeItem("userId");
//     }
//   }, [userId]);

//   const logout = () => {
//     setUserId(null);
//     localStorage.removeItem("userId");
//   };

//   const login = (id) => {
//     setUserId(id);
//   };

//   const authenticate = async (username, password) => {
//     const response = await qLogin(username, password);
//     if (response) {
//       login(response.userId);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ userId, setUserId, logout, authenticate }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
