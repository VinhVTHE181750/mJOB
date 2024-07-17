import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const EditProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [citizenId, setCitizenId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const fileInputRef = useRef(null);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/profile/edit/${userId}`)
      .then((response) => {
        const profile = response.data;
        setUserName(profile.username);
        setFirstName(profile.firstName);
        setLastName(profile.lastName);
        setDob(profile.dob);
        setAddress(profile.address);
        setCitizenId(profile.citizenId);
        setEmail(profile.email);
        setPhone(profile.phone);
        setBio(profile.bio);
        setSelectedImage(profile.avatar);
      })
      .catch((error) => {
        console.error("There was an error fetching the profile data!", error);
      });
  }, [userId]);

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

    const userData = {
      username: userName,
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      address: address,
      citizenId: citizenId,
      email: email,
      phone: phone,
      bio: bio,
    };

    try {
      const response = await http.put(
        `http://localhost:8000/api/profile/edit-profile/${userId}`,
        userData
      );
      alert("Profile updated successfully");
      navigate(`/profile/${userId}`);
    } catch (err) {
      alert("Error updating profile");
    }
  };

  return (
    <>
      <h1 className="text-center my-4">Profile Edit</h1>
      <Container fluid className="mt-3">
        <Row>
          <Col md={2}>
            <Nav className="flex-column">
              <h2>Navigation</h2>
              <Nav.Link href={`/editprofile/${userId}`} className="text-black">
                Profile
              </Nav.Link>
              <Nav.Link
                href={`/workexperience/${userId}`}
                className="text-black"
              >
                Work Experience
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
          <Col md={10} className="p-4">
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
                  <h2>{userName}</h2>
                </div>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group as={Row} controlId="userName">
                    <Form.Label column sm={2}>
                      UserName
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="UserName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="firstName">
                    <Form.Label column sm={2}>
                      FirstName
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="FirstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="lastName">
                    <Form.Label column sm={2}>
                      LastName
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="LastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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

                  <Form.Group as={Row} controlId="phone">
                    <Form.Label column sm={2}>
                      Contact Number
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="Contact Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="bio">
                    <Form.Label column sm={2}>
                      Bio
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        as="textarea"
                        placeholder="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
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

export default EditProfile;
