import { Container, Nav, Navbar } from "react-bootstrap";
import { useAuth } from "../context/UserContext";
import NavigateLink from "./ui/buttons/NavigateLink";
import Cookies from "js-cookie";
import useWhoAmI from "../hooks/user/useWhoAmI";


const AppNavbar = () => {
  // const { isLogin } = useContext(AuthContext);
  const { isLogin, userInformation } = useAuth();
  const userId  = userInformation.id
  console.log(userId);

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
            <NavigateLink className="navbar-btn" path="/faq" text="FAQs" />
            <NavigateLink
              className="navbar-btn"
              path="/report"
              text="Reports"
            />
            <NavigateLink
              className="navbar-btn"
              path="/technical"
              text="Technical"
            />
            {isLogin && (
              <>
                <NavigateLink
                  className="navbar-btn"
                  path={`/profile/${userId}`}
                  text="Profile"
                />
                <NavigateLink
                  className="navbar-btn"
                  path={`/balance`}
                  text="Balance"
                />
              </>
            )}
          </Nav>
          <Nav className="navbar-section">
            {isLogin ? (
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

