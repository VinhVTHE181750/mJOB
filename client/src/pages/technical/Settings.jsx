import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Settings = () => {
  return (
    <Container>
      <header>
        <div className="text-center">
          <h1 className="text-black">Settings</h1>
        </div>
      </header>
      <br></br>
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="text-center">Change Password</Card.Title>
              
              <Form>
                <Form.Group controlId="currentPassword" className="mb-3">
                  <Form.Label>Current Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter current password" />
                </Form.Group>
                <Form.Group controlId="newPassword" className="mb-3">
                  <Form.Label>New Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter new password" />
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="mb-3">
                  <Form.Label>Confirm New Password:</Form.Label>
                  <Form.Control type="password" placeholder="Confirm new password" />
                </Form.Group>
                <Button  type="submit">
                  Change Password
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="text-center" >Preferences</Card.Title>
              <Form>
                <Form.Group controlId="language" className="mb-3">
                  <Form.Label>Language:</Form.Label>
                  <Form.Control as="select">
                    <option value="english">English</option>
                    <option value="vietnamese">Vietnamese</option>
                    
                  </Form.Control>
                </Form.Group>
                <Button  type="submit">
                  Save Preferences
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="text-center">Theme</Card.Title>
              <Form>
                <Form.Group controlId="theme" className="mb-3">
                  <Form.Label>Theme:</Form.Label>
                  <Form.Control as="select">
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                    
                  </Form.Control>
                </Form.Group>
                <Button  type="submit">
                  Save Theme
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
