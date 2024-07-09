import React, {useCallback, useEffect, useState} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import usePostUpdate from "../../hooks/forum/posts/usePostUpdate";
import {useNavigate, useParams} from "react-router-dom";
import usePostDetail from "../../hooks/forum/posts/usePostDetail";
import useCategories from "../../hooks/forum/categories/useCategories";

const EditForm = ({id}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  // id, title, content, userId, username, status, category, categoryId, tags
  const userId = 1; // get from context instead
  const username = "admin"; // get from context instead
  const [status, setStatus] = useState("PUBLISHED"); 
  const { categories } = useCategories();
  const [categoryId, setCategoryId] = useState(1);
  const [category, setCategory] = useState("GENERAL");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const { updatePost } = usePostUpdate();
  const { post, loading, error: postError } = usePostDetail(id);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
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
    const UserId = 1; // Set author here
    const result = await updatePost(Number(id), title, content, userId, username, status, category, categoryId, tags);
    console.log(result);
    if (result) {
      navigate(`/posts/${id}`);
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