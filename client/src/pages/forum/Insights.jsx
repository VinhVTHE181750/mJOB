import { Container, Row } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import NavigateButton from "../../components/ui/buttons/NavigateButton.jsx";
import Insights from "../../components/forum/Insights.jsx";

const ForumInsights = () => {
  const currentDate = new Date().toLocaleString();
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
      <h5 className="text-center">Showing data for {currentDate}</h5>
      <Row>
        <Insights />
      </Row>
    </Container>
  );
};

export default ForumInsights;
