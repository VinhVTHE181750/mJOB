import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Button, Table } from 'react-bootstrap';
import { FaChartBar, FaBriefcase, FaComments, FaUsers, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from "react-router";


const Posts = () => {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/posts-manage');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const handleEditPost = (id) => {
        navigate(`/forum/posts/${id}`);
    };

    const handleDeletePost = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/delete-post/${id}`);
            setPosts(posts.filter(post => post.id !== id));
            alert("Post deleted successfully!");
        } catch (error) {
            console.error('Error deleting post:', error);
            alert("Error deleting post");
        }
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
                                {posts.map((post) => (
                                    <tr key={post.id}>
                                        <td>{post.id}</td>
                                        <td>{post.title}</td>
                                        <td>{post.User ? post.User.username : 'UNDEFINED'}</td>
                                        <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                                        <td>
                                            <Button
                                                variant="primary"
                                                className="mr-2"
                                                onClick={() => handleEditPost(post.id)}
                                            >
                                                Detail
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeletePost(post.id)}
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
