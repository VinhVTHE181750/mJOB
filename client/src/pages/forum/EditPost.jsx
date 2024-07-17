import {useParams} from "react-router";
import EditForm from "../../components/forum/EditForm";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import { Container } from "react-bootstrap";

const EditPost = () => {
  const id = useParams().id;
  return (
    <Container>
      <NavigateButton
        path="/forum"
        text="Back to Forum"
        variant="primary"
        confirm={true}
        confirmMsg={"Discard changes and leave this page?"}
      />
      <EditForm id={id}/>
    </Container>
  );
};

export default EditPost;