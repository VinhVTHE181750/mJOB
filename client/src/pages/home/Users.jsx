import React from 'react';
import {Button, Card, Col, Container, Nav, Navbar, Row} from 'react-bootstrap';

const Users = () => {
    

    const handleEditUser = () => {
        alert('Edit User function not implemented.');
    };

    const handleDeleteUser = () => {
        alert('Delete User function not implemented.');
    };

    return (
        <div>
            <header className="bg-dark text-white text-center py-3">
                <h1>Admin Dashboard - User Management</h1>
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
                                <Col><Button variant="danger" href="/logout">Log Out</Button></Col>
                            </Row>
                        </Nav>
                    </Col>
                    <Col md={9} className="p-4">
                        <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
                            
                        </Navbar>
                        <UserCard
                            name="Pham Duc Minh"
                            email="minh@gmail.com"
                            role="Admin"
                            registered="2 days ago"
                            onEdit={handleEditUser}
                            onDelete={handleDeleteUser}
                        />
                        <UserCard
                            name="Truong Tuan Vinh"
                            email="vinh@gmail.com"
                            role="User"
                            registered="3 days ago"
                            onEdit={handleEditUser}
                            onDelete={handleDeleteUser}
                        />
                        <UserCard
                            name="Do Minh Duc"
                            email="duc@gmail.com"
                            role="User"
                            registered="4 days ago"
                            onEdit={handleEditUser}
                            onDelete={handleDeleteUser}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const UserCard = ({ name, email, role, registered, onEdit, onDelete }) => (
    <Card className="mb-4 shadow-sm">
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text className="text-muted">
                Email: {email} | Role: {role} | Registered: {registered}
            </Card.Text>
            <Card.Text>Additional information...</Card.Text>
            <div className="d-flex justify-content-end">
                <Button variant="primary" className="mr-2" onClick={onEdit}>
                    Detail
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    Delete
                </Button>
            </div>
        </Card.Body>
    </Card>
);

export default Users;