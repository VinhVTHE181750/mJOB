import React from 'react';
import {Button, Card, Col, Container, Form, Nav, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Information = () => {
  return (
    <>

      <Container fluid className="mt-3">
        <Row>
          <Col md={3} className="bg-dark text-white p-4">
            
            <Nav className="flex-column">
            <h2><Nav.Link href="/profile" className="text-white">Profile</Nav.Link></h2>
              <Nav.Link href="/information" className="text-white">Information</Nav.Link>
              <Nav.Link href="/security" className="text-white">Security</Nav.Link>
              <Row>
                <Col><Button variant="danger" href="/logout">Log Out</Button></Col>
              </Row>
            </Nav>
          </Col>
          <Col md={9} className="p-4">
            <Card className="mb-4">
              <Card.Body>
                <Form>
                  <Form.Group as={Row} controlId="strengths">
                    <Form.Label column sm={2}>Strengths</Form.Label>
                    <Col sm={10}>
                      <Form.Control as="textarea" rows={3} placeholder="List your strengths" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="weaknesses">
                    <Form.Label column sm={2}>Weaknesses</Form.Label>
                    <Col sm={10}>
                      <Form.Control as="textarea" rows={3} placeholder="List your weaknesses" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="shortbio">
                    <Form.Label column sm={2}>Short Bio</Form.Label>
                    <Col sm={10}>
                      <Form.Control as="textarea" rows={3} placeholder="Bio" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button type="submit">Save</Button>
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



export default Information;
