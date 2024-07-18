import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/img/default_avatar.webp";
import { getMoment } from "../../functions/Converter";
import NavigateButton from "../ui/buttons/NavigateButton";
// import { useDispatch, useSelector } from "react-redux";
// import { deletePost, fetchPost } from "../../store/reducers/forum/postReducer";
import { BsExclamation } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import useLikesUpdate from "../../hooks/forum/likes/useLikesUpdate";
import usePostDelete from "../../hooks/forum/posts/usePostDelete";
import usePostDetail from "../../hooks/forum/posts/usePostDetail";
import useWhoAmI from "../../hooks/user/useWhoAmI";
import socket from "../../socket";
import LikeButton from "./micro/LikeButton";

const Post = ({ id }) => {
  // post related data
  // external userId
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const post = useSelector((state) => state.post.post);
  // const { post, loading, error } = usePostDetail(id);
  const { updateLikes } = useLikesUpdate();
  const { username } = useWhoAmI();
  const { deletePost } = usePostDelete();

  // useEffect(() => {
  //   dispatch(fetchPost(id));
  // }, [dispatch, id]);

  // const navigate = useNavigate();
  const [refreshFlag, setRefreshFlag] = useState(false); // Add this line
  const { post, loading, error } = usePostDetail(id, refreshFlag); // Modify to pass refreshFlag as a dependency

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const eventName = `forum/post/${id}`;
    const handlePostUpdate = () => {
      setRefreshFlag((prevFlag) => !prevFlag); // Toggle refreshFlag to trigger re-fetch
    };

    socket.on(eventName, handlePostUpdate);

    return () => {
      socket.off(eventName, handlePostUpdate);
    };
  }, [id]);

  const handleLike = (isLike) => {
    updateLikes("post", id, isLike);
  };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post? ");
    if (confirmDelete) {
      // dispatch(deletePost(id));
      deletePost(id);
      navigate("/forum");
    }
  };

  if (error) {
    return (
      <>
        <h3 className="text-center">Something went wrong while fetching the post.</h3>
        <div className="d-flex align-items-center justify-content-center">
          <NavigateButton
            path="/report"
            text="Report this problem"
            variant="danger"
            icon={<BsExclamation />}
          />
        </div>
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
                  <Skeleton
                    circle={true}
                    height={50}
                    width={50}
                  />
                </div>
                <Skeleton
                  width={100}
                  height={20}
                />
                <div>
                  <p className="text-center">
                    <Skeleton
                      width={100}
                      height={20}
                    />
                  </p>
                </div>
              </div>
            </Col>
            <Col sm={10}>
              <Row className="mx-5">
                <Skeleton
                  width={300}
                  height={30}
                />
              </Row>
              <Row className="mx-5 mt-2">
                <Skeleton
                  width={250}
                  height={20}
                />
              </Row>
            </Col>
          </Row>
          <Row className="ms-2 mt-2">
            <Row>
              <Skeleton height={200} />
            </Row>
            <Row>
              <div className="d-flex justify-content-end mt-2 gap-2">
                <Skeleton
                  width={100}
                  height={40}
                />
                <Skeleton
                  width={100}
                  height={40}
                />
              </div>
            </Row>
          </Row>
        </div>
      </>
    );
  }

  if (!post) {
    return <h3 className="text-center">Post not found</h3>;
  }

  return (
    <div className="post">
      <Row className="post-title">
        <Col sm={2}>
          <div className="border border-success">
            <div>
              <img
                className="avatar"
                src={avatar}
                alt="Default Avatar"
              />
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
          {username === post.author && (
            <>
              <NavigateButton
                path={`/forum/edit/${id}`}
                text="Edit"
                variant="primary"
                className="me-2"
              />
              <Button
                variant="danger"
                onClick={() => handleDeletePost()}
              >
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
            <LikeButton
              id={Number(id)}
              type="post"
              action="like"
              count={post.likes}
            />
            <LikeButton
              id={Number(id)}
              type="post"
              action="dislike"
              count={post.dislikes}
            />
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
