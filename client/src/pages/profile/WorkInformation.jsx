import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const WorkInformation = () => {
  
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [otherInformation, setOtherInformation] = useState("");
  const [username, setUsername] = useState("User Name");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setUsername(jobTitle);

    const userData = {
      userId: 35, // Assuming a static user ID for this example
      userJobTitle: jobTitle,
      userJobDescription: jobDescription,
      userCompany: company,
      userStartDate: startDate,
      userEndDate: endDate,
      userOtherInformation: otherInformation,
    };

    try {
      const response = await fetch('http://localhost:8000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
  };

  return (
    <>
      <Container fluid className="mt-3">
        <Row>
          <Col md={3} className="bg-dark text-white p-4">
            <Nav className="flex-column">
              <h2>
                <Nav.Link href="/profile" className="text-white">
                  Profile
                </Nav.Link>
              </h2>
              <Nav.Link href="/workinformation" className="text-white">
                Information
              </Nav.Link>
              <Nav.Link href="/security" className="text-white">
                Security
              </Nav.Link>
              <Row>
                <Col>
                  <Button variant="danger" href="/logout">
                    Log Out
                  </Button>
                </Col>
              </Row>
            </Nav>
          </Col>
          <Col md={9} className="p-4">
            <Card className="mb-4">
              <Card.Body>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group as={Row} controlId="jobTitle">
                    <Form.Label column sm={2}>
                      Job Title
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="Job Title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="jobDescription">
                    <Form.Label column sm={2}>
                      Job Description
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="Job Description"
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="company">
                    <Form.Label column sm={2}>
                      Company
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="startDate">
                    <Form.Label column sm={2}>
                      Start Date
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="endDate">
                    <Form.Label column sm={2}>
                      End Date
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="otherInformation">
                    <Form.Label column sm={2}>
                      Other Information
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        as= 'textarea'
                        placeholder="Other Information"
                        value={otherInformation}
                        onChange={(e) => setOtherInformation(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button type="submit">Save</Button>
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

export default WorkInformation;
