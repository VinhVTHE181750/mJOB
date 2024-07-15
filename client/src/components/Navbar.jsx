import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import NavigateLink from "./ui/buttons/NavigateLink";

const AppNavbar = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <Navbar className="navbar mb-auto">
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
            {loggedIn ? (
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
