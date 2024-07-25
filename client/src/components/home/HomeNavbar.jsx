import React from 'react';
import {Button, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import useWhoAmI from '../../hooks/user/useWhoAmI';
import '../../assets/css/Navbar.css';
import { useNavigate } from 'react-router-dom';

const HomeNavbar = ({ user }) => {
    const { fetchMe, userId, username, role } = useWhoAmI();
    return (
        <>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#" style={{backgroundColor:'darkgray', padding: '20px 40px 20px 40px'}}>Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={{ justifyContent: 'space-between',marginLeft: 'auto' }}>
                <Nav className="mr-auto container container-navbar link-1 left" style={{ justifyContent: 'space-evenly' }}>
                {/* <div style={{ display: 'flex', justifyContent: 'space-evenly', color: 'black'}}> */}
                        <Nav.Link href="/home" className={location.pathname === '/' || location.pathname === '/home' ? 'active nav-fixed' : 'nav-fixed'}>Home</Nav.Link>
                        <Nav.Link href="/market" className={location.pathname === '/market' ? 'active nav-fixed' : 'nav-fixed'}>Jobs</Nav.Link>
                        <Nav.Link href="/forum" className={location.pathname === '/forum' ? 'active nav-fixed' : 'nav-fixed'}>Forum</Nav.Link>
                        <Nav.Link href="/technical" className={location.pathname === '/technical' ? 'active nav-fixed' : 'nav-fixed'}>Technical</Nav.Link>
                        <Nav.Link href="/profile" className={location.pathname === '/profile' ? 'active nav-fixed' : 'nav-fixed'}>Profile</Nav.Link>
                {/* </div> */}
                </Nav>
                {userId!= -1 ? (
                    <Nav className='container container-navbar right' style={{ justifyContent: 'flex-end' }}>
                        <NavDropdown title={`${username}`} id="basic-nav-dropdown">
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