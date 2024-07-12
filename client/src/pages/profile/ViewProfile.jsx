import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewProfile.css';

const ViewProfiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/view-profile');
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid className="mt-5">
      {profiles.map((profile) => (
        <Row key={profile.user_id}>
          <Col md={3}>
            <Card className="profile-card text-center">
              <Card.Body>
                <div className="profile-header mb-4">
                  <img
                    id="profileImage"
                    src={profile.user_avatar || 'https://via.placeholder.com/150'}
                    alt="Profile Image"
                    className="rounded-circle"
                    style={{ width: '150px', height: '150px', border: '3px solid #343a40' }}
                  />
                  <h2 id="username" style={{ marginTop: '15px', fontWeight: '700', color: '#343a40' }}>
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
                      <strong>Full Name:</strong> <span id="fullName">{profile.username}</span>
                    </p>
                    <p>
                      <strong>Date of Birth:</strong> <span id="dob">{profile.user_dob}</span>
                    </p>
                    <p>
                      <strong>Email:</strong> <span id="email">{profile.user_email}</span>
                    </p>
                    <p>
                      <strong>Contact Number:</strong> <span id="contactnumber">{profile.contactNumber}</span>
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Citizen ID:</strong> <span id="citizenId">{profile.citizenId}</span>
                    </p>
                    <p>
                      <strong>Address:</strong> <span id="address">{profile.address}</span>
                    </p>
                  </Col>
                </Row>
                <Button href='/profile' variant="primary" className="edit-btn">Edit</Button>
              </Card.Body>
            </Card>
            <Card className="profile-card project-status">
              <Card.Body>
                <h4>More Information</h4>
                <p>
                  <strong>Job title:</strong> <span id="jobTitle">{profile.work_job_title}</span>
                </p>
                <p>
                  <strong>Job Description:</strong> <span id="jobDescription">{profile.work_job_description}</span>
                </p>
                <p>
                  <strong>Company:</strong> <span id="company">{profile.work_company}</span>
                </p>
                <p>
                  <strong>Start Date:</strong> <span id="startDate">{profile.work_start_date}</span>
                </p>
                <p>
                  <strong>End Date:</strong> <span id="endDate">{profile.work_end_date}</span>
                </p>
                <p>
                  <strong>Other Information:</strong> <span id="otherInformation">{profile.work_other_info}</span>
                </p>
                <Button href='/workinformation' variant="primary" className="edit-btn">Edit</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ViewProfiles;
