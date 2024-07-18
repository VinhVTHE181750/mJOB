import { useParams } from "react-router-dom";
import "../../assets/css/Forum.css";
import NavigateButton from "../../components/ui/buttons/NavigateButton.jsx";
import Post from "../../components/forum/Post.jsx";
import { Container } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import ListComment from "../../components/forum/ListComment.jsx";
import CommentForm from "../../components/forum/CommentForm.jsx";

const PostDetail = () => {
  const { id } = useParams();

  return (
    <Container>
      <NavigateButton
        path="/forum"
        text="Back"
        variant="primary"
        className="mb-2"
        icon={<BsArrowLeft />}
      />
      <Post id={id} />
      <ListComment id={Number(id)} />
      <CommentForm id={Number(id)} />
    </Container>
  );
};

export default PostDetail;
