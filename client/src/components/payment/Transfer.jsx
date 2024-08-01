import { useEffect, useState, useCallback } from "react";
import { Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { BsArrowLeft, BsCurrencyExchange } from "react-icons/bs";
import http from "../../functions/httpService";
import { useBalance } from "../../hooks/payment/useBalance";
import Balance from "../../pages/payment/micro/Balance";
import EmbedCard from "../../pages/payment/micro/EmbedCard";
import NavigateButton from "../ui/buttons/NavigateButton";

const Transfer = () => {
  const { balance, loading, error } = useBalance();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputted, setInputted] = useState(false);
  const [amount, setAmount] = useState(0);
  const [username, setUsername] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [initiating, setInitiating] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const handleTransfer = useCallback(async () => {
    if (!confirmed) return;
    setInitiating(true);
    setSuccess(false);
    try {
      const response = await http.post("/payment/transfer", { to: username, amount, message });
      if (response.status === 201) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      setSuccess(false);
    } finally {
      setInitiating(false);
    }
  }, [confirmed, username, amount]);

  useEffect(() => {
    handleTransfer();
  }, [confirmed, handleTransfer]);

  const handleTransferClick = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleConfirmClick = useCallback(() => {
    setConfirmed(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setConfirmed(false);
    setInitiating(false);
    setSuccess(false);
  }, []);

  return (
    <Container>
      <NavigateButton
        path="/payment"
        variant="primary"
        className="mb-2"
      >
        <BsArrowLeft /> Back
      </NavigateButton>
      <h1>Transfer</h1>
      <Row className="mt-5">
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
      <Row className="mt-5 mb-2 fs-4">Recipient username:</Row>
      <Row className="mb-2">
        <Form.Control
          type="text"
          value={username}
          placeholder="Enter a username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </Row>

      <Row className="mb-2 fs-4">Amount to transfer:</Row>
      <Row className="mb-2 fs-4 text-danger">{errorMessage && <p>{errorMessage}</p>}</Row>
      <Row>
        <Form.Control
          type="number"
          value={amount}
          min={0}
          step={0.01}
          isInvalid={!!errorMessage}
          onChange={(e) => {
            setInputted(true);
            setAmount(e.target.value);
          }}
          onBlur={(e) => {
            const value = parseFloat(e.target.value).toFixed(2);
            setAmount(value);
          }}
        />
      </Row>
      <Row className="mb-2 fs-4">Message:</Row>
      <Row className="mb-2">
        <Form.Control
          type="text"
          value={message}
          placeholder="Enter a message..."
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </Row>
      <Row>
        <Button
          variant="warning"
          onClick={handleTransferClick}
        >
          <BsCurrencyExchange /> Transfer
        </Button>
      </Row>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Transfer confirmation</Modal.Title>
        </Modal.Header>
        {!confirmed && (
          <Modal.Body>
            <p>
              Transfer {amount} USD to {username}?
            </p>
            <Button
              variant="primary"
              className="me-2"
              onClick={handleConfirmClick}
            >
              Confirm
            </Button>
            <Button
              variant="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Modal.Body>
        )}
        {confirmed && (
          <Modal.Body>
            {initiating && <Spinner animation="border" />}
            {!initiating && success && <p>Transfer successful</p>}
            {!initiating && !success && <p>Transfer failed</p>}
            <Button
              variant="secondary"
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Modal.Body>
        )}
      </Modal>
    </Container>
  );
};

export default Transfer;
