import React, {useContext} from "react";
import {Container} from "react-bootstrap";
import {AuthContext} from "../context/AuthContext";

const AppFooter = () => {
  const { userId } = useContext(AuthContext);
  return <Container className="footer"></Container>;
};

export default AppFooter;
