import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import NavigateButton from "../../components/buttons/NavigateButton";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { userId, authenticate, error } = useContext(AuthContext);

  const handleLogin = async (e) => {
    console.log("handleLogin()");
    e.preventDefault();
    const response = await authenticate(username, password);
    if (response) {
      navigate("/home");
    } else {
      // should get [error] from context here and show it somewhere in the page
    }
    setPassword("");
    setUsername("");
  };

  return (
    <>
      {!userId ? (
        <Container>
          <Row className="justify-content-md-center">
            <Col md={4}>
              <h2>Login</h2>
              <p>Current userID: {userId}</p>
              <p>{error}</p>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <h2>You are already logged in</h2>
          <NavigateButton path="/home" text="Go to Homepage" />
          <NavigateButton path="/logout" text="Logout" variant="danger" />
        </Container>
      )}
    </>
  );
};
export default Login;
