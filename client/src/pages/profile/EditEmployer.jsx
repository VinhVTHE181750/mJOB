import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditEmployer = () => {
  const [profile, setProfile] = useState({
    companyName: '',
    industry: '',
    description: '',
    services: '',
    address: '',
    phone: '',
    email: '',
    facebook: '',
    twitter: '',
    instagram: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
    alert('Profile updated successfully!');
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="form-header text-center bg-primary text-white py-3 mb-4">
            <h1>Edit Employer Profile</h1>
          </div>
          <div className="form-container p-4 bg-white shadow-sm">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter company name"
                  value={profile.companyName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="industry">
                <Form.Label>Industry</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter industry"
                  value={profile.industry}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Enter company description"
                  value={profile.description}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="services">
                <Form.Label>Services</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="List services provided"
                  value={profile.services}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  value={profile.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter phone number"
                  value={profile.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email address"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="facebook">
                <Form.Label>Facebook</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter Facebook profile URL"
                  value={profile.facebook}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="twitter">
                <Form.Label>Twitter</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter Twitter profile URL"
                  value={profile.twitter}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="instagram">
                <Form.Label>Instagram</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter Instagram profile URL"
                  value={profile.instagram}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
              <Button variant="secondary" href="/employer" className="ml-2">
                Cancel
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditEmployer;
