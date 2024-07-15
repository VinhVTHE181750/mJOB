import PropTypes from "prop-types";
import avatar from "../../assets/img/default_avatar.webp";
import { getMoment } from "../../functions/Converter";
import { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import NavigateButton from "../ui/buttons/NavigateButton";
// import { useDispatch, useSelector } from "react-redux";
// import { deletePost, fetchPost } from "../../store/reducers/forum/postReducer";
import usePostDetail from "../../hooks/forum/posts/usePostDetail";
import Skeleton from "react-loading-skeleton";

const Post = ({ id }) => {
  // post related data
  // external userId
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const post = useSelector((state) => state.post.post);
  const { post, loading, error } = usePostDetail(id);

  // useEffect(() => {
  //   dispatch(fetchPost(id));
  // }, [dispatch, id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleLike = (isLike) => {
    const msg = isLike ? "You liked this post." : "You disliked this post.";
    console.log(msg);
  };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post? "
    );
    if (confirmDelete) {
      // dispatch(deletePost(id));
      navigate("/forum");
    }
  };

  if (error) {
    return (
      <>
        <h3>Something went wrong while fetching the post.</h3>
        <NavigateButton
          path="/report"
          text="Report this problem"
          variant="danger"
        />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <div className="post">
          <Row className="post-title">
            <Col sm={2}>
              <div className="border">
                <div>
                  <img className="avatar" src={avatar} alt="Default Avatar" />
                </div>
                <Skeleton width={100} height={20} />
                <div>
                  <p className="text-center">
                    <Skeleton width={100} height={20} />
                  </p>
                </div>
              </div>
            </Col>
            <Col sm={10}>
              <Row className="mx-5">
                <Skeleton width={300} height={20} />
              </Row>
              <Skeleton width={100} height={20} />
            </Col>
          </Row>
          <Row className="ms-2 mt-2">
            <Row>
              <Skeleton height={200} />
            </Row>
            <Row>
              {/* Add a like button */}
              <div className="d-flex justify-content-end mt-2 gap-2">
                <Skeleton width={100} height={20} />
                <Skeleton width={100} height={20} />
              </div>
            </Row>
          </Row>
        </div>
      </>
    );
  }

  return (
    <div className="post">
      <Row className="post-title">
        <Col sm={2}>
          <div className="border">
            <div>
              <img className="avatar" src={avatar} alt="Default Avatar" />
            </div>
            <Link to={`/users/${post.author}`}>{post.author}</Link>
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
                post.liked
                  ? post.isDislike
                    ? "danger"
                    : "outline-danger"
                  : "secondary"
                // "secondary"
              }
              onClick={() => handleLike(false)}
            >
              {post.dislikes} 👎
            </Button>
            <Button
              variant={
                post.liked
                  ? !post.isDislike
                    ? "success"
                    : "outline-success"
                  : "secondary"
                // "secondary"
              }
              onClick={() => handleLike(true)}
            >
              {post.likes} 👍
            </Button>
          </div>
        </Row>
      </Row>
    </div>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Post;
