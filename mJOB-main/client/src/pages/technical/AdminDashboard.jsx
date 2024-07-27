import React from 'react';
import {Card, Col, Container, Nav, Navbar, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminDashboard = () => {
  return (
    <>
      <header className="bg-dark text-white text-center py-3">
        <h1>Admin Dashboard - Job Market</h1>
      </header>
      <Navbar bg="dark" variant="dark" expand="lg" className="justify-content-around">
        <Nav>
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/jobs">Jobs</Nav.Link>
          <Nav.Link href="/users">Users</Nav.Link>
          <Nav.Link href="/settings">Settings</Nav.Link>
          <Nav.Link href="/logout">Logout</Nav.Link>
        </Nav>
      </Navbar>
      <Container fluid className="mt-3">
        <Row>
          <Col md={3} className="bg-dark text-white p-4">
            <h2>Navigation</h2>
            <Nav className="flex-column">
              <Nav.Link href="/dashboard" className="text-white">Dashboard</Nav.Link>
              <Nav.Link href="/jobs" className="text-white">Jobs</Nav.Link>
              <Nav.Link href="/users" className="text-white">Users</Nav.Link>
              <Nav.Link href="/settings" className="text-white">Settings</Nav.Link>
              <Nav.Link href="/logout" className="text-white">Logout</Nav.Link>
            </Nav>
          </Col>
          <Col md={9} className="p-4">
            <Row className="mb-4">
              <Col md={4}>
                <Card className="text-white bg-success text-center p-4">
                  <Card.Body>
                    <Card.Title>120</Card.Title>
                    <Card.Text>Total Jobs</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-white bg-success text-center p-4">
                  <Card.Body>
                    <Card.Title>80</Card.Title>
                    <Card.Text>Active Users</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-white bg-success text-center p-4">
                  <Card.Body>
                    <Card.Title>15</Card.Title>
                    <Card.Text>New Applications</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Recent Job Postings</Card.Title>
                <Card.Text>
                  <Row className="border-bottom py-2">
                    <Col>Software Engineer</Col>
                    <Col className="text-end">2 days ago</Col>
                  </Row>
                  <Row className="border-bottom py-2">
                    <Col>Product Manager</Col>
                    <Col className="text-end">3 days ago</Col>
                  </Row>
                  <Row className="border-bottom py-2">
                    <Col>Data Analyst</Col>
                    <Col className="text-end">4 days ago</Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title>Recent Activities</Card.Title>
                <Card.Text>
                  <Row className="border-bottom py-2">
                    <Col>Duc for Software Engineer</Col>
                    <Col className="text-end">2 hours ago</Col>
                  </Row>
                  <Row className="border-bottom py-2">
                    <Col>Vinh registered</Col>
                    <Col className="text-end">5 hours ago</Col>
                  </Row>
                  <Row className="border-bottom py-2">
                    <Col>Minh posted a new job</Col>
                    <Col className="text-end">1 day ago</Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;