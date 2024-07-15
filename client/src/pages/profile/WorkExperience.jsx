<<<<<<< Updated upstream
import { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const WorkExperience = () => {
  
=======
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams } from "react-router";

const WorkExperience = () => {
>>>>>>> Stashed changes
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [otherInformation, setOtherInformation] = useState("");
<<<<<<< Updated upstream
  const [username, setUsername] = useState("User Name");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setUsername(jobTitle);

    const userData = {
      userId: 1, // Assuming a static user ID for this example
      workJobTitle: jobTitle,
      workJobDescription: jobDescription,
      workCompany: company,
      workStartDate: startDate,
      workEndDate: endDate,
      workOtherInfo: otherInformation,
    };

    try {
      const response = await fetch('http://localhost:8000/work', {
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
=======
  const { userId } = useParams();

  useEffect(() => {
    const fetchWorkExperience = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/workexp/user/${userId}`);
        console.log("Response:", response);
        const workExperience = response.data;

        // Update state with fetched data
        setJobTitle(workExperience.title || "");
        setJobDescription(workExperience.description || "");
        setCompany(workExperience.company || "");
        setStartDate(workExperience.startDate || "");
        setEndDate(workExperience.endDate || "");
        setOtherInformation(workExperience.otherInformation || ""); // Ensure otherInformation is set or empty string
      } catch (error) {
        console.error("Error fetching work experience data:", error);
      }
    };

    fetchWorkExperience();
  }, [userId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      userId: userId,
      jobTitle: jobTitle,
      jobDescription: jobDescription,
      company: company,
      startDate: startDate,
      endDate: endDate,
      otherInformation: otherInformation,
    };

    try {
      const response = await axios.put(`http://localhost:8000/api/workexp/${userId}`, userData);
      alert("Work experience updated successfully");
    } catch (err) {
      console.error("Error updating work experience:", err);
      alert("Error updating work experience");
>>>>>>> Stashed changes
    }
  };

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col md={3} className="bg-dark text-white p-4">
          <Nav className="flex-column">
            <h2>
<<<<<<< Updated upstream
              <Nav.Link href="/editprofile" className="text-white">
              Profile
              </Nav.Link>
            </h2>
            <Nav.Link href="/workexperience" className="text-white">
=======
              <Nav.Link href={`/editprofile/${userId}`} className="text-white">
                Profile
              </Nav.Link>
            </h2>
            <Nav.Link href={`/workexperience/${userId}`} className="text-white">
>>>>>>> Stashed changes
              Work Experience
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
<<<<<<< Updated upstream
                      as='textarea'
=======
                      as="textarea"
>>>>>>> Stashed changes
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
  );
};

export default WorkExperience;
