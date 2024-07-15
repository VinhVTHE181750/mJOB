import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import NavigateButton from "../../components/ui/buttons/NavigateButton";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loggedIn, authenticate, error } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await authenticate(username, password);
    // Reset form fields
    setPassword("");
    setUsername("");
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/home");
    }
  }, [loggedIn, navigate]);

  return (
    <>
      {!loggedIn ? (
        <Container>
          <Row className="justify-content-md-center">
            <Col md={4}>
              <h2>Login</h2>
              {/* <p>Current userID: {userId}</p> */}
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

                <Button variant="primary" type="submit" className="mt-2">
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
