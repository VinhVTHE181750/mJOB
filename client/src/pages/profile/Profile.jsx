import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewProfile.css";
import { useNavigate } from "react-router";
import axios from "axios";
import useWhoAmI from "../../hooks/user/useWhoAmI";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const { userId } = useWhoAmI();
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [otherInformation, setOtherInformation] = useState("");

  useEffect(() => {
    const fetchWorkExperience = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/workexp/user/${userId}`
        );
        // console.log("Response:", response);
        const workExperience = response.data;

        // Update state with fetched data
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
        setOtherInformation(workExperience.otherInformation || ""); // Ensure otherInformation is set or empty string
      } catch (error) {
        console.error("Error fetching work experience data:", error);
      }
    };

    fetchWorkExperience();
  }, [userId]);

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

  const handleEditClick = () => {
    navigate(`/editprofile/${userId}`);
  };

  const handleWorkEdit = () => {
    navigate(`/workexperience/${userId}`);
  };

  return (
    <Container fluid className="mt-5">
      <Row key={profile.id}>
        <Col md={3}>
          <Card className="profile-card text-center">
            <Card.Body>
              <div className="profile-header mb-4">
                <img
                  id="profileImage"
                  src={profile.avatar || "https://via.placeholder.com/150"}
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
              <Button
                onClick={handleEditClick}
                variant="primary"
                className="edit-btn"
              >
                Edit
              </Button>
            </Card.Body>
          </Card>
          <Card className="profile-card project-status">
            <Card.Body>
              <h4>Work Experience</h4>
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
              <p>
                <strong>Other Information:</strong>{" "}
                <span id="otherInformation">{otherInformation}</span>
              </p>
              <Button
                onClick={handleWorkEdit}
                variant="primary"
                className="edit-btn"
              >
                Edit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
