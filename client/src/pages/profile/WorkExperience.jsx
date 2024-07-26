import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { FaUserEdit, FaBriefcase, FaSignOutAlt, FaCog } from "react-icons/fa";

const WorkExperience = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [otherInformation, setOtherInformation] = useState("");
  const [errors, setErrors] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const fetchWorkExperience = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/workexp/user/${userId}`
        );
        console.log("Response:", response);
        const workExperience = response.data;

        // Update state with fetched data
        setJobTitle(workExperience.title || "");
        setJobDescription(workExperience.description || "");
        setCompany(workExperience.company || "");
        setStartDate(workExperience.startDate || "");
        setEndDate(workExperience.endDate || "");
        setOtherInformation(workExperience.location || ""); // Ensure otherInformation is set or empty string
      } catch (error) {
        console.error("Error fetching work experience data:", error);
      }
    };

    fetchWorkExperience();
  }, [userId]);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!jobTitle.trim()) newErrors.jobTitle = "Job Title is required";
    if (!jobDescription.trim())
      newErrors.jobDescription = "Job Description is required";
    else if (jobDescription.length > 150)
      newErrors.jobDescription = "Job Description must be less than 150 characters";
    if (!company.trim()) newErrors.company = "Company is required";
    if (!startDate) newErrors.startDate = "Start Date is required";
    if (!endDate) newErrors.endDate = "End Date is required";
    else if (startDate && endDate && startDate >= endDate)
      newErrors.endDate = "End Date must be after Start Date";
    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const userData = {
      userId: userId,
      title: jobTitle,
      description: jobDescription,
      company: company,
      startDate: startDate,
      endDate: endDate,
      location: otherInformation,
    };

    try {
      const response = await axios.put(
        `http://localhost:8000/api/workexp/${userId}`,
        userData
      );
      alert("Work experience updated successfully");
      navigate(`/profile/${userId}`);
    } catch (err) {
      console.error("Error updating work experience:", err);
      alert("Error updating work experience");
    }
  };

  return (
    <>
      <h1 className="text-center my-4">Work Experience</h1>
      <Container fluid className="mt-3">
        <Row>
          <Col md={2} className="bg-light p-3" style={{ minHeight: "100vh" }}>
            <h2 className="text-center">Navigation</h2>
            <Nav className="flex-column">
              <Nav.Link
                href={`/editprofile/${userId}`}
                className="text-dark mb-2 d-flex align-items-center"
              >
                <FaUserEdit className="me-2" />
                Profile
              </Nav.Link>
              <Nav.Link
                href={`/workexperience/${userId}`}
                className="text-dark mb-2 d-flex align-items-center"
              >
                <FaBriefcase className="me-2" />
                Work Experience
              </Nav.Link>
              <Nav.Link
                href={`/settings`}
                className="text-dark mb-2 d-flex align-items-center"
              >
                <FaCog className="me-2" />
                Settings
              </Nav.Link>
              <Button
                variant="danger"
                href="/logout"
                className="mt-3 d-flex align-items-center"
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </Button>
            </Nav>
          </Col>
          <Col md={10} className="p-4">
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
                        isInvalid={!!errors.jobTitle}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.jobTitle}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.jobDescription}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.jobDescription}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.company}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.company}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.startDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.startDate}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.endDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.endDate}
                      </Form.Control.Feedback>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="otherInformation">
                    <Form.Label column sm={2}>
                      Other Information
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        as="textarea"
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

export default WorkExperience;
