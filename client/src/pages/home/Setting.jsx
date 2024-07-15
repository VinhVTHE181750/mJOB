import React, {useState} from 'react';
import {Button, Card, Col, Container, Form, Nav, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Setting = () => {
    const [darkMode, setDarkMode] = useState(false);

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode', !darkMode);
    };

    const handleUpdateProfile = () => {
        alert('Update Profile function not implemented.');
    };

    return (
        <div>
            <header className="bg-dark text-white text-center py-3">
                <h1>Admin Dashboard - Settings</h1>
            </header>
            <Container fluid className="mt-3">
                <Row>
                    <Col md={3} className="bg-dark text-white p-4">
                        <h2>Navigation</h2>
                        <Nav className="flex-column">
                            <Nav.Link href="/dashboard" className="text-white">Dashboard</Nav.Link>
                            <Nav.Link href="/jobs" className="text-white">Jobs</Nav.Link>
                            <Nav.Link href="/users" className="text-white">Users</Nav.Link>
                            <Nav.Link href="/settings" className="text-white">Settings</Nav.Link>
                            <Row>
                                <Col><Button variant="danger" href="/logout">Logout</Button></Col>
                            </Row>
                        </Nav>
                    </Col>
                    <Col md={9} className="p-4">
                        <Card className="mb-4 shadow-sm">
                            <Card.Body>
                                <Card.Title>Profile Settings</Card.Title>
                                <Form>
                                    <Form.Group controlId="username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" defaultValue="admin" />
                                    </Form.Group>
                                    <Form.Group controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" defaultValue="admin@gmail.com" />
                                    </Form.Group>
                                    <Form.Group controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" />
                                    </Form.Group>
                                    <Button variant="success" onClick={handleUpdateProfile}>
                                        Update Profile
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                        
                        <Card className="mb-4 shadow-sm">
                            <Card.Body>
                                <Card.Title>Additional Settings</Card.Title>
                                <Form>
                                    <div className="form-group">
                                        <h3>Notification Preferences</h3>
                                        <Form.Check 
                                            type="checkbox"
                                            id="email-notifications"
                                            label="Email Notifications"
                                            defaultChecked
                                        />
                                        <Form.Check 
                                            type="checkbox"
                                            id="sms-notifications"
                                            label="SMS Notifications"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <h3>Privacy Settings</h3>
                                        <Form.Label htmlFor="profile-visibility">Profile Visibility</Form.Label>
                                        <Form.Control as="select" id="profile-visibility" name="profile-visibility">
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                        </Form.Control>
                                    </div>

                                    <div className="form-group">
                                        <h3>Language Settings</h3>
                                        <Form.Label htmlFor="language">Change Language</Form.Label>
                                        <Form.Control as="select" id="language" name="language">
                                            <option value="en">English</option>
                                            <option value="es">Vietnamese</option>
                                        </Form.Control>
                                    </div>

                                    <div className="form-group">
                                        <h3>Theme Settings</h3>
                                        <Form.Check 
                                            type="checkbox"
                                            id="theme"
                                            label="Dark Mode"
                                            onChange={handleThemeChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <Button type="submit" className="btn btn-success">Save Changes</Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Setting;
