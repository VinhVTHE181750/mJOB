import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Employer = () => {
  return (
    <Container>
      <Card className="text-center profile-header bg-primary text-white">
        <Card.Body>
          <Card.Img 
            src="profile-picture.jpg" 
            alt="Profile Picture" 
            className="profile-picture mb-3"
            style={{ width: '150px', height: '150px', borderRadius: '50%' }} 
          />
          <Card.Title as="h1">Company Name</Card.Title>
          <Card.Text>Industry: Tech</Card.Text>
        </Card.Body>
      </Card>

      <Row className="mt-4">
        <Col md={8}>
          <Card className="profile-details mb-4">
            <Card.Body>
              <Card.Title as="h2">About Us</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla interdum tincidunt diam, non pulvinar urna aliquam vel. Maecenas sed magna ut ipsum facilisis euismod. Curabitur consequat elit nec nisl lacinia, vel convallis lectus lacinia.
              </Card.Text>
              <Card.Title as="h2">Services</Card.Title>
              <Card.Text>
                - Service 1<br />
                - Service 2<br />
                - Service 3<br />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="contact-info">
            <Card.Body>
              <Card.Title as="h2">Contact Information</Card.Title>
              <Card.Text><strong>Address:</strong> 1234 Street Name, City, State, ZIP</Card.Text>
              <Card.Text><strong>Phone:</strong> (123) 456-7890</Card.Text>
              <Card.Text><strong>Email:</strong> contact@company.com</Card.Text>
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
