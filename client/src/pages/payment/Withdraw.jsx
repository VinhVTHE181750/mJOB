import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { BsArrowLeft, BsArrowUp, BsCheck2Circle, BsXCircle } from "react-icons/bs";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import { useBalance } from "../../hooks/payment/useBalance";
import Balance from "./micro/Balance";
import EmbedCard from "./micro/EmbedCard";
import http from "../../functions/httpService";

const Withdraw = () => {
  const [amount, setAmount] = useState(0);
  const { balance, loading, error } = useBalance();
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [inputted, setInputted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [initiating, setInitiating] = useState(false);

  useEffect(() => {
    if (isNaN(amount)) {
      setErrorMsg("Invalid amount");
      return;
    } else if (amount <= 0) {
      if (!inputted) return;
      setErrorMsg("Invalid amount");
      return;
    } else if (amount > 10000) {
      setErrorMsg("Amount larger than 10000 may be subject to PayPal limit due to regulations.");
      return;
    }
    setErrorMsg("");
  }, [amount]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleWithdrawClick = async () => {
    setInitiating(true);
    setShowModal(true);
    setSuccess(false);
    // api call to withdraw: /payment/paypal/payout
    // body: amount
    try {
      const response = await http.post("/payment/paypal/payout", { amount });
      if (response.status === 201) {
        setSuccess(true);
        setInitiating(false);
      } else {
        setSuccess(false);
        setErrorMsg("Failed to withdraw money due to our PayPal integration issue.");
      }
    } catch (error) {
      setErrorMsg("Failed to withdraw money due to our PayPal integration issue.");
    }
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
      <h1>Withdraw</h1>
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
      <Row className="border mt-5 d-flex justify-content-center align-items-center">
        <Col
          className="text-end"
          sm={3}
        >
          Enter your withdraw amount:
        </Col>
        <Col>
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
          />
        </Col>
        <Col>
          <Button
            variant="primary"
            onClick={handleWithdrawClick}
          >
            <BsArrowUp /> Withdraw
          </Button>
        </Col>
      </Row>
      <Row>{message && <p className="text-danger fs-4 text-center">{errorMsg}</p>}</Row>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Row className="d-flex justify-content-center align-items-center">
            {initiating && <Spinner animation="border" />}
            {success && <BsCheck2Circle className="fs-1 text-center text-success" />}
            {!success && !initiating && <BsXCircle className="fs-1 text-center text-danger" />}
          </Row>
          {initiating && <p className="text-center">Initiating withdraw...</p>}
          {success && <p className="text-center text-success">Withdraw successful!</p>}
          {!success && !initiating && <p className="text-center text-danger">{errorMsg}</p>}
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

export default Withdraw;
