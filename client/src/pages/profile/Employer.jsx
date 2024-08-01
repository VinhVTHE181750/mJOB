import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router';

const Employer = () => {
  const [employer, setEmployer] = useState(null);
  const [displayedSize, setDisplayedSize] = useState(0);
  const params = useParams();
  const employerId = params.id;

  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/profile/employer/${employerId}`);
        const data = await response.json();
        setEmployer(data);
      } catch (error) {
        console.error('Error fetching employer data:', error);
      }
    };

    fetchEmployer();
  }, [employerId]);

  useEffect(() => {
    if (employer) {
      let start = 0;
      const end = employer.size;
      const duration = 2000; // duration of the effect in milliseconds
      const incrementTime = Math.abs(Math.floor(duration / end));
      const timer = setInterval(() => {
        start += 1;
        setDisplayedSize(start);
        if (start === end) clearInterval(timer);
      }, incrementTime);
      return () => clearInterval(timer);
    }
  }, [employer]);

  if (!employer) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      <Card className="text-center profile-header bg-primary text-white my-4">
        <Card.Body>
          <Card.Title as="h1">{employer.name}</Card.Title>
          <Card.Text>Industry: {employer.industry}</Card.Text>
        </Card.Body>
      </Card>

      <Row className="mt-4">
        <Col md={8}>
          <Card className="profile-details mb-4">
            <Card.Body>
              <Card.Title as="h2">About Us</Card.Title>
              <Card.Text>{employer.description}</Card.Text>
              <Card.Text><strong>Organization: </strong> {employer.organization}</Card.Text>
              <Card.Text><strong>{displayedSize}+</strong> employees</Card.Text>
              <Card.Text><strong>Established in:</strong> {new Date(employer.founded).getFullYear()}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="contact-info">
            <Card.Body>
              <Card.Title as="h2">Contact Information</Card.Title>
              <Card.Text><strong>Address:</strong> {employer.address}</Card.Text>
              <Card.Text><strong>Phone:</strong> {employer.phone}</Card.Text>
              <Card.Text><strong>Email:</strong> {employer.email}</Card.Text>
              <Card.Text><strong>Website:</strong> <a href={employer.website} target="_blank" rel="noopener noreferrer">{employer.website}</a></Card.Text>
              <Card.Title as="h2">Follow Us</Card.Title>
              <Button href="#" variant="primary" className="mr-2">Facebook</Button>
              <Button href="#" variant="info" className="mr-2">Twitter</Button>
              <Button href="#" variant="danger">Instagram</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Employer;
