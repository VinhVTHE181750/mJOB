import  { useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
    setUsername(userName);
  };

  return (
    <>
      <Container fluid className="mt-3">
        <Row>
          <Col md={3} className="bg-dark text-white p-4">
            <Nav className="flex-column">
              <h2>
                <Nav.Link href="/editprofile" className="text-white">
                  Profile
                </Nav.Link>
              </h2>
              <Nav.Link href="/workexperience" className="text-white">
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
                        as='textarea'
                        type="bio"
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