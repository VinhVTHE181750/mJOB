import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import usePostInsert from "../../hooks/forum/posts/usePostInsert";
import { useNavigate } from "react-router-dom";
import useCategories from "../../hooks/forum/categories/useCategories";
import { FaExclamation } from "react-icons/fa6";
import { BsExclamation } from "react-icons/bs";

const AddForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("PUBLISHED");
  const userId = 1; // use context instead
  const { categories } = useCategories();
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const { insertPost, error: postError } = usePostInsert();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event, status) => {
    event.preventDefault();
    setError(null);

    const result = await insertPost(
      title,
      content,
      userId,
      status,
      category,
      tags
    );

    if (result) {
      navigate("/forum");
    } else {
      setError("Title and content must not be empty");
    }
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Row>
        <h1 className="text-center">Create a Post</h1>
      </Row>
      <Form>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="category">
              {/* <Form.Label>Category</Form.Label> */}
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={9}>
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
        <Row>
          <p>
            {postError && (
              <span className="text-danger">
                <BsExclamation className="vertical-align-top" style={{
                  width: "2em",
                  height: "2em",
                }} /> {postError}
              </span>
            )}
          </p>
        </Row>
        <Row className="d-flex gap-2">
          <Button
            variant="primary"
            onClick={(e) => handleSubmit(e, "PUBLISHED")}
          >
            Submit
          </Button>
          <Button variant="secondary" onClick={(e) => handleSubmit(e, "DRAFT")}>
            Save as Draft
          </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default AddForm;
