import React from 'react';
import { GrTransaction } from "react-icons/gr";
import { Card, Row, Col, Button } from 'react-bootstrap';
function Transfer() {
    return (
        <div>
            <Row>
                <Col md>
                    <Card>
                        <Card.Body>
                            <Card.Title>Transfer</Card.Title>
                            <Button variant="primary">Transfer</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md>
                    <Row> Amount</Row>
                    <Row><GrTransaction /></Row>
                    <Row> Transfer To</Row>
                </Col>
                <Col md>
                    <Card>
                        <Card.Body>
                            <Card.Title>Transfer</Card.Title>
                            <Button variant="primary">Transfer</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Transfer