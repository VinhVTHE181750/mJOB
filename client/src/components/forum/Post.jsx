import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/img/default_avatar.webp";
import { getMoment } from "../../functions/Converter";
import NavigateButton from "../ui/buttons/NavigateButton";
// import { useDispatch, useSelector } from "react-redux";
// import { deletePost, fetchPost } from "../../store/reducers/forum/postReducer";
import { BsExclamation, BsPencilFill, BsTrash3 } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import useLikesUpdate from "../../hooks/forum/likes/useLikesUpdate";
import usePostDelete from "../../hooks/forum/posts/usePostDelete";
import usePostDetail from "../../hooks/forum/posts/usePostDetail";
import useWhoAmI from "../../hooks/user/useWhoAmI";
import socket from "../../socket";
import LikeButton from "./micro/LikeButton";
import Tag from "./micro/Tag";
import Category from "./micro/Category";
import { ForumContext } from "../../context/ForumContext";
import useCommentInsert from "../../hooks/forum/comments/useCommentInsert";
import ListComment from "./ListComment";

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
  const { categoryOf } = useContext(ForumContext);

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

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post? ");
    if (confirmDelete) {
      // dispatch(deletePost(id));
      deletePost(id);
      navigate("/forum");
    }
  };

  const [comment, setComment] = useState("");
  const { insertComment } = useCommentInsert();

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    insertComment(comment, Number(id));
    setComment("");
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  if (error) {
    if (error.response.status === 404) {
      return (
        <div className="text-center">
          <h3>Post not found</h3>
        </div>
      );
    } else {
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
  }

  if (loading) {
    return (
      <Container className="rounded">
        <Row className="flex flex-row-reverse bg-white border border-info rounded p-2">
          <Col>
            <Skeleton
              height={30}
              width={300}
            />
          </Col>
          <Col sm="auto">
            <Skeleton
              circle={true}
              height={50}
              width={50}
            />
          </Col>
        </Row>
        <Row className="mt-2 border rounded border-info bg-white">
          <Col>
            <Skeleton count={5} />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col
            xs={12}
            sm={3}
            className="bg-white rounded border border-success"
          >
            <div className="d-flex justify-content-center">
              <Skeleton
                circle={true}
                height={100}
                width={100}
              />
            </div>
            <Skeleton
              height={30}
              width={100}
            />
          </Col>
          <Col>
            <Skeleton
              width={80}
              height={20}
            />
          </Col>
          <Col sm="auto pe-0">
            <Skeleton
              width={80}
              height={40}
              className="me-2"
            />
            <Skeleton
              width={80}
              height={40}
              className="me-2"
            />
          </Col>
        </Row>
      </Container>
    );
  }

  if (!post) {
    return <h3 className="text-center">Post not found</h3>;
  }

  return (
    <Container className="rounded">
      <Row className="flex flex-row-reverse bg-white border border-info rounded p-2">
        <Col>
          <h2 className="text-center">{post.title}</h2>
        </Col>
        <Col sm="auto">
          <Category category={categoryOf(post.id)} />
        </Col>
      </Row>
      <Row className="mt-2 border rounded border-info bg-white">
        <Col>
          <pre className="text-wrap">{post.content}</pre>
        </Col>
      </Row>
      <Row className="mt-2 mb-5">
        <Col
          xs={12}
          sm={3}
          className="bg-white rounded border border-success"
        >
          <div
            role="button"
            onClick={() => navigate(`/profile/${post.author}`)}
          >
            <div className="d-flex justify-content-center">
              <img
                src={post.avatar || avatar}
                alt="avatar"
                width={100}
                height={100}
              />
            </div>
            <h5 className="text-center text-primary pointer">{post.author}</h5>
          </div>
          <p className="text-center">Last update: {getMoment(post.updatedAt)}</p>
        </Col>
        <Col>
          <Tag tag="tag1" />
        </Col>
        <Col sm="auto pe-0">
          <LikeButton
            id={Number(id)}
            type="post"
            action="like"
            count="{post.likes}"
            className="me-2"
          />
          <LikeButton
            id={Number(id)}
            type="post"
            action="dislike"
            count="{post.dislikes}"
            className="me-2"
          />
          {username === post.author && (
            <>
              <NavigateButton
                path={`/forum/edit/${id}`}
                variant="primary"
                className="me-2"
              >
                <BsPencilFill /> Edit
              </NavigateButton>
              <Button
                variant="danger"
                onClick={() => handleDeletePost()}
              >
                <BsTrash3 /> Delete
              </Button>
            </>
          )}
        </Col>
      </Row>

      <ListComment id={Number(post.id)} />

      {/* Comment Form */}
      <FloatingLabel
        controlId="floatingTextarea"
        label="Add a comment"
      >
        <Form.Control
          as="textarea"
          value={comment}
          onChange={handleCommentChange}
          placeholder="Leave a comment here"
          className="border border-info"
          size="lg"
        />
        <Button
          variant="primary"
          className="mt-2 mb-2"
          onClick={handleCommentSubmit}
        >
          Submit
        </Button>
      </FloatingLabel>
    </Container>
  );
};

Post.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Post;
