import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import {  FaUsers, FaBriefcase, FaSignOutAlt, FaChartBar } from "react-icons/fa";

const Jobs = () => {
  const handleEditJob = () => {
    alert("Edit Job function not implemented.");
  };

  const handleDeleteJob = () => {
    alert("Delete Job function not implemented.");
  };

  return (
    <div>
      <header className="text-center">
        <h1>Job Management</h1>
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
              <div >
                <Button variant="danger" href="/logout" className="mt-2">
                <FaSignOutAlt className="me-2" /> Logout
                </Button>
              </div>
            </Nav>
          </Col>
          <Col md={10} className="p-4">
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
