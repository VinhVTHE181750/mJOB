import Skeleton from "react-loading-skeleton";
import useViewCount from "../../../hooks/forum/posts/useViewCount";

const ViewCount = ({ postId }) => {
  const { view, loading } = useViewCount(postId);

  if (loading)
    return (
      <div
        className="ms-2"
        style={{ textAlign: "right", float: "right", fontSize: "small" }}
      >
        <span>
          <Skeleton inline /> 👀
        </span>
      </div>
    );

  return (
    <div
      className="ms-2"
      style={{ textAlign: "right", float: "right", fontSize: "small" }}
    >
      <span>{view || 0}</span>
      <span> 👀</span>
    </div>
  );
};

export default ViewCount;
