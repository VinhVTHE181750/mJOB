import React from 'react';
import {Button, Col, Container, Row} from 'react-bootstrap';

function MyComponent() {
  return (
    <div className="flex flex-col bg-white">
      <div className="w-full bg-zinc-300 min-h-[118px] max-md:max-w-full" />
      <Container>
        <Row className="justify-content-center mt-20">
          <Col md={12} lg={8} xl={6}>
            <div className="text-center">
              <h1 className="text-9xl font-bold text-black md:text-4xl">
                <span className="text-black">404</span>
                <span className="text-8xl text-black">. NOT FOUND</span>
                <br />
                <span className="text-4xl text-black ">
                  This page is not available on our platform.
                </span>
                <br />
                <span className="text-4xl text-black ">
                  If you believe this is an error, please contact our staff.
                </span>
              </h1>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col md={5}>
            <Button variant="primary" className="w-100 py-4 text-4xl">
              Homepage
            </Button>
          </Col>
          <Col md={5} >
            <Button variant="success" className="w-100 py-4 text-4xl">
              Go to Help page
            </Button>
          </Col>
        </Row>
      </Container>
      <div className="mt-32 w-full bg-zinc-300 min-h-[83px] max-md:mt-10 max-md:max-w-full" />
    </div>
  );
}

export default MyComponent;