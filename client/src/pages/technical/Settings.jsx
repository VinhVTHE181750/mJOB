import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  FormGroup,
  Nav,
} from "react-bootstrap";
import axios from "axios";
import useWhoAmI from "../../hooks/user/useWhoAmI";
import { FaUserEdit, FaBriefcase, FaSignOutAlt, FaCog } from "react-icons/fa";

// Regular expressions for validation
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const Settings = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validNewPassword, setValidNewPassword] = useState(false);
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();
  const { userId } = useWhoAmI();

  // Effect to validate new password and confirm password
  useEffect(() => {
    setValidNewPassword(REGEX_PASSWORD.test(newPassword));
    setValidConfirmPassword(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  // Effect to clear error message on input change
  useEffect(() => {
    setErrMsg("");
  }, [currentPassword, newPassword, confirmPassword]);

  // Add console log to verify userId
  useEffect(() => {
    console.log("userId:", userId);
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!validNewPassword || !validConfirmPassword) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/profile/change-password`,
        JSON.stringify({ userId, currentPassword, newPassword }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      alert("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Invalid password or current password is incorrect");
      } else {
        setErrMsg("Password change failed");
      }
      errRef.current.focus();
    }
  };

  return (
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
          <header>
            <div className="text-center">
              <h1 className="text-black">Settings</h1>
            </div>
          </header>
          <br />
          <Row>
            <Col md={8} className="mx-auto">
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title className="text-center">
                    Change Password
                  </Card.Title>
                  <Form onSubmit={handleSubmit}>
                    <p
                      ref={errRef}
                      className={errMsg ? "errmsg" : "offscreen"}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </p>
                    <FormGroup controlId="currentPassword" className="mb-3">
                      <Form.Label>Current Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                      />
                    </FormGroup>
                    <FormGroup controlId="newPassword" className="mb-3">
                      <Form.Label>New Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        isInvalid={!validNewPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        Invalid password. Must be at least 8 characters long,
                        contain at least one uppercase letter, one lowercase
                        letter, and one number.
                      </Form.Control.Feedback>
                    </FormGroup>
                    <FormGroup controlId="confirmPassword" className="mb-3">
                      <Form.Label>Confirm New Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        isInvalid={!validConfirmPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        Password does not match.
                      </Form.Control.Feedback>
                    </FormGroup>
                    <Button
                      type="submit"
                      disabled={!validNewPassword || !validConfirmPassword}
                    >
                      Save
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
