import PropTypes from "prop-types";
import { getMoment } from "../../functions/Converter";
import { Button } from "react-bootstrap";
import LikeButton from "./micro/LikeButton";

const Comment = ({ comment }) => {
  const currentUsername = "ADMIN1";
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex flex-row align-items-center">
          <h5 className="mb-0 me-2">{comment.username}</h5>
          <p className="mb-0">{comment.content}</p>
        </div>
        <p className="card-text">
          <small className="text-muted">{getMoment(comment.updatedAt)}</small>
        </p>
      </div>
      {comment.username === currentUsername ? (
        <div>
          <Button variant="danger">Delete</Button>
          <Button variant="primary">Edit</Button>
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
};

export default Comment;
