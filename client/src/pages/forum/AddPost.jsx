import {Col, Container} from "react-bootstrap";
import AddForm from "../../components/forum/AddForm";
import NavigateButton from "../../components/ui/buttons/NavigateButton";

const AddPost = () => {
  return (
    <Container>
      <Col md={2}>
        <NavigateButton
          path={"/forum"}
          text="Back to Forum"
          variant="primary"
          confirm={true}
          confirmMsg={"Discard changes and leave this page?"}
        />
      </Col>
      <AddForm />
    </Container>
  );
};

export default AddPost;