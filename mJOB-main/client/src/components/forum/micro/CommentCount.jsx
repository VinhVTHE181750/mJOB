import Skeleton from "react-loading-skeleton";
import useCommentCount from "../../../hooks/forum/comments/useCommentCount";

const CommentCount = ({ postId }) => {
  const { comment, loading } = useCommentCount(postId);

  if (loading)
    return (
      <div
        className="ms-2"
        style={{ textAlign: "right", float: "right", fontSize: "small" }}
      >
        <span>
          <Skeleton inline/> 💬
        </span>
      </div>
    );


  return (
    <div
      className="ms-2"
      style={{ textAlign: "right", float: "right", fontSize: "small" }}
    >
      <span>{comment || 0}</span>
      <span> 💬</span>
    </div>
  );
};

export default CommentCount;
