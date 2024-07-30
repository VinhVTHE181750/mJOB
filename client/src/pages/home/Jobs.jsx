import React, { useState, useEffect } from "react";
import { Button, Col, Container, Nav, Row, Table, Pagination } from "react-bootstrap";
import http from "../../functions/httpService";
import {
  FaBriefcase,
  FaChartBar,
  FaSignOutAlt,
  FaUsers,
  FaComments,
} from "react-icons/fa";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);

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
    alert("Edit Job function not implemented!");
  };

  const handleDeleteJob = async (id) => {
    try {
      await http.delete(`/delete-job/${id}`);
      alert("Job deleted successfully!");
      fetchJobs(); // Refresh the job list
    } catch (err) {
      console.error("Error deleting job:", err);
      alert("Error deleting job");
    }
  };

  // Get current jobs for the current page
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

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
                  <th>Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Posted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentJobs.map((job, index) => (
                  <tr key={job.id}>
                    <td>{index + 1 + indexOfFirstJob}</td>
                    <td>{job.title}</td>
                    <td>{job.contact}</td>
                    <td>{job.location}</td>
                    <td>{job.recruitments}</td>
                    <td>
                      <Button
                        variant="primary"
                        className="mr-2"
                        onClick={handleEditJob}
                      >
                        Detail
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteJob(job.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination className="justify-content-center">
              {[...Array(totalPages).keys()].map(number => (
                <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
                  {number + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Jobs;
