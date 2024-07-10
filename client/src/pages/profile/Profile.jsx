import React, { useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [username, setUsername] = useState("User Name");
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setUsername(fullName);

    const userData = {
      userId: 18, // Assuming a static user ID for this example
      userAvatar: selectedImage,
      userBio: fullName,
      userDob: dob,
      userAddress: address,
      userCitizenId: citizenId,
      userEmail: email,
      userPhoneNumber: contactNumber,
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
              <Nav.Link href="/information" className="text-white">
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
                <div className="profile-header text-center mb-4">
                  <img
                    src={selectedImage || "https://via.placeholder.com/150"}
                    alt="Profile Image"
                    className="rounded-circle"
                    style={{
                      width: "150px",
                      height: "150px",
                      cursor: "pointer",
                    }}
                    onClick={handleImageClick}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <h2>{username}</h2>
                </div>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group as={Row} controlId="fullName">
                    <Form.Label column sm={2}>
                      Full Name
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="dob">
                    <Form.Label column sm={2}>
                      Date of Birth
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="address">
                    <Form.Label column sm={2}>
                      Address
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="citizenid">
                    <Form.Label column sm={2}>
                      Citizen ID
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="Citizen ID"
                        value={citizenId}
                        onChange={(e) => setCitizenId(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="email">
                    <Form.Label column sm={2}>
                      Email
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="contactNumber">
                    <Form.Label column sm={2}>
                      Contact Number
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="Contact Number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
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

export default Profile;
