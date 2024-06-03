import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function MyComponent() {
  return (
    <div className="flex flex-col bg-white">
      <div className="w-full bg-zinc-300 min-h-[118px] max-md:max-w-full" />
      <Container>
        <Row className="justify-content-center mt-20">
          <Col md={12} lg={8} xl={6}>
            <div className="text-center">
              <h1 className="text-9xl font-bold text-white md:text-4xl">
                ERROR! 
                <br />
                <span className="text-4xl text-white ">
                  Something unexpected happens.
                </span>
                <br />
                <span className="text-4xl text-white ">
                  We are on the way fixing this.
                </span>
              </h1>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <Button variant="primary" className="w-100 py-4 text-4xl">
              Homepage
            </Button>
          </Col>
          <Col md={6} className="mt-3 mt-md-0">
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