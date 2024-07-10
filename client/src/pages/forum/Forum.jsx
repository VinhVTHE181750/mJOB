import { Col, Container, Row } from "react-bootstrap";
import PostSearch from "../../components/forum/PostSearch";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import ListPost from "../../components/forum/ListPost";

const Forum = () => {
  return (
    <Container>
      <Row>
        <Col md={2} className="">
          <div>
            <p>User statuses here.</p>
          </div>
        </Col>
        <Col md={10}>
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
          <ListPost />
        </Col>
      </Row>
      <Row className="border">
        <Col className="border" md={9}>
          <Row className="border">
            <p>{">"} User 1: abc</p>
            <p>{">"} User 1: abc</p>
            <p>{">"} User 1: abc</p>
            <p>{">"} User 1: abc</p>
            <p>{">"} User 1: abc</p>
            <p>{">"} User 1: abc</p>
            <p>{">"} User 1: abc</p>
          </Row>
          <Row className="text-danger">
            ⚠ Beware, this is a public chat room. Do not share personal
            information.
          </Row>
          <Row className="border border-primary">Say something...</Row>
        </Col>
        <Col className="border" md={3}>
          Online users
        </Col>
      </Row>
    </Container>
  );
};

export default Forum;
