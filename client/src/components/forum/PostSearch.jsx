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
    unsetTitle,
    setContent,
    unsetContent,
    setCategory,
    unsetCategory,
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
      if (regex.test(value) === false) {
        return;
      }
      switch (type) {
        case "#":
          addTag(value);
          e.target.value = "";
          break;
        case "@":
          setUser(value);
          e.target.value = "";
          break;
        case "$":
          setContent(value);
          e.target.value = "";
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

  useEffect(() => {
    
  }, [searchTerms]);

  return (
    <>
      <Row className="align-items-center">
        {/* <Col xs="auto">
        {category ? <Category category={category} /> : <Category />}
        </Col> */}
        <Col xs={10} sm={8} md={6} className="">
          <Form onSubmit={handleSubmit}>
            <Form.Control className="d-sm-inline"
              type="text"
              placeholder="Enter title query or a #tag, @user, $content..."
              onChange={handleChange}
            />
            <Button type="submit" className="d-none d-sm-inline">Submit</Button>
          </Form>
        </Col>
      </Row>
      <Row className="mx-auto mt-1 me-auto">
        {user && <Tag key="user" tag={`@${user} ❌`} handler={unsetUser} />}
        {searchTags.map((tag) => (
          <Tag key={tag} tag={`${tag} ❌`} handler={() => removeTag(tag)} />
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
