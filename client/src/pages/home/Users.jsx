
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Nav, Row } from 'react-bootstrap';
import { useNavigate } from "react-router";
import http from "../../functions/httpService";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await http.get('/users-role');
            setUsers(response.data);
        } catch (err) {
            alert('Error fetching users');
        }
    };
    const navigate = useNavigate();
    const handleEditUser = (id) => {
        navigate(`/profile/${id}`);
    };

    const handleDeleteUser = async (id) => {
        try {
            await http.delete(`/delete/${id}`);
            alert('User deleted successfully!');
            fetchUsers(); // Refresh the user list
        } catch (err) {
            alert('Error deleting user');
        }
    };

    return (
        <div>
            <header className="text-center">
                <h1>User Management</h1>
            </header>
            <Container fluid className="mt-3">
                <Row>
                    <Col md={2} >
                        <h2>Navigation</h2>
                        <Nav className="flex-column">
                            <Nav.Link href="/dashboard" className="text-black">Dashboard</Nav.Link>
                            <Nav.Link href="/jobs" className="text-black">Jobs</Nav.Link>
                            <Nav.Link href="/users" className="text-black">Users</Nav.Link>
                            
                            <Row>
                                <Col><Button variant="danger" href="/logout">Logout</Button></Col>
                            </Row>
                        </Nav>
                    </Col>
                    <Col md={10} className="p-4">
                        {users.map(user => (
                            <UserCard
                                key={user.id}
                                id={user.id}
                                name={`${user.firstName} ${user.lastName}`}
                                email={user.email}
                                role={user.Auth ? user.Auth.role : 'N/A'}
                                registered={user.createdAt}
                                onEdit={handleEditUser}
                                onDelete={handleDeleteUser}
                            />
                        ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const UserCard = ({ id, name, email, role, registered, onEdit, onDelete }) => (
    <Card className="mb-4 shadow-sm">
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text className="text-muted">
                Email: {email} | Role: {role} | Registered: {registered}
            </Card.Text>
            <Card.Text>Additional information...</Card.Text>
            <div className="d-flex justify-content-end">
                <Button variant="primary" className="mr-2" onClick={() => onEdit(id)}>
                    Detail
                </Button>
                <Button variant="danger" onClick={() => onDelete(id)}>
                    Delete
                </Button>
            </div>
        </Card.Body>
    </Card>
);

export default Users;
