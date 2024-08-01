import { Container } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { useParams } from "react-router-dom";
import NavigateButton from "../../components/ui/buttons/NavigateButton.jsx";

const ManagePosts = () => {
  const { id } = useParams();

  return (
    <Container>
      <NavigateButton
        path="/forum"
        variant="primary"
        className="mb-2"
      >
        <BsArrowLeft /> Back
      </NavigateButton>
      
    </Container>
  );
};

export default ManagePosts;
