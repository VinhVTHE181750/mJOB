import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BsExclamation } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ForumContext } from "../../context/ForumContext";
import usePostDetail from "../../hooks/forum/posts/usePostDetail";
import usePostUpdate from "../../hooks/forum/posts/usePostUpdate";

const EditForm = ({ id }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const userId = 1; // get from context instead
  const [status, setStatus] = useState("");
  const { categories } = useContext(ForumContext);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const navigate = useNavigate();
  const { updatePost, loading: updating, error: updateError } = usePostUpdate();
  const { post, loading, error: postError } = usePostDetail(id);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setContent(post.content || "");
      setCategory(post.category || "");
      setTags(post.tags || "");
      setCategory(
        categories.find((c) => c.id === post.PostCategoryId)?.name || ""
      );
      setStatus(post.status || "");
    }
  }, [categories, post]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError("Title and content must not be empty");
      return;
    }

    const result = await updatePost(
      Number(id),
      title,
      content,
      userId,
      status,
      category,
      tags
    );
    if (result) {
      navigate(`/posts/${id}`);
    } else {
      setError(updateError || "Failed to update post");
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
            <Form.Group controlId="tags">
              {/* <Form.Label>Tags</Form.Label> */}
              <Form.Control
                type="text"
                value={tags}
                placeholder="Tags"
                onChange={(e) => setTags(e.target.value)}
              />
            </Form.Group>
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
              {error && (
                <span className="text-danger">
                  <BsExclamation
                    className="vertical-align-top"
                    style={{
                      width: "2em",
                      height: "2em",
                    }}
                  />{" "}
                  {error}
                </span>
              )}
            </p>
          </Row>
          <Row className="row-submit">
            <div className="d-flex justify-content-center gap-2">
              <Button variant="secondary">Save as draft </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Row>
        </Form>
      )}
    </Container>
  );
};

EditForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditForm;
