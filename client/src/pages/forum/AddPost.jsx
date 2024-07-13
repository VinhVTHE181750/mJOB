import {Col} from "react-bootstrap";
import AddForm from "../../components/forum/AddForm";
import NavigateButton from "../../components/ui/buttons/NavigateButton";

const AddPost = () => {
  return (
    <div className="forum-body">
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
    </div>
  );
};

export default AddPost;