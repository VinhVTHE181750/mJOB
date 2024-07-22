import { useParams } from "react-router-dom";
import "../../assets/css/Forum.css";
import NavigateButton from "../../components/ui/buttons/NavigateButton.jsx";
import Post from "../../components/forum/Post.jsx";
import { Form, Container, FloatingLabel, Button } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import ListComment from "../../components/forum/ListComment.jsx";
import useCommentInsert from "../../hooks/forum/comments/useCommentInsert.js";
import { useState } from "react";

const PostDetail = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const { insertComment } = useCommentInsert();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    insertComment(comment, Number(id));
    setComment("");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

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

      {/* Comment Form */}
      <FloatingLabel
        controlId="floatingTextarea"
        label="Add a comment"
      >
        <Form.Control
          as="textarea"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Leave a comment here"
          style={{ height: "120px" }}
        />
        <Button
          variant="primary"
          className="mt-2"
          onClick={handleCommentSubmit}
        >
          Submit
        </Button>
      </FloatingLabel>
    </Container>
  );
};

export default PostDetail;
