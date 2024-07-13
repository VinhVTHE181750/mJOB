// src/Footer.js
import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import '../assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>We are a company that does things.</p>
          </Col>
          <Col md={4}>
            <h5>Links</h5>
            <ul>
              <li><a href="/" className="text-white">Home</a></li>
              <li><a href="/jobs" className="text-white">Jobs</a></li>
              <li><a href="/forum" className="text-white">Forum</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: info@company.com</p>
            <p>Phone: +123 456 7890</p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center py-3">
            &copy; {new Date().getFullYear()} MyCompany. All rights reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
