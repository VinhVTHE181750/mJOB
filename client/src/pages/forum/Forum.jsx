import { Col, Container, Row } from "react-bootstrap";
import PostSearch from "../../components/forum/PostSearch";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import ListPost from "../../components/forum/ListPost";
import ChatBox from "../../components/forum/ChatBox";

const Forum = () => {
  return (
    <Container>
      <Row>
        {/* <Col md={2} className="">
          <div>
            <p>User statuses here.</p>
          </div>
        </Col> */}
        <Col md={12}>
          <Row className="">
            <Col md={6} className="align-items-center">
              <PostSearch />
            </Col>
            <Col md="auto">
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
          <ListPost />
        </Col>
      </Row>
      <ChatBox user={"user1"} />
    </Container>
  );
};

export default Forum;
