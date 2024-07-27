import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Modal,
  Form,
} from "react-bootstrap";
import { useAuth } from "../../context/UserContext";

const ModalFAQ = ({ show, handleClose, setReload }) => {
  const { handleRedirectError } = useAuth();
  const [ticket, setTicket] = useState({
    question: "",
    answer: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/faq/create", {
        ...ticket,
      });
      if (response.status === 201) {
        alert(response.data.message);
        setReload(true);
        setTicket({
          question: "",
          answer: "",
        });
        handleClose();
      }
    } catch (error) {
      console.error("There was an error creating Faq!", error);
      handleRedirectError("server error");
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create new FAQ</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter question"
              name="question"
              value={ticket.question}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Answer</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter answer"
              name="answer"
              value={ticket.answer}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function AdminFAQsPage() {
  const { handleRedirectError } = useAuth();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const request = await axios.get(`/faq`);
        if (request.status === 200) {
          setData(request.data.data);
        }
        setReload(false);
      } catch (err) {
        console.error(err);
        handleRedirectError("server error");
      }
    };
    if (reload) handleFetchData();
  }, [reload]);
  return (
    <>
      <ModalFAQ show={show} handleClose={handleClose} setReload={setReload} />
      <Container>
        <Button className="mb-3" onClick={handleShow}>
          Create New Faqs
        </Button>
        <h3>FAQs List</h3>
        <Card>
          <CardBody>
            <h6>
              <b>Question:</b> This is test
            </h6>
            <p>Answer From Support: This is test ABCD</p>
          </CardBody>
        </Card>
        {data?.length > 0 &&
          data.map((item, index) => {
            return (
              <Card className="mt-2">
                <CardBody>
                  <h6>
                    <b>Question:</b> {item.question}
                  </h6>
                  <p>Answer From Support: {item.answer}</p>
                </CardBody>
              </Card>
            );
          })}
      </Container>
    </>
  );
}

export default AdminFAQsPage;
