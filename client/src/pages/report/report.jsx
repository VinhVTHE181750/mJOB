import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../context/UserContext";

const ModalReport = ({ show, handleClose, userId, setReload }) => {
  const [ticket, setTicket] = useState({
    type: "REPORT",
    title: "",
    category: "",
    description: "",
    username: "",
    email: "",
    phone: "",
    priority: 0,
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
      const response = await axios.post("/ticket/create", {
        ...ticket,
        priority: parseInt(ticket.priority),
        by: userId,
      });
      if (response.status === 201) {
        alert(response.data.message);
        setReload(true);
        setTicket({
          type: "REPORT",
          title: "",
          category: "",
          description: "",
          username: "",
          email: "",
          phone: "",
          priority: 0,
        });
      }
      handleClose();
    } catch (error) {
      console.error("There was an error creating the ticket!", error);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create new Report</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              name="title"
              value={ticket.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTitle">
            <Form.Label>Priority</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter priority"
              name="priority"
              value={ticket.priority}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTitle">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={ticket.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTitle">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              value={ticket.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formTitle">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone"
              name="phone"
              value={ticket.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              name="category"
              value={ticket.category}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              name="description"
              value={ticket.description}
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

function ReportPage() {
  const { userInformation } = useAuth();
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const TableBodyComponent = data.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.category}</td>
        <td>{item.description}</td>
      </tr>
    );
  });

  useEffect(() => {
    const handleFetchData = async () => {
      try {
        const request = await axios.get(`/ticket?userId=${userInformation.id}`);
        if (request.status === 200) {
          setData(request.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (reload && userInformation.id) {
      handleFetchData();
      setReload(false);
    }
  }, [reload, userInformation.id]);
  return (
    <>
      <Container>
        <Button className="mb-4" onClick={handleShow}>
          Create new report
        </Button>
        {data.length ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Issue</th>
                <th>Category</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>{TableBodyComponent}</tbody>
          </Table>
        ) : (
          <h2>No have report from you</h2>
        )}
      </Container>
      <ModalReport
        show={show}
        handleClose={handleClose}
        userId={userInformation.id}
        setReload={setReload}
      />
    </>
  );
}

export default ReportPage;
