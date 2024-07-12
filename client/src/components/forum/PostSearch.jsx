import PropTypes from "prop-types";
import { Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { FaFilter, FaSort } from "react-icons/fa6";
import { useContext } from "react";
import Tag from "./micro/Tag";
import { ForumContext } from "../../context/ForumContext";

const PostSearch = () => {
  const { searchTerms, removeTag, addTag, setUser } = useContext(ForumContext);
  const searchTags = searchTerms.tags;

  const handleChange = (e) => {
    // if last characte r entered was space, parse the entered word as a tag if it start with #
    const lastChar = e.target.value.slice(-1);
    // if last char   is not alphanumeric
    const regex = /^[a-zA-Z0-9]+$/;
    if (regex.test(lastChar) === false) {
      // cut the last char
      const query = e.target.value.slice(0, -1);
      if (query[0] === "#") {
        addTag(query.substring(1));
        e.target.value = "";
      }
      if (query[0] === "@") {
        setUser(query.substring(1));
        e.target.value = "";
      }
    }
  };

  return (
    <Form>
      <Row className="align-items-center">
        {/* <Col xs="auto"> */}
        {/* {category ? <Category category={category} /> : <Category />} */}
        {/* </Col> */}
        <Col xs={'auto'} className="me-0 pe-0">
        
          <Form.Control
            type="text"
            placeholder="Enter a query..."
            onChange={handleChange}
          />
        </Col>
        <Col xs={'auto'} className="px-0 mx-0">
        
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">
              <FaSort /> Sort
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Featured</Dropdown.Item>
              <Dropdown.Item>Title (ascending)</Dropdown.Item>
              <Dropdown.Item>Title (descending)</Dropdown.Item>
              <Dropdown.Item>Date (ascending)</Dropdown.Item>
              <Dropdown.Item>Date (descending)</Dropdown.Item>
              <Dropdown.Item>Most likes</Dropdown.Item>
              <Dropdown.Item>Most comments</Dropdown.Item>
              <Dropdown.Item>Most views</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={1} className="px-0 mx-0">
          <Dropdown>
            <Dropdown.Toggle variant="outline-secondary">
              <FaFilter /> Filter
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Today</Dropdown.Item>
              <Dropdown.Item>This week</Dropdown.Item>
              {/* Add more filter options here */}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={2} className="px-0 mx-0">
          <Button variant="primary">
            <FaSearch /> Search
          </Button>
        </Col>
      </Row>
      <Row className="mx-auto mt-1 me-auto">
        {searchTags.map((tag) => (
          <Tag key={tag} tag={`${tag} ❌`} handler={() => removeTag(tag)} />
        ))}
      </Row>
    </Form>
  );
};

PostSearch.propTypes = {
  category: PropTypes.object,
  tagHandler: PropTypes.func,
  tags: PropTypes.array,
};

export default PostSearch;
