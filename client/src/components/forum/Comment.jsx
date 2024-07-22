import PropTypes from "prop-types";
import { getMoment } from "../../functions/Converter";
import { Button } from "react-bootstrap";
import LikeButton from "./micro/LikeButton";
import useWhoAmI from "../../hooks/user/useWhoAmI";
import { useState } from "react";
import useCommentDelete from "../../hooks/forum/comments/useCommentDelete";

const Comment = ({ comment }) => {
  const { username } = useWhoAmI();

  const [editable, setEditable] = useState(false);
  const { deleteComment } = useCommentDelete();

  const toggleEdit = () => {
    setEditable(!editable);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteComment(comment.id);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-row align-items-center">
          <h5 className="mb-0 me-2">{comment.username}</h5>
        </div>
        <p>{comment.content}</p>
        <p className="card-text">
          <small className="text-muted">{getMoment(comment.updatedAt)}</small>
        </p>
      </div>
      <div className="d-flex flex-end align-items-end justify-content-end gap-2 m-2">
        <LikeButton
          id={comment.id}
          type="comment"
          action="like"
        />
        <LikeButton
          id={comment.id}
          type="comment"
          action="dislike"
        />
        {comment.username === username ? (
          <>
            {/* <Button
              variant="primary"
              onClick={toggleEdit}
            >
              Edit
            </Button> */}
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
    username: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Comment;
