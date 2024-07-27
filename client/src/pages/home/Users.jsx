import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import { FaBriefcase, FaChartBar, FaSignOutAlt, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router";
import http from "../../functions/httpService";
import { useAuth } from "../../context/UserContext";

const Users = () => {
  const { handleRedirectError } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await http.get("/users-role");
      setUsers(response.data);
    } catch (err) {
      alert("Error fetching users");
      handleRedirectError("server error");
    }
  };
  const navigate = useNavigate();
  const handleEditUser = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleDeleteUser = async (id) => {
    try {
      await http.delete(`/delete/${id}`);
      alert("User deleted successfully!");
      fetchUsers(); // Refresh the user list
    } catch (err) {
      alert("Error deleting user");
      handleRedirectError("server error");
    }
  };

  return (
    <div>
      <header className="text-center">
        <h1>User Management</h1>
      </header>
      <Container fluid className="mt-3">
        <Row>
          <Col md={2} className="bg-light p-3" style={{ minHeight: "100vh" }}>
            <h2 className="text-center">Navigation</h2>
            <Nav className="flex-column">
              <Nav.Link href="/dashboard" className="text-dark ">
                <FaChartBar className="me-2" /> Dashboard
              </Nav.Link>
              <Nav.Link href="/jobs" className="text-dark ">
                <FaBriefcase className="me-2" /> Jobs
              </Nav.Link>
              <Nav.Link href="/users" className="text-dark">
                <FaUsers className="me-2" /> Users
              </Nav.Link>
              <div>
                <Button variant="danger" href="/logout" className="mt-2">
                  <FaSignOutAlt className="me-2" /> Logout
                </Button>
              </div>
            </Nav>
          </Col>
          <Col md={10} className="p-4">
            {users.map((user) => (
              <UserCard
                key={user.id}
                id={user.id}
                name={`${user.firstName} ${user.lastName}`}
                email={user.email}
                role={user.Auth ? user.Auth.role : "USER"}
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
        Email: {email} | Role: {role}
      </Card.Text>
      <Card.Text className="text-muted">Registered: {registered}</Card.Text>
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
