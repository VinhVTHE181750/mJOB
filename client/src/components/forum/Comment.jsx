import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { BsExclamationTriangleFill, BsPencilFill, BsTrash3 } from "react-icons/bs";
import { useNavigate } from "react-router";
import { getMoment } from "../../functions/Converter";
import useCommentDelete from "../../hooks/forum/comments/useCommentDelete";
import useWhoAmI from "../../hooks/user/useWhoAmI";
import NavigateButton from "../ui/buttons/NavigateButton";
import LikeButton from "./micro/LikeButton";

const Comment = ({ comment }) => {
  const { username } = useWhoAmI();
  const navigate = useNavigate();

  // const [editable, setEditable] = useState(false);
  const { deleteComment } = useCommentDelete();

  // const toggleEdit = () => {
  //   setEditable(!editable);
  // };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteComment(comment.id);
    }
  };

  return (
    <div className="bg-white border rounded p-2 mb-2">
      <div className="card-body">
        <div
          role="button"
          onClick={() => navigate(`/profile/${comment.username}`)}
        >
          <h5 className="mb-0 me-2 text-primary">
            <img
              width={40}
              height={40}
              alt={`${comment.username}'s avatar`}
              src={comment.avatar}
              className="me-2"
            />
            {comment.username}
          </h5>
        </div>
        <p className="post-content p-2">{comment.content}</p>
        <p className="card-text float-start">
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
              <BsTrash3 /> Delete
            </Button>
          </>
        ) : (
          <NavigateButton
            path="/report"
            variant="danger"
          >
            <BsExclamationTriangleFill /> Report
          </NavigateButton>
        )}
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
