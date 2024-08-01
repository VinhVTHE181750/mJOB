import { useEffect, useState, useCallback } from "react";
import { Button, Col, Container, Nav, Row, Table } from "react-bootstrap";
import { FaBriefcase, FaChartBar, FaSignOutAlt, FaUsers, FaComments } from "react-icons/fa";
import { useNavigate } from "react-router";
import http from "../../functions/httpService";

const Users = () => {
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
    }
  };

  const navigate = useNavigate();

  const handleEditUser = useCallback(
    (id) => {
      navigate(`/profile/${id}`);
    },
    [navigate]
  );


  const handleDeleteUser = async (id) => {
    try {
      await http.delete(`/delete-user/${id}`);
      alert("User deleted successfully!");
      fetchUsers(); // Refresh the user list
    } catch (err) {
      alert("Error deleting user");
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
              <Nav.Link href="/dashboard" className="text-dark">
                <FaChartBar className="me-2" /> Dashboard
              </Nav.Link>
              <Nav.Link href="/jobs" className="text-dark">
                <FaBriefcase className="me-2" /> Jobs
              </Nav.Link>
              <Nav.Link href="/posts" className="text-dark">
                <FaComments className="me-2" /> Posts
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
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Registered</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{`${user.firstName} ${user.lastName}`}</td>
                    <td>{user.email}</td>
                    <td>{user.Auth ? user.Auth.role : "USER"}</td>
                    <td>{user.createdAt}</td>
                    <td>
                      <Button variant="primary" className="mr-2" onClick={() => handleEditUser(user.id)}>
                        Detail
                      </Button>
                      <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Users;