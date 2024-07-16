import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import EmbedCard from "./micro/EmbedCard";
import Balance from "./micro/Balance";

const Deposit = () => {
  const amount = 1234.567;
  return (
    <Container>
      <h1>Deposit</h1>
      <Row className="">
        {/* <Col className="d-flex justify-content-end">
          <Button variant="success">Export</Button>
        </Col> */}
      </Row>
      <Row className="border mt-5">
        <Col className="px-0 mx-0">
          <EmbedCard
            title={<h1 style={{ fontSize: 60, fontWeight: "bold" }}>Current Balance</h1>}
            content={
              <div style={{ fontSize: 40 }}>
                <Balance
                  amount={amount}
                  currency="VND"
                  locale="vi-VN"
                />
              </div>
            }
          />
        </Col>
      </Row>
      <Row className="border mt-5">
        <Col
          className="px-0 mx-0"
          sm={3}
        >
          <FloatingLabel
            className="m-2 p-0"
            controlId="floatingInput"
            label="Amount"
          >
            <Form.Control
              type="number"
              placeholder="Amount"
            />
          </FloatingLabel>
        </Col>
        <Col
          className="d-flex align-items-center"
          sm={3}
        >
          <Button
            variant="primary"
            size="lg"
            className=""
          >
            Deposit
          </Button>
        </Col>
        <Col
          sm={6}
          className="d-flex align-items-center text-left"
        >
          You will be redirected to ...
        </Col>
      </Row>
    </Container>
  );
};

export default Deposit;
