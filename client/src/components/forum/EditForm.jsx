import React, {useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import usePostUpdate from "../../hooks/forum/posts/usePostUpdate";
import {useNavigate, useParams} from "react-router-dom";
import usePostDetail from "../../hooks/forum/posts/usePostDetail";

const EditForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [post_id, setPost_id] = useState(id);
  const { updatePost } = usePostUpdate();
  const { post, loading, error: postError } = usePostDetail(id);

  useEffect(() => {
    if (post) {
      setTitle(post.post_title || "");
      setContent(post.post_content || "");
      setPost_id(post.post_id);
    }
  }, [post]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError("Title and content must not be empty");
      return;
    }

    //const user_id = userContext.user_id;
    const user_id = 1; // Set author here
    const result = await updatePost(title, content, user_id, post_id);
    console.log(result);
    if (result) {
      navigate(`/posts/${post_id}`);
    }
  };

  return (
    <Container style={{ minHeight: "100vh" }}>
      <Row>
        <h1 className="text-center">Edit Post</h1>
      </Row>
      {loading ? (
        "Loading post..."
      ) : (
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
          <Row className="text-center text-danger">
            {error && <p>{error}</p>}
          </Row>
          <Row className="row-submit">
            <Button variant="primary" type="submit" className="forum-button">
              Submit
            </Button>
          </Row>
          <Row></Row>
        </Form>
      )}
    </Container>
  );
};

export default EditForm;