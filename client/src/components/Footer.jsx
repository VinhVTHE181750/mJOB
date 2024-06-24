import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, NavDropdown, Container, NavItem } from "react-bootstrap";
import NavigateLink from "./buttons/NavigateLink";
import { AuthContext } from "../context/AuthContext";

const AppFooter = () => {
  const { userId } = useContext(AuthContext);
  return <Container className="footer"></Container>;
};

export default AppFooter;
