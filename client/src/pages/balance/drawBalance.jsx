import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/UserContext";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";

function ModalOTP({
  handleClose,
  show,
  userId,
  setReload,
  accountNumber,
  amount,
  reason,
  currentBalance,
}) {
  const [otp, setOtp] = useState("");
  const handleCheckOTP = async () => {
    try {
      const request = await axios.post(`/payment/check-validate-otp`, {
        otp,
        userId,
        accountNumber,
        amount,
        reason,
        currentBalance,
      });
      if (request.status === 200) {
        alert(request.data.message);
        handleClose();
        setOtp("");
        setReload(true);
      } else if (request.status === 203) {
        alert(request.data.message);
        setOtp("");
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter OTP Code contains 6 digits</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCheckOTP}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function DrawBalacePage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [balance, setBalance] = useState();
  const [reload, setReload] = useState(true);
  const { userInformation } = useAuth();

  const [userName, setUserName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [reason, setReason] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [accountBalance, setAccountBalance] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/withdraw", {
        userName,
        accountNumber,
        amount,
        password,
        transactionDate,
        reason,
        verificationCode,
        accountBalance,
      });
      console.log(response.data);
      // Handle successful response
    } catch (error) {
      console.error("There was an error processing the request!", error);
    }
  };
  useEffect(() => {
    const handleFetchData = async () => {
      const request = await axios.get(`/payment/balance/${userInformation.id}`);
      if (request.status === 200) {
        setBalance(request.data?.data?.balance || 0);
      }
    };
    if (userInformation.id && reload) {
      handleFetchData();
      setReload(false);
    }
  }, [userInformation.id, reload]);

  const validateSendMail = async () => {
    const request = await axios.post(`/payment/send-otp`, {
      userId: userInformation.id,
      username: userName,
      password,
    });
    if (request.status === 200) {
      alert(request.data.message);
      handleShow();
    }
  };
  return (
    <>
      <Container
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: "13%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ borderRadius: "50%", width: "300px", marginBottom: "3%" }}
            src="https://cdn-icons-png.flaticon.com/512/583/583985.png"
          />

          <h4>The Balance: {balance || 0}$</h4>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formUserName">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formAccountNumber">
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formAmount">
                <Form.Label>Amount to Withdraw</Form.Label>
                <Form.Control
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formPassword">
                <Form.Label>Password for Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="formTransactionDate">
                <Form.Label>Transaction Date</Form.Label>
                <Form.Control
                  type="date"
                  value={transactionDate}
                  onChange={(e) => setTransactionDate(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formReason">
                <Form.Label>Reason for Withdrawal</Form.Label>
                <Form.Control
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button onClick={validateSendMail} className="mt-2">
            Withdraw Money
          </Button>
        </Form>
      </Container>
      <ModalOTP
        show={show}
        handleClose={handleClose}
        userId={userInformation.id}
        setReload={setReload}
        reason={reason}
        accountNumber={accountNumber}
        amount={amount}
        currentBalance={balance || 0}
      />
    </>
  );
}

export default DrawBalacePage;
