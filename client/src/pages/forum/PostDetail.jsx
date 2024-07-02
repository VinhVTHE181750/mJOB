import { useParams } from "react-router-dom";
import "../../assets/css/Forum.css";
import NavigateButton from "../../components/ui/buttons/NavigateButton.jsx";
import Post from "../../components/forum/Post.jsx";
// import Comment from "../../components/forum/Comment.jsx";
import useCommentsQuery from "../../hooks/forum/comments/useCommentsQuery.js";
import { Container } from "react-bootstrap";
import ListComment from "../../components/forum/ListComment.jsx";

const PostDetail = () => {
  const { id } = useParams();
  const post_id = id;
  const { comments, loading, error } = useCommentsQuery(id);

  return (
    <div className="forum-body">
      <NavigateButton path="/forum" text="Back to Forum" variant="primary" className="mb-2"/>
      <Post post_id={id} />
      <Container className="mt-5 border">
        <ListComment post_id={id} />
      </Container>
    </div>
  );
};

export default PostDetail;
