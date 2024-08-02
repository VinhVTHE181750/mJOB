import { useParams } from "react-router";
import EditForm from "../../components/forum/EditForm";
import NavigateButton from "../../components/ui/buttons/NavigateButton";
import { Container } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";

const EditPost = () => {
  const id = useParams().id;
  return (
    <Container>
      <NavigateButton
        path={`/forum/posts/${id}`}
        variant="primary"
        className="mb-2"
      >
        <BsArrowLeft /> Back
      </NavigateButton>
      <EditForm id={id} />
    </Container>
  );
};

export default EditPost;
