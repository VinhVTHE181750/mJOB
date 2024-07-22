import { Container } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { useParams } from "react-router-dom";
import "../../assets/css/Forum.css";
import Post from "../../components/forum/Post.jsx";
import NavigateButton from "../../components/ui/buttons/NavigateButton.jsx";

const PostDetail = () => {
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
      <Post id={id} />
    </Container>
  );
};

export default PostDetail;
