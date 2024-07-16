import PropTypes from "prop-types";
import { Button, Col, Dropdown, Form, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { FaFilter, FaSort } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import Tag from "./micro/Tag";
import { ForumContext } from "../../context/ForumContext";

const PostSearch = () => {
  const {
    searchTerms,
    removeTag,
    addTag,
    setUser,
    unsetUser,
    setTitle,
    setContent,
    setCategory,
    clearSearchTerms,
  } = useContext(ForumContext);
  const searchTags = searchTerms.tags;
  const category = searchTerms.category;
  const user = searchTerms.username;
  const title = searchTerms.title;
  const content = searchTerms.content;

  const handleChange = (e) => {
    // if last characte r entered was space, parse the entered word as a tag if it start with #
    const lastChar = e.target.value.slice(-1);
    // if last char   is not alphanumeric
    const regex = /^[a-zA-Z0-9]+$/;
    if (regex.test(lastChar) === false) {
      const query = e.target.value.slice(0, -1);
      const type = query[0];
      const value = query.slice(1);
      switch (type) {
        case "#":
          if (regex.test(value) === false) {
            return;
          }
          addTag(value);
          e.target.value = "";
          break;
        case "@":
          if (regex.test(value) === false) {
            return;
          }
          setUser(value);
          e.target.value = "";
          break;
        case "$":
          if (lastChar !== "$") {
            break;
          } else {
            setContent(value);
            e.target.value = "";
          }
          break;
        case "/":
          if (value === "clear") {
            clearSearchTerms();
            e.target.value = "";
          }
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleClear = (e) => {
    e.preventDefault();
    clearSearchTerms();
  };

  useEffect(() => {}, [searchTerms]);

  return (
    <>
      <Row className="align-items-center">
        {/* <Col xs="auto">
        {category ? <Category category={category} /> : <Category />}
        </Col> */}

        <Form onSubmit={handleSubmit}>
          <Form.Control
            className="d-inline form-control-lg"
            type="text"
            placeholder="Enter title query or a #tag, @user, $post content$, ... /clear to remove all queries."
            onChange={handleChange}
          />
          {/* <Button type="submit" className="d-none d-sm-inline mt-1">
            Submit
          </Button> */}
        </Form>
      </Row>
      <Row className="mx-auto mt-1 me-auto">
        {/* {category && <Tag key="category" tag={category.name} close={true} />} */}
        {user && <Tag key="user" tag={user} close={true} handler={unsetUser} />}
        {searchTags.map((tag) => (
          <Tag
            key={tag}
            tag={tag}
            close={true}
            handler={() => removeTag(tag)}
          />
        ))}
      </Row>
    </>
  );
};

PostSearch.propTypes = {
  category: PropTypes.object,
  tagHandler: PropTypes.func,
  tags: PropTypes.array,
};

export default PostSearch;
