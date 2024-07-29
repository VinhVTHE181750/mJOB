import { lazy, Suspense, useState } from "react";
import { Col, Container, FloatingLabel, Form, Row, Spinner } from "react-bootstrap";
import { useBalance } from "../../hooks/payment/useBalance";
import Balance from "./micro/Balance";
import EmbedCard from "./micro/EmbedCard";
const PayPalComponent = lazy(() => import("../../components/payment/PayPalComponent"));

const Deposit = () => {
  const [amount, setAmount] = useState(0);
  const { balance, loading, error } = useBalance();

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
              <div className="fs-1">
                {loading && <Spinner animation="border" />}
                {(!loading && !error) && (
                  <Balance
                    amount={balance}
                    currency="USD"
                    locale="en-US"
                  />
                )}
                {error && <p>Error: {error.message}</p>}
              </div>
            }
          />
        </Col>
      </Row>
      <Row className="border mt-5 d-flex justify-content-center align-items-center">
        <Col
          className="px-0 mx-0"
          sm={3}
        >
          <FloatingLabel
            className="m-2 p-0 mb-3"
            controlId="floatingInput"
            label="Amount to deposit"
          >
            <Form.Control
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FloatingLabel>
          <Suspense fallback={<Spinner animation="border" />}>
            <PayPalComponent amount={amount} />
          </Suspense>
        </Col>
      </Row>
    </Container>
  );
};

export default Deposit;
