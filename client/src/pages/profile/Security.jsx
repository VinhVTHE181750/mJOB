import React from 'react';
import {Button, Card, Col, Container, Form, Nav, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SecurityPage = () => {
  return (
    <>
      
      <Container fluid className="mt-3">
        <Row>
          <Col md={3} className="bg-dark text-white p-4">
            
            <Nav className="flex-column">
            <h2><Nav.Link href="/editprofile" className="text-white">Profile</Nav.Link></h2>
              <Nav.Link href="/workinformation" className="text-white">Work Information</Nav.Link>
              <Nav.Link href="/security" className="text-white">Security</Nav.Link>
              <Row>
                <Col><Button variant="danger" href="/logout">Log Out</Button></Col>
              </Row>
            </Nav>
          </Col>
          <Col md={9} className="p-4">
            <Card className="mb-4">
              <Card.Body>
                <Form>
                  <Form.Group as={Row} controlId="currentPassword">
                    <Form.Label column sm={2}>Current Password</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="password" placeholder="Current Password" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="newPassword">
                    <Form.Label column sm={2}>New Password</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="password" placeholder="New Password" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="confirmPassword">
                    <Form.Label column sm={2}>Confirm New Password</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="password" placeholder="Confirm New Password" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button type="submit">Save Changes</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Body>
                <Form>
                  <Form.Group as={Row} controlId="currentEmail">
                    <Form.Label column sm={2}>Current Email</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="email" placeholder="Current Email" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="newEmail">
                    <Form.Label column sm={2}>New Password</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="email" placeholder="New Email" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button type="submit">Save Changes</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SecurityPage;
