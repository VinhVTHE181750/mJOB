import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { FaUserEdit, FaBriefcase, FaSignOutAlt, FaCog, FaPlus, FaTrash } from "react-icons/fa";

const WorkExperience = () => {
  const [workExperiences, setWorkExperiences] = useState([
    {
      jobTitle: "",
      jobDescription: "",
      company: "",
      startDate: "",
      endDate: "",
      otherInformation: "",
      errors: {},
    },
  ]);

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkExperience = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/workexp/user/${userId}`
        );
        const workExperiences = response.data;
        setWorkExperiences(
          workExperiences.map((exp) => ({
            jobTitle: exp.title || "",
            jobDescription: exp.description || "",
            company: exp.company || "",
            startDate: exp.startDate || "",
            endDate: exp.endDate || "",
            otherInformation: exp.location || "",
            errors: {},
          }))
        );
      } catch (error) {
        console.error("Error fetching work experience data:", error);
      }
    };

    fetchWorkExperience();
  }, [userId]);

  const validate = (index) => {
    const newErrors = {};
    const exp = workExperiences[index];
    if (!exp.jobTitle.trim()) newErrors.jobTitle = "Job Title is required";
    if (!exp.jobDescription.trim())
      newErrors.jobDescription = "Job Description is required";
    else if (exp.jobDescription.length > 150)
      newErrors.jobDescription = "Job Description must be less than 150 characters";
    if (!exp.company.trim()) newErrors.company = "Company is required";
    if (!exp.startDate) newErrors.startDate = "Start Date is required";
    if (!exp.endDate) newErrors.endDate = "End Date is required";
    else if (exp.startDate && exp.endDate && exp.startDate >= exp.endDate)
      newErrors.endDate = "End Date must be after Start Date";
    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    const updatedWorkExperiences = workExperiences.map((exp, index) => {
      const newErrors = validate(index);
      if (Object.keys(newErrors).length > 0) {
        hasErrors = true;
      }
      return { ...exp, errors: newErrors };
    });

    setWorkExperiences(updatedWorkExperiences);
    if (hasErrors) return;

    try {
      await Promise.all(
        updatedWorkExperiences.map((exp) => {
          const userData = {
            userId: userId,
            title: exp.jobTitle,
            description: exp.jobDescription,
            company: exp.company,
            startDate: exp.startDate,
            endDate: exp.endDate,
            location: exp.otherInformation,
          };
          return axios.put(`http://localhost:8000/api/workexp/${userId}`, userData);
        })
      );
      alert("Work experience updated successfully");
      navigate(`/profile/${userId}`);
    } catch (err) {
      console.error("Error updating work experience:", err);
      alert("Error updating work experience");
    }
  };

  const handleAddExperience = () => {
    setWorkExperiences([
      ...workExperiences,
      {
        jobTitle: "",
        jobDescription: "",
        company: "",
        startDate: "",
        endDate: "",
        otherInformation: "",
        errors: {},
      },
    ]);
  };

  const handleDeleteExperience = (index) => {
    setWorkExperiences(workExperiences.filter((_, i) => i !== index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedWorkExperiences = [...workExperiences];
    updatedWorkExperiences[index][field] = value;
    setWorkExperiences(updatedWorkExperiences);
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
            <div className="d-flex justify-content-end mb-3">
              <Button onClick={handleAddExperience} className="d-flex align-items-center">
                <FaPlus className="me-2" /> Add
              </Button>
            </div>
            {workExperiences.map((exp, index) => (
              <Card className="mb-4" key={index}>
                <Card.Body>
                  <Form>
                    <Form.Group as={Row} controlId={`jobTitle-${index}`}>
                      <Form.Label column sm={2}>
                        Job Title
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          placeholder="Job Title"
                          value={exp.jobTitle}
                          onChange={(e) =>
                            handleInputChange(index, "jobTitle", e.target.value)
                          }
                          isInvalid={!!exp.errors.jobTitle}
                        />
                        <Form.Control.Feedback type="invalid">
                          {exp.errors.jobTitle}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={`jobDescription-${index}`}>
                      <Form.Label column sm={2}>
                        Job Description
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          placeholder="Job Description"
                          value={exp.jobDescription}
                          onChange={(e) =>
                            handleInputChange(index, "jobDescription", e.target.value)
                          }
                          isInvalid={!!exp.errors.jobDescription}
                        />
                        <Form.Control.Feedback type="invalid">
                          {exp.errors.jobDescription}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={`company-${index}`}>
                      <Form.Label column sm={2}>
                        Company
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) =>
                            handleInputChange(index, "company", e.target.value)
                          }
                          isInvalid={!!exp.errors.company}
                        />
                        <Form.Control.Feedback type="invalid">
                          {exp.errors.company}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={`startDate-${index}`}>
                      <Form.Label column sm={2}>
                        Start Date
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="date"
                          value={exp.startDate}
                          onChange={(e) =>
                            handleInputChange(index, "startDate", e.target.value)
                          }
                          isInvalid={!!exp.errors.startDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {exp.errors.startDate}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={`endDate-${index}`}>
                      <Form.Label column sm={2}>
                        End Date
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="date"
                          value={exp.endDate}
                          onChange={(e) =>
                            handleInputChange(index, "endDate", e.target.value)
                          }
                          isInvalid={!!exp.errors.endDate}
                        />
                        <Form.Control.Feedback type="invalid">
                          {exp.errors.endDate}
                        </Form.Control.Feedback>
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId={`otherInformation-${index}`}>
                      <Form.Label column sm={2}>
                        Location
                      </Form.Label>
                      <Col sm={10}>
                        <Form.Control
                          type="text"
                          placeholder="Location"
                          value={exp.otherInformation}
                          onChange={(e) =>
                            handleInputChange(index, "otherInformation", e.target.value)
                          }
                        />
                      </Col>
                    </Form.Group>

                    {index > 0 && (
                      <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteExperience(index)}
                            className="d-flex align-items-center"
                          >
                          
                            <FaTrash className="me-2" /> Delete
                          </Button>
                        </Col>
                      </Form.Group>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            ))}
            <Button onClick={handleFormSubmit} className="mt-3">
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WorkExperience;

