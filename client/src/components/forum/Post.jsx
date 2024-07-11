import PropTypes from "prop-types";
import {getMoment} from "../../functions/Converter";
import avatar from "../../assets/img/default_avatar.webp";
import usePostDetail from "../../hooks/forum/posts/usePostDetail";
import {Link, useNavigate} from "react-router-dom";
import {Button, Col, Row} from "react-bootstrap";
import {useContext, useEffect} from "react";
import NavigateButton from "../ui/buttons/NavigateButton";
import usePostDelete from "../../hooks/forum/posts/usePostDelete";
import {AuthContext} from "../../context/AuthContext";
import Skeleton from "react-loading-skeleton";
import useLikesQuery from "../../hooks/forum/likes/useLikesQuery";
import useIsLiked from "../../hooks/forum/likes/useIsLiked";

const Post = ({ id }) => {
  // post related data
  // external userId
  const { userId } = useContext(AuthContext);
  const { post, loading, error } = usePostDetail(id);
  const navigate = useNavigate();
  const { deletePost } = usePostDelete();

  // external like state, whether if it is like or dislike
  const { liked, isDislike } = useIsLiked(userId, id, null);

  // external likes counter
  const { likes, dislikes } = useLikesQuery(id, null);

  // external like update function
  // const { updateLikes } = usePostLikesUpdate(id, userId, isDislike);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // const handleLike = (isDislike) => {
  //   updateLikes(isDislike);
  // };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post? "
    );
    if (confirmDelete) {
      deletePost(id);
      navigate("/forum");
    }
  };

  if (loading)
    return (
      <div className="post">
        <Row className="post-title">
          <Col sm={2}>
            <div className="border">
              <div>
                <Skeleton
                  className="mt-5"
                  height={100}
                  width={100}
                  circle={true}
                />
              </div>
              <div>
                <Skeleton count={0.5} className="mt-5" />
              </div>
              <div>
                <p className="text-center mx-5">
                  <Skeleton />
                </p>
              </div>
            </div>
          </Col>
          <Col sm={10}>
            <Row className="mx-5">
              <h1>
                <Skeleton count={1.2} />
              </h1>
            </Row>
          </Col>
        </Row>
        <Row className="ms-2 mt-4">
          <Row>
            <div className="border">
              <Skeleton count={3.5} />
            </div>
          </Row>
        </Row>
      </div>
    );

  if (error) {
    if (error.response.status === 404) {
      return <h3>Post not found.</h3>;
    } else {
      return (
        <>
          <h3>Something went wrong while fetching the post.</h3>
          <NavigateButton path="/report" text="Report this problem" variant="danger" /> 
        </>
      );
    }
  }

  return (
    <div className="post">
      <Row className="post-title">
        <Col sm={2}>
          <div className="border">
            <div>
              <img className="avatar" src={avatar} alt="Default Avatar" />
            </div>
            <Link to={`/users/${post.username}`}>#AUTHOR</Link>
            <div>
              <p className="text-center">{getMoment(post.updatedAt)}</p>
            </div>
          </div>
        </Col>
        <Col sm={10}>
          <Row className="mx-5">
            <h1>{post.title} </h1>
          </Row>

          {post.UserId == 1 && (
            <>
              <NavigateButton
                path={`/forum/edit/${id}`}
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
          <div className="border mt-4">{post.content}</div>
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

Post.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Post;
