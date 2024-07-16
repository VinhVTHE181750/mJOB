import {Button, Card, Col, Container, Nav, Row} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from "chart.js";
import useCountUser from "../../hooks/useCountUser.js";

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
  const activeUsers = 0;
  const guests = 0;

  const data = {
    labels: ["Total Users", "Active Users", "Guests"],
    datasets: [
      {
        label: "User Statistics",
        data: [countUsers, activeUsers, guests],
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
      <header className="bg-dark text-white text-center py-3">
        <h1>Admin Dashboard - Job Market</h1>
      </header>

      <Container fluid className="mt-3">
        <Row>
          <Col md={3} className="bg-dark text-white p-4">
            <h2>Navigation</h2>
            <Nav className="flex-column">
              <Nav.Link href="/dashboard" className="text-white">
                Dashboard
              </Nav.Link>
              <Nav.Link href="/jobs" className="text-white">
                Jobs
              </Nav.Link>
              <Nav.Link href="/users" className="text-white">
                Users
              </Nav.Link>         
              <Row>
                <Col>
                  <Button variant="danger" href="/logout">
                    Logout
                  </Button>
                </Col>
              </Row>
            </Nav>
          </Col>
          <Col md={9} className="p-4">
            <Row className="mb-4">
              <Col md={4}>
                <Card className="text-white bg-success text-center p-4">
                  <Card.Body>
                    <Card.Title>{countUsers}</Card.Title>
                    <Card.Text>Total Users</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-white bg-success text-center p-4">
                  <Card.Body>
                    <Card.Title>0</Card.Title>
                    <Card.Text>Active Users</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="text-white bg-success text-center p-4">
                  <Card.Body>
                    <Card.Title>0</Card.Title>
                    <Card.Text>Guests</Card.Text>
                  </Card.Body>
                </Card>
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
