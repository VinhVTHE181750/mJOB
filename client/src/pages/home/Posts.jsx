import React from 'react';
import { Container, Row, Col, Nav, Button, Table } from 'react-bootstrap';
import { FaChartBar, FaBriefcase, FaComments, FaUsers, FaSignOutAlt } from 'react-icons/fa';

const Posts = () => {

    const handleEditPost = () => {
        alert('Edit Post function not implemented!');
    };

    const handleDeletePost = () => {
        alert('Delete Post function not implemented!');
    };

    return (
        <div>
            <header className="text-center">
                <h1>Post Management</h1>
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
                                <Button variant="danger" className="mt-2" onClick={() => window.location.href='/logout'}>
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
                                    <th>Title</th>
                                    <th>Author</th>                              
                                    <th>Posted</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[1, 2, 3].map((_, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>Title Here</td>
                                        <td>Author Name</td>
                                        <td>Posted Date</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                className="mr-2"
                                                onClick={handleEditPost}
                                            >
                                                Detail
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={handleDeletePost}
                                            >
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

export default Posts;
