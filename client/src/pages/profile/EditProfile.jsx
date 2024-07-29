import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { FaUserEdit, FaBriefcase, FaSignOutAlt, FaCog } from "react-icons/fa";
import { useAuth } from "../../context/UserContext";

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
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const { userInformation } = useAuth();

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

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/;
    const today = new Date().toISOString().split("T")[0];

    if (!userName.trim()) newErrors.userName = "Username is required";
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!dob) newErrors.dob = "Date of birth is required";
    else if (dob >= today) newErrors.dob = "Date of birth must be before today";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!citizenId.trim()) newErrors.citizenId = "Citizen ID is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!phone.trim()) newErrors.phone = "Contact number is required";
    else if (!phoneRegex.test(phone))
      newErrors.phone = "Phone number is invalid";
    if (!bio.trim()) newErrors.bio = "Bio is required";
    else if (bio.length > 150)
      newErrors.bio = "Bio must be less than 150 characters";

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
      await axios.put(
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
            <Card className="mb-4 shadow-lg" style={{ borderRadius: "10px" }}>
              <Card.Body>
                <div className="profile-header text-center mb-4">
                  <img
                    src={selectedImage || "https://via.placeholder.com/150"}
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
                        isInvalid={!!errors.userName}
                        aria-label="Username"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.userName}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.firstName}
                        aria-label="First Name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.lastName}
                        aria-label="Last Name"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.dob}
                        aria-label="Date of Birth"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.dob}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.address}
                        aria-label="Address"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.address}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.citizenId}
                        aria-label="Citizen ID"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.citizenId}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.email}
                        aria-label="Email"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.phone}
                        aria-label="Contact Number"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
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
                        isInvalid={!!errors.bio}
                        aria-label="Bio"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.bio}
                      </Form.Control.Feedback>
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
      </Container>
    </>
  );
};

export default EditProfile;
