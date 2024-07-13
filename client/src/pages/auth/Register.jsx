import React, {useEffect, useRef, useState} from "react";
import {Form, FormGroup} from "react-bootstrap";
import axios from "axios";

// Regular expressions for validation
const REGEX_USERNAME = /^[A-Za-z][A-Za-z0-9_]{8,29}$/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const REGISTER_API = "http://localhost:8000/api/auth/register";

const Register = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");
  const [validName, setValidName] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [validMatch, setValidMatch] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const errRef = useRef();

  // Effect to validate username
  useEffect(() => {
    setValidName(REGEX_USERNAME.test(user));
  }, [user]);

  // Effect to validate password and match
  useEffect(() => {
    setValidPwd(REGEX_PASSWORD.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  // Effect to clear error message on input change
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Client-side validation
    const v1 = REGEX_USERNAME.test(user);
    const v2 = REGEX_PASSWORD.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_API,
        JSON.stringify({ username: user, password: pwd }),
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccess(true);
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Registration Successful!</h1>
          <p>
            <a href="/login">Sign In</a>
          </p>
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
                Invalid username. Must be 8-29 characters long and start with a
                letter.
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
                Invalid password. Must be at least 8 characters long, contain at
                least one uppercase letter, one lowercase letter, and one
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
            <button
              type="submit"
              disabled={!validName || !validPwd || !validMatch}
            >
              Register
            </button>
          </Form>
        </section>
      )}
    </>
  );
};

export default Register;
