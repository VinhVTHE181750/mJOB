import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Nav, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { FaUserEdit, FaBriefcase, FaSignOutAlt, FaCog } from "react-icons/fa";

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
  const [avatar, setAvatar] = useState("");
  const fileInputRef = useRef(null);
  const { userId } = useParams();
  const [showImageInput, setShowImageInput] = useState(false);
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
    setAvatar(e.target.value);
  };

  const handleImageClick = () => {
    setShowImageInput(true);
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
      avatar: avatar,
    };

    try {
      const response = await axios.put(
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
      <h1 className="text-center my-4">Edit Profile</h1>
      <Container fluid className="mt-3">
        <Row>
        <Col md={2} className="bg-light p-3" style={{ minHeight: "100vh" }}>
            <h2 className="text-center">Navigation</h2>
            <Nav className="flex-column">
              <Nav.Link href={`/editprofile/${userId}`} className="text-dark mb-2 d-flex align-items-center">
                <FaUserEdit className="me-2" />
                Profile
              </Nav.Link>
              <Nav.Link href={`/workexperience/${userId}`} className="text-dark mb-2 d-flex align-items-center">
                <FaBriefcase className="me-2" />
                Work Experience
              </Nav.Link>
              <Nav.Link href={`/settings`} className="text-dark mb-2 d-flex align-items-center">
                <FaCog className="me-2" />
                Settings
              </Nav.Link>
              <Button variant="danger" href="/logout" className="mt-3 d-flex align-items-center">
                <FaSignOutAlt className="me-2" />
                Logout
              </Button>
            </Nav>
          </Col>
          <Col md={10} className="p-4">
            <Card className="mb-4 shadow-lg" style={{ borderRadius: "10px" }}>
              <Card.Body>
                <div className="profile-header text-center mb-4">
                  <img
                    src={avatar || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: "150px",
                      height: "150px",
                      cursor: "pointer",
                      border: "2px solid #007bff",
                    }}
                    onClick={handleImageClick}
                    aria-label="Click to change profile picture"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    aria-label="Upload profile picture"
                  />
                  <h2>{userName}</h2>
                </div>
                <Form onSubmit={handleFormSubmit}>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Username
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        // isInvalid={!!errors.userName}
                        aria-label="Username"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      First Name
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        // isInvalid={!!errors.firstName}
                        aria-label="First Name"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Last Name
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        // isInvalid={!!errors.lastName}
                        aria-label="Last Name"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Date of Birth
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        // isInvalid={!!errors.dob}
                        aria-label="Date of Birth"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Address
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        // isInvalid={!!errors.address}
                        aria-label="Address"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Citizen ID
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="Citizen ID"
                        value={citizenId}
                        onChange={(e) => setCitizenId(e.target.value)}
                        // isInvalid={!!errors.citizenId}
                        aria-label="Citizen ID"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Email
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // isInvalid={!!errors.email}
                        aria-label="Email"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Contact Number
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder="Contact Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        // isInvalid={!!errors.phone}
                        aria-label="Contact Number"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Bio
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        as="textarea"
                        placeholder="Bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        // isInvalid={!!errors.bio}
                        aria-label="Bio"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button type="submit" variant="primary">Save</Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Modal show={showImageInput} onHide={() => setShowImageInput(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Change Profile Picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Label>Enter image URL:</Form.Label>
              <Form.Control type="text" onChange={handleImageChange} />
            </Form.Group>
            <Form.Group className="d-flex justify-content-center align-items-center">
              <img src={avatar || "https://via.placeholder.com/150"} alt="Profile" style={{ width: "150px", height: "150px" }} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowImageInput(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default EditProfile;
