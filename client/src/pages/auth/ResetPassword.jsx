import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form, FormGroup } from "react-bootstrap";
import http from "../../functions/httpService";
import { useNavigate } from "react-router";

const REGEX_USERNAME = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [step, setStep] = useState(0);

  const checkUserExist = async () => {
    const request = await axios.get(`/auth/check-user?email=${user}`);
    if (request.status === 200) {
      setStep(1);
    } else if (request.status === 203) {
      alert(request.data.message);
    }
  };

  const handleSubmit = async (e) => {
    console.log(123456)
    e.preventDefault();
    const request = await axios.post(`/auth/reset-password`, {
      email: user,
      password: password,
    });
    if (request.status === 200) {
      alert(request.data.message);
      navigate("/login");
    }
    // Add your password reset logic here
  };

  useEffect(() => {
    setValidName(REGEX_USERNAME.test(user));
  }, [user]);
  // Effect to validate password and match
  useEffect(() => {
    setValidPwd(REGEX_PASSWORD.test(password));
    setValidMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  return (
    <Container>
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        {step === 0 && (
          <>
            <FormGroup>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                name="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
                isInvalid={!validName}
              />
              <Form.Control.Feedback type="invalid">
                Invalid Email. Must be 8-29 characters long and start with a
                letter.
              </Form.Control.Feedback>
            </FormGroup>
            <Form.Group>
              <Button onClick={checkUserExist} className="mt-2">Next</Button>
            </Form.Group>
          </>
        )}

        {step === 1 && (
          <>
            <FormGroup>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                isInvalid={!validPwd}
              />
              <Form.Control.Feedback type="invalid">
                Invalid password. Must be at least 8 characters long, contain at
                least one uppercase letter, one lowercase letter, and one
                number.
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                isInvalid={!validMatch}
              />
              <Form.Control.Feedback type="invalid">
                Passwords do not match.
              </Form.Control.Feedback>
            </FormGroup>

            <Button
              type="submit"
              disabled={!validPwd || !validMatch}
              className="mt-2"
            >
              Submit
            </Button>
          </>
        )}
      </Form>
    </Container>
  );
};

export default ResetPassword;
