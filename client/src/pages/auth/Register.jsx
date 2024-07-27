import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form, FormGroup } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../../context/UserContext";

// Regular expressions for validation
const REGEX_USERNAME = /^[A-Za-z][A-Za-z0-9_]{8,29}$/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGISTER_API = "http://localhost:8000/api/auth/register";
const REGEX_PHONE = /^\d{9,11}$/;

const Register = () => {
  const { handleRedirectError } = useAuth();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState(
    "Bạn sống ở thành phố nào"
  );
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [validName, setValidName] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPhone, setValidPhone] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const errRef = useRef();

  useEffect(() => {
    setValidEmail(REGEX_EMAIL.test(email));
  }, [email]);

  useEffect(() => {
    setValidPhone(REGEX_PHONE.test(phone));
  }, [phone]);

  useEffect(() => {
    setValidName(REGEX_USERNAME.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(REGEX_PASSWORD.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, email, phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = REGEX_USERNAME.test(user);
    const v2 = REGEX_PASSWORD.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_API,
        JSON.stringify({
          username: user,
          password: pwd,
          email,
          phone,
          securityQuestion,
          securityAnswer,
          address,
          dateOfBirth,
        }),
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 201) {
        setSuccess(true);
        alert("You need confirm email to active account");
        setUser("");
        setPwd("");
        setMatchPwd("");
        setEmail("");
        setPhone("");
        setSecurityQuestion("Bạn sống ở thành phố nào");
        setSecurityAnswer("");
        setAddress("");
        setDateOfBirth("");
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      handleRedirectError("server error");
      errRef.current.focus();
    }
  };

  return (
    <>
      <Container>
        {success ? (
          <section>
            <h1>
              Registration Successful! Check your email for active the account
            </h1>
          </section>
        ) : (
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="user"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                  isInvalid={!validName}
                />
                <Form.Control.Feedback type="invalid">
                  Invalid username. Must be 8-29 characters long and start with
                  a letter.
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="pwd"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  isInvalid={!validPwd}
                />
                <Form.Control.Feedback type="invalid">
                  Invalid password. Must be at least 8 characters long, contain
                  at least one uppercase letter, one lowercase letter, and one
                  number.
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="matchPwd"
                  value={matchPwd}
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  isInvalid={!validMatch}
                />
                <Form.Control.Feedback type="invalid">
                  Passwords do not match.
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  isInvalid={!validEmail}
                />
                <Form.Control.Feedback type="invalid">
                  Invalid Email
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  isInvalid={!validPhone}
                />
                <Form.Control.Feedback type="invalid">
                  Invalid Phone
                </Form.Control.Feedback>
              </FormGroup>
              <FormGroup>
                <Form.Label>Security Question</Form.Label>
                <Form.Control
                  as="select"
                  name="securityQuestion"
                  value={securityQuestion}
                  onChange={(e) => setSecurityQuestion(e.target.value)}
                  required
                >
                  <option value="Bạn sống ở thành phố nào">
                    Bạn sống ở thành phố nào
                  </option>
                  <option value="Con mèo bạn nuôi màu gì?">
                    Con mèo bạn nuôi màu gì?
                  </option>
                </Form.Control>
              </FormGroup>
              <FormGroup>
                <Form.Label>Security Answer</Form.Label>
                <Form.Control
                  type="text"
                  name="securityAnswer"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </FormGroup>
              <Button
                className="mt-3"
                type="submit"
                disabled={
                  !validName ||
                  !validPwd ||
                  !validMatch ||
                  !validEmail ||
                  !validPhone
                }
              >
                Register
              </Button>
            </Form>
          </section>
        )}
      </Container>
    </>
  );
};

export default Register;
