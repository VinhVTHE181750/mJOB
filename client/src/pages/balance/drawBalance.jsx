import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/UserContext";
import { Button, Container, Form, Modal } from "react-bootstrap";

function ModalOTP({ handleClose, show, userId, setReload }) {
  const [otp, setOtp] = useState("");
  const handleCheckOTP = async () => {
    try {
      const request = await axios.post(`/payment/check-validate-otp`, {
        otp,
        userId,
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
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{ borderRadius: "50%", width: "300px", marginBottom: "3%" }}
          src="https://cdn-icons-png.flaticon.com/512/583/583985.png"
        />

        <h4>The Balance: {balance}$</h4>
        <Button onClick={validateSendMail}>Withdraw Money</Button>
      </Container>
      <ModalOTP
        show={show}
        handleClose={handleClose}
        userId={userInformation.id}
        setReload={setReload}
      />
    </>
  );
}

export default DrawBalacePage;
