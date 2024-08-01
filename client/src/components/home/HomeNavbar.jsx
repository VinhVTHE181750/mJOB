import React from 'react';
import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';
import useWhoAmI from '../../hooks/user/useWhoAmI';
import logo from '../../../logo.png';
import '../../assets/css/Navbar.css';

const HomeNavbar = () => {
  const { userId, username, fetchMe } = useWhoAmI();
  const { isLogin } = useAuth();
  const { isEmployerMode, setEmployerMode } = useAuth(); // Access the employer mode context
  const navigate = useNavigate();
  const location = useLocation();
  // Fetch user details
  React.useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const handleToggleMode = () => {
    console.log("Toggle mode:", isEmployerMode);
    setEmployerMode(prevMode => !prevMode);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#">
          <img
            src={logo}
            alt="mJob logo"
            className="float-right ms-5"
            style={{ width: '40px', height: '40px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="ms-auto justify-content-end">
          <Nav className="container container-navbar link-1">
            <Nav.Link
              href="/home"
              className={location.pathname === '/' || location.pathname === '/home' ? 'active nav-fixed' : 'nav-fixed'}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/market"
              className={location.pathname === '/market' ? 'active nav-fixed' : 'nav-fixed'}
            >
              Jobs
            </Nav.Link>
            <Nav.Link
              href="/forum"
              className={location.pathname === '/forum' ? 'active nav-fixed' : 'nav-fixed'}
            >
              Forum
            </Nav.Link>
            <Nav.Link
              href="/dashboard"
              className={location.pathname === '/dashboard' ? 'active nav-fixed' : 'nav-fixed'}
            >
              FAQs
            </Nav.Link>
            <Nav.Link
              href={`/profile/${userId}`}
              className={location.pathname === '/profile' ? 'active nav-fixed' : 'nav-fixed'}
            >
              Profile
            </Nav.Link>
          </Nav>
          {isLogin ? (
            <>
              <Nav.Link
                href="/reports"
                className={location.pathname === '/reports' ? 'active nav-fixed' : 'nav-fixed'}
              >
                Report
              </Nav.Link>
              <Nav.Link
                href="/draw-balance"
                className={location.pathname === '/draw-balance' ? 'active nav-fixed' : 'nav-fixed'}
              >
                Balance
              </Nav.Link>
              <Nav.Link
                href={`/profile/${userId}`}
                className={location.pathname === '/profile' ? 'active nav-fixed' : 'nav-fixed'}
              >
                Profile
              </Nav.Link>
              <Nav className="container container-navbar d-flex justify-content-end">
                <NavDropdown title={`${username}`} id="basic-nav-dropdown" align="end">
                  <NavDropdown.Item href="/profile">User Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                  <NavDropdown.Item href="/myjobs">My Jobs</NavDropdown.Item>
                  <NavDropdown.Item href="/payment">Payment Portal</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleToggleMode}>{isEmployerMode ? 'User Mode' : 'Employer Mode'}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
          ) : (
            <Nav className="container container-navbar right" style={{ justifyContent: 'flex-end' }}>
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/login')}
                style={{ marginRight: '10px' }}
              >
                Login
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </Nav>
          )}

        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default HomeNavbar;
