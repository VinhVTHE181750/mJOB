import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import {
  FaUser,
  FaUsers,
  FaBriefcase,
  FaSignOutAlt,
  FaChartBar,
} from "react-icons/fa";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/job-list");
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

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
              <Nav.Link href="/dashboard" className="text-dark">
                <FaChartBar className="me-2" /> Dashboard
              </Nav.Link>
              <Nav.Link href="/jobs" className="text-dark">
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
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.contact}
                location={job.location}
                posted={job.recruitments}
                onEdit={handleEditJob}
                onDelete={handleDeleteJob}
              />
            ))}
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
