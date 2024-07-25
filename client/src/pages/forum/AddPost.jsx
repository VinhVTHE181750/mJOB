import { Col, Container } from "react-bootstrap";
import AddForm from "../../components/forum/AddForm";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import { BsArrowLeft } from "react-icons/bs";

const AddPost = () => {
  return (
    <Container>
      <Col md={2}>
        <NavigateButton
          path="/forum"
          variant="primary"
          className="mb-2"
        >
          <BsArrowLeft /> Back
        </NavigateButton>
      </Col>
      <AddForm />
    </Container>
  );
};

export default AddPost;
