import axios from "axios";
import React, {useEffect, useState} from "react";
import {Alert, Button, Card, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router";

const CreateTicketPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(8); // Giả định user_id là 2
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post("/api/ticket/create", {
        user_id: userId,
        ticket_category: category,
        ticket_title: title,
        ticket_content: content,
      });
      if (response.status === 201) {
        setMessage("Ticket created successfully");
        setError(null);
        setCategory("");
        setTitle("");
        setContent("");
      }
    } catch (error) {
      setError("Failed to create ticket");
      setMessage(null);
      navigate("/error", {
        state: {
          message: error.response
            ? error.response.data.message
            : "An error occurred",
        },
      });
    }
  };
  useEffect(() => {
    const userDecode = localStorage.getItem("user");
    if (userDecode) {
      const userEncode = JSON.parse(userDecode);
      setUserId(userEncode.user_id);
    }
  }, []);

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card style={{ width: "30rem" }}>
        <Card.Body>
          <Card.Title>Create Ticket</Card.Title>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formCategory" className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTitle" className="mt-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formContent" className="mt-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Create Ticket
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CreateTicketPage;
