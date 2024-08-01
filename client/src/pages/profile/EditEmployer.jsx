import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployer = () => {
  const [employer, setEmployer] = useState({
    name: '',
    industry: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const params = useParams();
  const navigate = useNavigate();
  const employerId = params.id;

  useEffect(() => {
    const fetchEmployer = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/profile/employer/${employerId}`);
        const data = await response.json();
        setEmployer(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employer data:', error);
      }
    };

    fetchEmployer();
  }, [employerId]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10,11}$/; // Adjust this regex based on the Vietnam phone standard
    return re.test(phone);
  };

  const validate = () => {
    const newErrors = {};
    if (!employer.name) newErrors.name = 'Name is required';
    if (!employer.industry) newErrors.industry = 'Industry is required';
    if (!employer.description) newErrors.description = 'Description is required';
    if (!employer.address) newErrors.address = 'Address is required';
    if (!employer.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(employer.phone)) {
      newErrors.phone = 'Phone number is invalid';
    }
    if (!employer.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(employer.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!employer.website) newErrors.website = 'Website is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployer({
      ...employer,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);

    try {
      const response = await fetch(`http://localhost:8000/api/profile/edit-employer/${employerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employer)
      });

      if (response.ok) {
        navigate(`/employer/${employerId}`);
      } else {
        console.error('Error updating employer data');
      }
    } catch (error) {
      console.error('Error updating employer data:', error);
    }

    setSaving(false);
  };

  if (loading) {
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
      <Card className="my-4">
        <Card.Body>
          <Card.Title as="h2">Edit Employer Profile</Card.Title>
          <Form onSubmit={handleSubmit}>
            {Object.keys(errors).length > 0 && (
              <Alert variant="danger">
                {Object.values(errors).map((error, idx) => (
                  <div key={idx}>{error}</div>
                ))}
              </Alert>
            )}
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={employer.name}
                onChange={handleInputChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formIndustry">
              <Form.Label>Industry</Form.Label>
              <Form.Control
                type="text"
                name="industry"
                value={employer.industry}
                onChange={handleInputChange}
                isInvalid={!!errors.industry}
              />
              <Form.Control.Feedback type="invalid">{errors.industry}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={employer.description}
                onChange={handleInputChange}
                isInvalid={!!errors.description}
              />
              <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={employer.address}
                onChange={handleInputChange}
                isInvalid={!!errors.address}
              />
              <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={employer.phone}
                onChange={handleInputChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={employer.email}
                onChange={handleInputChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formWebsite">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={employer.website}
                onChange={handleInputChange}
                isInvalid={!!errors.website}
              />
              <Form.Control.Feedback type="invalid">{errors.website}</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditEmployer;