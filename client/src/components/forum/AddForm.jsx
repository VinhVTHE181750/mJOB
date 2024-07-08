import React, {useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import usePostInsert from "../../hooks/forum/posts/usePostInsert";
import {useNavigate} from "react-router-dom";

const AddForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [post_status, setPost_status] = useState("PUBLISHED");
  const { insertPost } = usePostInsert();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError("Title and content must not be empty");
      return;
    }

    //const user_id = userContext.user_id;
    const user_id = 1; // Set author here
    const result = await insertPost(title, content, user_id, post_status);

    if (result) {
      navigate("/forum");
    } else {
      setError("Failed to create post.");
    }
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Row>
        <h1 className="text-center">Create a Post</h1>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="title">
              {/* <Form.Label>Title</Form.Label> */}
              <Form.Control
                type="text"
                value={title}
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="content">
            {/* <Form.Label>Content</Form.Label> */}
            <Form.Control
              as="textarea"
              rows={10}
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="row-submit">
          <Button variant="primary" type="submit" className="forum-button">
            Submit
          </Button>
        </Row>
        <Row>
          <p className="text-danger mt-3">{error && <p>{error}</p>}</p>
        </Row>
      </Form>
    </Container>
  );
};

export default AddForm;