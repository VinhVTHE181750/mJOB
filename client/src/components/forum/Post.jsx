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

const Post = ({ post_id }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const navigate = useNavigate();
  const { post, loading, error } = usePostDetail(post_id);
  const { deletePost } = usePostDelete();
  const { userId } = useContext(AuthContext);
 
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const handleLike = () => {
    // if already liked, remove like
    // if disliked, remove dislike and add like
    // if not liked, add like
    if(liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      if(disliked) {
        setDisliked(false);
        setDislikes(dislikes - 1);
      }
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  const handleDislike = () => {
    // if already disliked, remove dislike
    // if liked, remove like and add dislike
    // if not disliked, add dislike
    if(disliked) {
      setDisliked(false);
      setDislikes(dislikes - 1);
    } else {
      if(liked) {
        setLiked(false);
        setLikes(likes - 1);
      }
      setDisliked(true);
      setDislikes(dislikes + 1);
    }
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
      <Row className="post-title mt-2">
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

      <Row className="mt-2">
        <Row>
          <div className="border">{post.post_content}</div>
        </Row>
        <Row>
          {/* Add a like button */}
          <div className="d-flex justify-content-end mt-2 gap-2">
            <Button variant={liked ? "success" : "outline-success"} onClick={() => handleLike()}>
              {likes} 👎
            </Button>
            <Button variant={disliked ? "danger" : "outline-danger"} onClick={() => handleDislike()}>
              {dislikes} 👍
            </Button>
          </div>
        </Row>
      </Row>
    </div>
  );
};

export default Post;