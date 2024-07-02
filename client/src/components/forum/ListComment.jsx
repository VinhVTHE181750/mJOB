import useCommentsQuery from "../../hooks/forum/comments/useCommentsQuery";
import { Form, Button, Card, Pagination, Row } from "react-bootstrap";
import "../../assets/css/Forum.css";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

// ...

const ListComment = ({ post_id }) => {
  const navigate = useNavigate();
  const { comments, loading, error } = useCommentsQuery(post_id);
  const { userId } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage, setCommentsPerPage] = useState(4);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(comments.length / commentsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/login");
  };


  if (loading) {
    return (
      <>
        <Skeleton height={50} count={0.2} className="mt-2" />
        <Skeleton height={160} className="mt-2" />
        <Skeleton height={160} className="mt-2" />
        <Skeleton height={160} className="mt-2" />
        <Skeleton height={160} className="mt-2" />
        <Skeleton height={160} className="mt-2" />
      </>
    );
  }

  if (error) {
    if (error.response.status === 404) {
      return (
        <>
          <h3>No comments found.</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Leave a comment</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>
      );
    } else {
      return <h3>Something went wrong while fetching the comments.</h3>;
    }
  }

  return (
    <div className="">
      {comments.length === 0 && (
        <h3>Be the first to leave a comment on this post!</h3>
      )}
      {currentComments.map((comment) => (
        <div className="mt-2 border" key={comment.comment_id}>
          {comment.comment_content}
          <div>Author: {comment.username}</div>
          {comment.comment_id === userId ? (
            <>
              <Button className="mt-2">Edit</Button>
              <Button variant="danger" className="mt-2">
                Delete
              </Button>
            </>
          ) : (
            <Button variant="danger">Report</Button>
          )}
        </div>
      ))}
      <Pagination className="justify-content-center mt-4">
        {pageNumbers.map((number) => (
          <Pagination.Item
            key={number}
            onClick={() => paginate(number)}
            active={number === currentPage}
          >
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Leave a comment</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default ListComment;
