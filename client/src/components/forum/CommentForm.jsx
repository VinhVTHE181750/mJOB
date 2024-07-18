import PropTypes from "prop-types";
import { useState } from "react";
import { Form, Button, InputGroup, FormControl, Col } from "react-bootstrap";
import useWhoAmI from "../../hooks/user/useWhoAmI";
import http from "../../functions/httpService";

const CommentForm = ({ id }) => {
  const [comment, setComment] = useState("");
  const { userId, username } = useWhoAmI();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = {
        postId: id,
        userId,
        username,
        text: comment,
        createdAt: new Date().toISOString(),
      };
      await http.post("/forum/comments", newComment);
      setComment("");
      // Optionally, you can trigger a re-fetch of comments here
    } catch (error) {
      console.error("Failed to post comment", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputGroup className="mt-3 mb-3">
      <Col xs={12} md={12}>
        <FormControl
          as="textarea"
          rows={1}
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          className="mr-2" // Add margin-right to the input field
        />
         </Col>
      </InputGroup>
      <Button type="submit" variant="primary" className="ml-2">
          Comment
        </Button>
    </Form>
  );
};

CommentForm.propTypes = {
  id: PropTypes.number.isRequired,
};

export default CommentForm;
