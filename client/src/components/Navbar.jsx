import React, { useState, useEffect, useContext } from "react";
import { Navbar, Nav, NavDropdown, Container, NavItem } from "react-bootstrap";
import NavigateLink from "./buttons/NavigateLink";
import { AuthContext } from "../context/AuthContext";

const AppNavbar = () => {
  const { userId } = useContext(AuthContext);
  return (
    <Navbar className="navbar">
      <Container className="nav-container">
        <Navbar.Brand href="/">LOGO</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto mx-auto navbar-section">
            {" "}
            {/* Change "me-auto" to "mx-auto" */}
            <NavigateLink className="navbar-btn" path="/home" text="Home" />
            <NavigateLink className="navbar-btn" path="/forum" text="Forum" />
            <NavigateLink className="navbar-btn" path="/jobs" text="Jobs" />
            <NavigateLink
              className="navbar-btn"
              path="/technical"
              text="Technical"
            />
            <NavigateLink
              className="navbar-btn"
              path="/profile"
              text="Profile"
            />
          </Nav>
          <Nav className="navbar-section">
            {userId ? (
              <NavigateLink
                className="navbar-btn danger-text"
                path="/logout"
                text="Logout"
              />
            ) : (
              <>
                <NavigateLink
                  className="navbar-btn"
                  path="/login"
                  text="Login"
                />
                <NavigateLink
                  className="navbar-btn"
                  path="/register"
                  text="Register"
                />
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
