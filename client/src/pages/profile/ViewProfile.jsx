import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewProfile.css";
import { useParams } from "react-router";
import axios from "axios";
const ViewProfiles = () => {
  
  const [profile, setProfile] = useState([]);
  const { userId } = useParams();

  
  
  useEffect(() => {
    const view = axios.get(`http://localhost:8000/api/profile/${userId}`);
    view.then((response) => {
      setProfile(response.data);
    });

  }, [userId]);

   

  return (
    <Container fluid className="mt-5">
      
        <Row key={profile.id}>
          <Col md={3}>
            <Card className="profile-card text-center">
              <Card.Body>
                <div className="profile-header mb-4">
                  <img
                    id="profileImage"
                    src={
                      profile.avatar || "https://via.placeholder.com/150"
                    }
                    alt="Profile Image"
                    className="rounded-circle"
                    style={{
                      width: "150px",
                      height: "150px",
                      border: "3px solid #343a40",
                    }}
                  />
                  <h2
                    id="username"
                    style={{
                      marginTop: "15px",
                      fontWeight: "700",
                      color: "#343a40",
                    }}
                  >
                    {profile.username}
                  </h2>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={9}>
            <Card className="profile-card mb-4">
              <Card.Body>
                <h4>Profile Details</h4>
                <Row>
                  <Col md={6}>
                    <p>
                      <strong>Full Name:</strong>{" "}
                      <span id="fullName">{profile.username}</span>
                    </p>
                    <p>
                      <strong>Date of Birth:</strong>{" "}
                      <span id="dob">{profile.dob}</span>
                    </p>
                    <p>
                      <strong>Email:</strong>{" "}
                      <span id="email">{profile.email}</span>
                    </p>
                    <p>
                      <strong>Contact Number:</strong>{" "}
                      <span id="contactnumber">{profile.phone}</span>
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Citizen ID:</strong>{" "}
                      <span id="citizenId">{profile.citizenId}</span>
                    </p>
                    <p>
                      <strong>Address:</strong>{" "}
                      <span id="address">{profile.address}</span>
                    </p>
                  </Col>
                </Row>
                <Button href="/profile" variant="primary" className="edit-btn">
                  Edit
                </Button>
              </Card.Body>
            </Card>
            {/* <Card className="profile-card project-status">
              <Card.Body>
                <h4>More Information</h4>
                <p>
                  <strong>Job title:</strong>{" "}
                  <span id="jobTitle">{profile.work_job_title}</span>
                </p>
                <p>
                  <strong>Job Description:</strong>{" "}
                  <span id="jobDescription">
                    {profile.work_job_description}
                  </span>
                </p>
                <p>
                  <strong>Company:</strong>{" "}
                  <span id="company">{profile.work_company}</span>
                </p>
                <p>
                  <strong>Start Date:</strong>{" "}
                  <span id="startDate">{profile.work_start_date}</span>
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  <span id="endDate">{profile.work_end_date}</span>
                </p>
                <p>
                  <strong>Other Information:</strong>{" "}
                  <span id="otherInformation">{profile.work_other_info}</span>
                </p>
                <Button
                  href="/workinformation"
                  variant="primary"
                  className="edit-btn"
                >
                  Edit
                </Button>
              </Card.Body>
            </Card> */}
          </Col>
        </Row>
      
    </Container>
  );
};

export default ViewProfiles;
