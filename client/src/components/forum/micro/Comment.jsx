import PropTypes from "prop-types";

const Comment = ({ comment }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex flex-row align-items-center">
          <h5 className="mb-0 me-2">{comment.username}</h5>
          <p className="mb-0">{comment.content}</p>
        </div>
        <p className="card-text">
          <small className="text-muted">{new Date(comment.updatedAt).toLocaleString()}</small>
        </p>
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
  }).isRequired,
};

export default Comment;
