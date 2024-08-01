import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewProfile.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useWhoAmI from "../../hooks/user/useWhoAmI";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const whoAmI = useWhoAmI();
  const params = useParams();
  const userId = params.userId;
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [otherInformation, setOtherInformation] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profile/${userId}`
        );
        setProfile(response.data);
      } catch (error) {
        console.error("There was an error fetching the profile data!", error);
      }
    };

    fetchProfile();
  }, [userId]);

  useEffect(() => {
    const fetchWorkExperience = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/workexp/user/${userId}`
        );
        const workExperience = response.data;

        setJobTitle(workExperience.title || "");
        setJobDescription(workExperience.description || "");
        setCompany(workExperience.company || "");
        setLocation(workExperience.location || "");
        setStartDate(
          workExperience.startDate
            ? new Date(workExperience.startDate).toLocaleDateString()
            : ""
        );
        setEndDate(
          workExperience.endDate
            ? new Date(workExperience.endDate).toLocaleDateString()
            : ""
        );
        setOtherInformation(workExperience.otherInformation || "");
      } catch (error) {
        console.error("Error fetching work experience data:", error);
      }
    };

    fetchWorkExperience();
  }, [userId]);

  const handleEditClick = () => {
    navigate(`/editprofile/${userId}`);
  };

  const handleWorkEdit = () => {
    navigate(`/workexperience/${userId}`);
  };

  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card   className="profile-card text-center mb-4 shadow-lg" style={{ borderRadius: "10px", backgroundColor: "#f8f9fa" }}>
            <Card.Body >
              <div className="profile-header mb-4">
                <img
                  id="profileImage"
                  src={profile.avatar || "https://via.placeholder.com/150"}
                  alt="Profile Image"
                  className="rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    border: "3px solid #007bff",
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
          <Card className="profile-card mb-4 shadow-lg" style={{ borderRadius: "10px", backgroundColor: "#ffffff" }}>
            <Card.Body>
              <h4 className="mb-4" style={{ color: "#007bff" }}>Profile Details</h4>
              <Row>
                <Col md={6}>
                  <p>
                    <strong>Full Name:</strong>{" "}
                    <span id="fullName">
                      {profile.firstName} {profile.lastName}
                    </span>
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
              
            </Card.Body>
          </Card>
          <Card className="profile-card project-status shadow-lg" style={{ borderRadius: "10px", backgroundColor: "#ffffff" }}>
            <Card.Body>
              <h4 className="mb-4" style={{ color: "#007bff" }}>Work Experience</h4>
              <p>
                <strong>Job Title:</strong>{" "}
                <span id="jobTitle">{jobTitle}</span>
              </p>
              <p>
                <strong>Job Description:</strong>{" "}
                <span id="jobDescription">{jobDescription}</span>
              </p>
              <p>
                <strong>Company:</strong> <span id="company">{company}</span>
              </p>
              <p>
                <strong>Location:</strong> <span id="location">{location}</span>
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                <span id="startDate">{startDate}</span>
              </p>
              <p>
                <strong>End Date:</strong> <span id="endDate">{endDate}</span>
              </p>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
