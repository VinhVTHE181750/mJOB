import React from 'react';
import {Button, Card, Col, Container, Nav, Navbar, Row} from 'react-bootstrap';

const Jobs = () => {
    

    const handleEditJob = () => {
        alert('Edit Job function not implemented.');
    };

    const handleDeleteJob = () => {
        alert('Delete Job function not implemented.');
    };

    return (
        <div>
            <header className="bg-dark text-white text-center py-3">
                <h1>Admin Dashboard - Job Management</h1>
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
                        <Navbar bg="dark" variant="dark" expand="lg" className="mb-3">
                            
                        </Navbar>
                        <JobCard
                            title="Software Engineer"
                            company="Tech Corp"
                            location="Da Nang"
                            posted="2 days ago"
                            onEdit={handleEditJob}
                            onDelete={handleDeleteJob}
                        />
                        <JobCard
                            title="Product Manager"
                            company="Innovate Ltd"
                            location="HCM city"
                            posted="3 days ago"
                            onEdit={handleEditJob}
                            onDelete={handleDeleteJob}
                        />
                        <JobCard
                            title="Data Analyst"
                            company="Data Insights"
                            location="Ha Noi"
                            posted="4 days ago"
                            onEdit={handleEditJob}
                            onDelete={handleDeleteJob}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const JobCard = ({ title, company, location, posted, onEdit, onDelete }) => (
    <Card className="mb-4 shadow-sm">
        <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text className="text-muted">
                Company: {company} | Location: {location} | Posted: {posted}
            </Card.Text>
            <Card.Text>.......</Card.Text>
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

export default Jobs;