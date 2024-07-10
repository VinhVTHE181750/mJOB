import Skeleton from "react-loading-skeleton";
import useLikesQuery from "../../../hooks/forum/likes/useLikesQuery";

const LikeCount = ({ postId }) => {
  const { likes, dislikes, loading } = useLikesQuery(postId);
  const diff = likes - dislikes;

  if (loading)
    return (
      <div
        className="ms-2"
        style={{ textAlign: "right", float: "right", fontSize: "small" }}
      >
        <span>
          <Skeleton inline/> 👍
        </span>
      </div>
    );

  return (
    <div
      className="ms-2"
      style={{ textAlign: "right", float: "right", fontSize: "small" }}
    >
      <span>{diff || 0}</span>
      <span> 👍</span>
    </div>
  );
};

export default LikeCount;
