import { Button, Col, Container, FloatingLabel, Row } from "react-bootstrap";
import { Suspense, lazy } from "react";
import PostSearch from "../../components/forum/PostSearch";
const NavigateButton = lazy(() =>
  import("../../components/ui/buttons/NavigateButton")
);
const ListPost = lazy(() => import("../../components/forum/ListPost"));

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
          <Suspense fallback={<div>Loading...</div>}>
            <ListPost />
          </Suspense>
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
