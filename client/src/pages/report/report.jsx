import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import { useAuth } from "../../context/UserContext";

const ModalReport = ({
  show,
  handleClose,
  userId,
  setReload,
  dataSelected,
}) => {
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
      if (!dataSelected) {
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
          handleClose();
        }
      } else {
        const response = await axios.put(
          `/ticket/update?ticketId=${ticket.id}`,
          {
            ...ticket,
            priority: parseInt(ticket.priority),
          }
        );
        if (response.status === 200) {
          alert(response.data.message);
          setReload(true);
          handleClose();
        }
      }
    } catch (error) {
      console.error("There was an error creating the ticket!", error);
    }
  };
  useEffect(() => {
    if (dataSelected)
      setTicket({
        type: "REPORT",
        title: dataSelected.title,
        category: dataSelected.category,
        description: dataSelected.description,
        username: dataSelected.username,
        email: dataSelected.email,
        phone: dataSelected.phone,
        priority: dataSelected.priority,
        id: dataSelected.id,
      });
    else {
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
  }, [dataSelected]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {dataSelected ? "Update new Report" : "Create new Report"}
        </Modal.Title>
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
            <Form.Select
              placeholder="Enter priority"
              name="priority"
              value={ticket.priority}
              onChange={handleChange}
            >
              <option value={0}>Low</option>
              <option value={1}>Medium</option>
              <option value={2}>High</option>
            </Form.Select>
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
  const [dataSelected, setDataSelected] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelDeleteReport = async (id) => {
    try {
      const request = await axios.delete(`/ticket/delete?ticketId=${id}`);
      if (request.status === 200) {
        alert(request.data.message);
        setReload(true);
      } else {
        alert(request.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const TableBodyComponent = data.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.category}</td>
        <td>{item.description}</td>
        <td>
          <div style={{ display: "flex", color: "blue" }}>
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                setDataSelected(item);
                handleShow();
              }}
            >
              Edit
            </span>
            &ensp;
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={() => {
                handelDeleteReport(item.id);
              }}
            >
              Delete
            </span>
          </div>
        </td>
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
        <Button
          className="mb-4"
          onClick={() => {
            handleShow();
            setDataSelected(null);
          }}
        >
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
                <th>Action</th>
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
        dataSelected={dataSelected}
      />
    </>
  );
}

export default ReportPage;
