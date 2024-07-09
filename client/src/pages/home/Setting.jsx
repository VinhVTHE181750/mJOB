import React from 'react';
import {Button, Card, Col, Container, Form, Nav, Row} from 'react-bootstrap';

const Setting = () => {
    const handleUpdateProfile = () => {
        alert('Update Profile function not implemented.');
    };

    const handleUpdateNotifications = () => {
        alert('Update Notifications function not implemented.');
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
                                <Card.Title>Notification Settings</Card.Title>
                                <Form>
                                    <Form.Group controlId="emailNotifications">
                                        <Form.Label>Email Notifications</Form.Label>
                                        <Form.Control as="select">
                                            <option value="Enabled">Enabled</option>
                                            <option value="Disabled">Disabled</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="smsNotifications">
                                        <Form.Label>SMS Notifications</Form.Label>
                                        <Form.Control as="select">
                                            <option value="Enabled">Enabled</option>
                                            <option value="Disabled">Disabled</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="success" onClick={handleUpdateNotifications}>
                                        Update Notifications
                                    </Button>
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