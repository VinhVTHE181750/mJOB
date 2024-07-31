import { Container, Row } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import NavigateButton from "../../components/ui/buttons/NavigateButton.jsx";
import Insights from "../../components/forum/Insights.jsx";

const ForumInsights = () => {
  return (
    <Container>
      <NavigateButton
        path="/forum"
        variant="primary"
        className="mb-2"
      >
        <BsArrowLeft /> Back
      </NavigateButton>
      <h1 className="text-center">Forum Insights</h1>
      <Row>
        <Insights />
      </Row>
    </Container>
  );
};

export default ForumInsights;
