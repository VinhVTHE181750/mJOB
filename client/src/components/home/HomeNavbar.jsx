import React from 'react';
import {Button, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import '../../assets/css/Navbar.css';

const HomeNavbar = ({ user }) => {

    const currentuser = null;
    return (
        <>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#" style={{backgroundColor:'darkgray', padding: '20px 40px 20px 40px'}}>Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: 'space-between',marginLeft: 'auto' }}>
                <Nav className="mr-auto container container-navbar link-1 left" style={{ justifyContent: 'space-evenly' }}>
                {/* <div style={{ display: 'flex', justifyContent: 'space-evenly', color: 'black'}}> */}
                        <Nav.Link href="/home" className={location.pathname === '/' || location.pathname === '/home' ? 'active' : ''}>Home</Nav.Link>
                        <Nav.Link href="/jobs" className={location.pathname === '/jobs' ? 'active' : ''}>Jobs</Nav.Link>
                        <Nav.Link href="/forum" className={location.pathname === '/forum' ? 'active' : ''}>Forum</Nav.Link>
                        <Nav.Link href="/technical" className={location.pathname === '/technical' ? 'active' : ''}>Technical</Nav.Link>
                        <Nav.Link href="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Nav.Link>
                {/* </div> */}
                </Nav>
                {true ? (
                    <Nav className='container container-navbar right' style={{ justifyContent: 'flex-end' }}>
                        <NavDropdown title="MeoMap" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile">User Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                            <NavDropdown.Item href="/myjobs">My Jobs</NavDropdown.Item>
                            <NavDropdown.Item href="/balance">Balance</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                ) : (
                    <Nav className='container container-navbar right' style={{ justifyContent: 'flex-end' }}>
                    {/* //<div style={{ display: 'flex', justifyContent: 'space-evenly',color: 'black'}}> */}
                        <Button variant="outline-secondary" onClick={() => window.location.href = '/login'} style={{ marginRight: '10px' }}>Login</Button>
                        <Button variant="outline-secondary" onClick={() => window.location.href = '/signup'}>Sign Up</Button>
                    {/* // </div>     */}
                    </Nav>
                    
                    
                )}
            </Navbar.Collapse>
        </Navbar>
        </>
    );
};

export default HomeNavbar;