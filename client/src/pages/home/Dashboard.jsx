import React from "react";
import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import {
  FaUser,
  FaUsers,
  FaBriefcase,
  FaSignOutAlt,
  FaChartBar,
  FaComments
} from "react-icons/fa";
import useCountUser from "../../hooks/useCountUser.js";
import useCountJob from "../../hooks/useCountJob.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const { count: countUsers } = useCountUser();
  const { count: countJobs } = useCountJob();

  const activeUsers = 0;
  const guests = 0;

  const data = {
    labels: ["Total Users", "Active Users", "Guests"],
    datasets: [
      {
        label: "User Statistics",
        data: [countUsers, activeUsers, countJobs],
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: true,
        text: "User Statistics:",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <header className="text-center">
        <h1>Admin Dashboard - Job Market</h1>
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
            <Row className="mb-4">
              <Col md={4}>
                <Nav.Link href="/users" className="p-0">
                  <Card className="text-white bg-success text-center p-4">
                    <Card.Body>
                      <Card.Title>
                        <FaUser className="me-2" /> {countUsers}
                      </Card.Title>
                      <Card.Text>Total Users</Card.Text>
                    </Card.Body>
                  </Card>
                </Nav.Link>
              </Col>
              <Col md={4}>
                <Card className="text-white bg-success text-center p-4">
                  <Card.Body>
                    <Card.Title>
                      <FaUser className="me-2" /> 0
                    </Card.Title>
                    <Card.Text>Active Users</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Nav.Link href="/jobs" className="p-0">
                  <Card className="text-white bg-success text-center p-4">
                    <Card.Body>
                      <Card.Title>
                        <FaBriefcase className="me-2" /> {countJobs}
                      </Card.Title>
                      <Card.Text>Total Jobs</Card.Text>
                    </Card.Body>
                  </Card>
                </Nav.Link>
              </Col>
            </Row>
            <Card className="mb-4">
              <Card.Body>
                <Bar data={data} options={options} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminDashboard;
