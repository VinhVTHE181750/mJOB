import { lazy, Suspense, useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { BsArrowLeft, BsArrowUp } from "react-icons/bs";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import { useBalance } from "../../hooks/payment/useBalance";
import Balance from "./micro/Balance";
import EmbedCard from "./micro/EmbedCard";
const PayPalComponent = lazy(() => import("../../components/payment/PayPalComponent"));
// import PayPalComponent from "../../components/payment/PayPalComponent";

const Deposit = () => {
  const [amount, setAmount] = useState(0);
  const { balance, loading, error } = useBalance();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputted, setInputted] = useState(false);

  useEffect(() => {
    if (isNaN(amount)) {
      setErrorMessage("Must be a decimal number");
      return;
    } else if (amount <= 0) {
      if (!inputted) return;
      setErrorMessage("Must be positive");
      return;
    } else if (amount > 10000) {
      setErrorMessage("Amount larger than $10000 is subjected to PayPal's transaction limit.");
      return;
    }
    setErrorMessage("");
  }, [amount, inputted]);

  const handleDepositClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <NavigateButton
        path="/payment"
        variant="primary"
        className="mb-2"
      >
        <BsArrowLeft /> Back
      </NavigateButton>
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
                {!loading && !error && (
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
      <Row className="mt-5 fs-4 mb-2">Enter your deposit amount:</Row>
      <Row className="mb-2">{errorMessage && <p className="text-danger fs-4">{errorMessage}</p>}</Row>
      <Row className="mb-2">
        <Form.Control
          type="number"
          value={amount}
          min={0}
          step={0.01}
          onChange={(e) => {
            setInputted(true);
            setAmount(e.target.value);
          }}
          onBlur={(e) => {
            const value = parseFloat(e.target.value).toFixed(2);
            setAmount(value);
          }}
          isInvalid={!!errorMessage}
        />

        {/* <div className="d-flex justify-content-center"> */}
      </Row>
      <Row>
        <Button
          // size="lg"
          variant="primary"
          onClick={handleDepositClick}
        >
          <BsArrowUp /> Deposit
        </Button>
        {/* </div> */}
      </Row>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Choose a payment method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Suspense
            fallback={
              <Spinner
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading payment methods...</span>
              </Spinner>
            }
          >
            <PayPalComponent amount={Number(amount)} />
          </Suspense>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseModal}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Deposit;
