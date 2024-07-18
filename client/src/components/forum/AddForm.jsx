import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { BsExclamation } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import useCategories from "../../hooks/forum/categories/useCategories";
import usePostInsert from "../../hooks/forum/posts/usePostInsert";
import Tag from "./micro/Tag";

const AddForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("PUBLISHED");
  const userId = 1; // use context instead
  const { categories } = useCategories();
  const [category, setCategory] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [tagsList, setTagsList] = useState([]);
  const [tags, setTags] = useState("");
  const { insertPost, error: postError } = usePostInsert();
  const navigate = useNavigate();

  const handleSubmit = async (event, status) => {
    event.preventDefault();
    const result = await insertPost(title, content, userId, status, category, tags);

    if (result) {
      navigate("/forum");
    }
  };

  const handleTagsInputChange = (e) => {
    const inputValue = e.target.value;
    const lastChar = inputValue.slice(-1);
    if (lastChar === " ") {
      const newTag = inputValue.trim();
      if (newTag.startsWith("#") && newTag.length > 1) {
        setTagsList([...tagsList, newTag.slice(1)]); // Add new tag without '#'
        setTagsInput(""); // Reset input field
      }
    } else {
      setTagsInput(inputValue); // Update tagsInput normally
    }
  };

  // const handleTagSubmit = (e) => {
  //   e.preventDefault();
  //   // // console.log("submit");
  //   const inputValue = e.target.value;
  //   let newTag = inputValue.trim();
  //   if(newTag.startsWith('#')) newTag = newTag.slice(1);
  //   setTagsList([...tagsList, newTag]); // Add new tag
  //   setTagsInput(""); // Reset input field
  // };

  useEffect(() => {
    // combine all tags in tagsList, separated by a comma
    setTags(tagsList.join(","));
  }, [tagsList]);

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
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
                  <option
                    key={category.id}
                    value={category.name}
                  >
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
          <Col
            sm={6}
            md={3}
          >
            <Form.Group controlId="tagsInput">
              {/* <Form.Label>Tags</Form.Label> */}
              <Form.Control
                type="text"
                value={tagsInput}
                placeholder="#tag... (press space to add)"
                onChange={handleTagsInputChange}
                // onSubmit={handleTagSubmit}
              />
            </Form.Group>
          </Col>
          <Col
            sm={6}
            md={9}
          >
            <div className="d-flex flex-wrap gap-2">
              {tagsList.map((tag, index) => (
                <Tag
                  key={index}
                  tag={"#" + tag}
                  close={true}
                  handler={() => removeTag(tag)}
                />
              ))}
            </div>
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
                <BsExclamation
                  className="vertical-align-top"
                  style={{
                    width: "2em",
                    height: "2em",
                  }}
                />{" "}
                {postError}
              </span>
            )}
          </p>
        </Row>
        <Row className="row-submit">
          <div className="d-flex justify-content-center gap-2">
            <Button
              variant="secondary"
              onClick={(e) => handleSubmit(e, "DRAFT")}
            >
              Save as draft{" "}
            </Button>
            <Button
              variant="primary"
              onClick={(e) => handleSubmit(e, "PUBLISHED")}
            >
              Submit
            </Button>
          </div>
        </Row>
      </Form>
    </>
  );
};

export default AddForm;
