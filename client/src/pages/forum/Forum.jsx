import { Col, Container, Row } from "react-bootstrap";
import PostSearch from "../../components/forum/PostSearch";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import ListPost from "../../components/forum/ListPost";
import ChatBox from "../../components/forum/ChatBox";
import { useState } from "react";

const Forum = () => {
  const [tags, setTags] = useState([]);
  const addSearchTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      console.log('added ' + tag)
    }
  };
  const removeSearchTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
    console.log('removed ' + tag)
  };
  return (
    <Container>
      <Row>
        {/* <Col md={2} className="">
          <div>
            <p>User statuses here.</p>
          </div>
        </Col> */}
        <Col md={12}>
          <Row className="align-items-center">
            <Col xs={12} md={10} className="">
              <PostSearch tagHandler={removeSearchTag} tags={tags} />
            </Col>
            <Col md={2} className="d-flex flex-row-reverse">
              <NavigateButton
                path="/forum/add"
                variant="primary"
                size="lg"
                text="Add Post"
              >
                Navigate
              </NavigateButton>
            </Col>
          </Row>
          <ListPost tagHandler={addSearchTag} />
        </Col>
      </Row>
      {/* <ChatBox user={"user1"} /> */}
    </Container>
  );
};

export default Forum;
