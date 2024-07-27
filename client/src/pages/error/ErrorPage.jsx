import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  Modal,
} from "react-bootstrap";
import "./error.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/UserContext";
import axios from "axios";

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
      const response = await axios.post("/ticket/create", {
        ...ticket,
        priority: parseInt(ticket.priority),
        by: userId,
      });
      if (response.status === 201) {
        alert(response.data.message);
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
              disabled
            />
          </Form.Group>
          <Form.Group controlId="formTitle">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              placeholder="Enter priority"
              name="priority"
              value={ticket.priority}
              onChange={handleChange}
              disabled
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

function ErrorPage() {
  const { userInformation } = useAuth();
  const params = useLocation();
  const { state } = params;
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dataSelected = {
    priority: 2,
    title: state?.message || "",
  };

  return (
    <Container className="mt-5">
      <ModalReport
        show={show}
        handleClose={handleClose}
        userId={userInformation.id}
        dataSelected={dataSelected}
      />
      <div>
        <div className="ex-page-content bootstrap snippets bootdeys">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <svg
                  className="svg-box"
                  width="380px"
                  height="500px"
                  viewBox="0 0 837 1045"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xlink="http://www.w3.org/1999/xlink"
                  sketch="http://www.bohemiancoding.com/sketch/ns"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                    type="MSPage"
                  >
                    <path
                      d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z"
                      id="Polygon-1"
                      stroke="#3bafda"
                      stroke-width="6"
                      type="MSShapeGroup"
                    ></path>
                    <path
                      d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z"
                      id="Polygon-2"
                      stroke="#7266ba"
                      stroke-width="6"
                      type="MSShapeGroup"
                    ></path>
                    <path
                      d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z"
                      id="Polygon-3"
                      stroke="#f76397"
                      stroke-width="6"
                      type="MSShapeGroup"
                    ></path>
                    <path
                      d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z"
                      id="Polygon-4"
                      stroke="#00b19d"
                      stroke-width="6"
                      type="MSShapeGroup"
                    ></path>
                    <path
                      d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z"
                      id="Polygon-5"
                      stroke="#ffaa00"
                      stroke-width="6"
                      type="MSShapeGroup"
                    ></path>
                  </g>
                </svg>
              </div>

              <div className="col-sm-6">
                <div className="message-box">
                  <h1 className="m-b-0">500</h1>
                  <p>Internal Server Error.</p>
                  <div className="buttons-con">
                    <div className="action-link-wrap">
                      <a
                        href="/"
                        className="btn btn-custom btn-info waves-effect waves-light m-t-20"
                        style={{ color: "#fff" }}
                      >
                        Go to Home Page
                      </a>
                      <a
                        onClick={() => setToggle(!toggle)}
                        className="btn"
                        style={{
                          marginLeft: "10px",
                          color: "#fff",
                          backgroundColor: "red",
                        }}
                      >
                        See details
                      </a>
                    </div>
                  </div>
                  {toggle && (
                    <Card className="mt-3">
                      <CardBody>
                        <p>{state?.message}</p>
                        <Button onClick={handleShow}>Report this error</Button>
                      </CardBody>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ErrorPage;
