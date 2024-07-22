import PropTypes from "prop-types";
import useCommentsQuery from "../../hooks/forum/comments/useCommentsQuery";
import { Spinner } from "react-bootstrap";
import Comment from "./Comment";

const ListComment = ({ id }) => {
  // id is post ID
  const { comments, loading, error } = useCommentsQuery(id);

  return loading ? (
    <div className="d-flex justify-content-center align-items-center">
      <Spinner
        animation="border"
        role="status"
      />
    </div>
  ) : error ? (
    <div className="d-flex justify-content-center align-items-center">
      <p>Something went wrong while fetching the comments.</p>
    </div>
  ) : (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
};

ListComment.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ListComment;
