import { getMoment } from "../../functions/Converter";
import avatar from "../../assets/img/default_avatar.webp";
import usePostDetail from "../../hooks/forum/posts/usePostDetail";
import { Link, useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import NavigateButton from "../ui/buttons/NavigateButton";
import usePostDelete from "../../hooks/forum/posts/usePostDelete";
import { AuthContext } from "../../context/AuthContext";
import Skeleton from "react-loading-skeleton";
import useLikesQuery from "../../hooks/forum/likes/useLikesQuery";
import useLikesUpdate from "../../hooks/forum/likes/useLikesUpdate";
import useIsLiked from "../../hooks/forum/likes/useIsLiked";

const Post = ({ post_id }) => {
  // post related data
  // external userId
  const { userId } = useContext(AuthContext);
  const { post, loading, error } = usePostDetail(post_id);
  const navigate = useNavigate();
  const { deletePost } = usePostDelete();

  // external like state, whether if it is like or dislike
  const { liked } = useIsLiked(userId, post_id, null);

  // external likes counter
  const { likes, dislikes } = useLikesQuery(post_id, null);

  // external dislike state (not implemented)
  const [isDislike, setIsDislike] = useState(false);

  // external like update function
  // const { updateLikes } = usePostLikesUpdate(post_id, userId, isDislike);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleLike = (isDislike) => {
    updateLikes(isDislike);
  };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post? " + post_id
    );
    if (confirmDelete) {
      deletePost(post_id);
      navigate("/forum");
    }
  };

  if (loading) return <Container className="post"></Container>;

  return (
    <div className="post">
      <Row className="post-title">
        <Col sm={2}>
          <div className="border">
            <div>
              <img className="avatar" src={avatar} alt="Default Avatar" />
            </div>
            <Link to={`/users/${post.username}`}>{post.username}</Link>
            <div>
              <p className="text-center">{getMoment(post.post_updated_time)}</p>
            </div>
          </div>
        </Col>
        <Col sm={10}>
          <Row>
            <h1>{post.post_title} </h1>
          </Row>

          {post.user_id == userId && (
            <>
              <NavigateButton
                path={`/forum/edit/${post_id}`}
                text="Edit"
                variant="primary"
                className="me-2"
              />
              <Button variant="danger" onClick={() => handleDeletePost()}>
                Delete
              </Button>
            </>
          )}
        </Col>
      </Row>
      <Row className="ms-2 mt-2">
        <Row>
          <div className="border">{post.post_content}</div>
        </Row>
        <Row>
          {/* Add a like button */}
          <div className="d-flex justify-content-end mt-2 gap-2">
            <Button
              variant={
                liked ? (isDislike ? "danger" : "outline-danger") : "secondary"
              }
            >
              {dislikes} 👎
            </Button>
            <Button
              variant={
                liked
                  ? !isDislike
                    ? "success"
                    : "outline-success"
                  : "secondary"
              }
            >
              {likes} 👍
            </Button>
          </div>
        </Row>
      </Row>
    </div>
  );
};

export default Post;
