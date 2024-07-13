// import usePostsQuery from "../../hooks/forum/posts/usePostsQuery";
import {Form, Pagination} from "react-bootstrap";
import "../../assets/css/Forum.css";
import {useNavigate} from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import PostCard from "./PostCard";
import {useContext, useEffect, useState} from "react";
import {ForumContext} from "../../context/ForumContext";

// ...

const ListPost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const { posts, categoryOf } = useContext(ForumContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (postsPerPage * currentPage > posts.length) {
      let cPage = Math.ceil(posts.length / postsPerPage);
      if (cPage > 0) setCurrentPage(cPage);
    }
  }, [postsPerPage, posts.length, currentPage]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSize = (e) => {
    if (!e.target.value || e.target.value < 1) return;
    setPostsPerPage(e.target.value);
  };

  return (
    <div>
      {currentPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onClick={() => navigate(`/posts/${post.id}`)}
          category={categoryOf(post.id)}
        />
      ))}
      <Pagination className="justify-content-center mt-2">
        {pageNumbers.map((number) => (
          <Pagination.Item
            className="px-0"
            key={number}
            onClick={() => paginate(number)}
            active={number === currentPage}
          >
            {number}
          </Pagination.Item>
        ))}
      </Pagination>
      <Form>
        <Form.Group controlId="postsPerPage">
          <Form.Label>Posts per page</Form.Label>
          <Form.Control
            type="number"
            value={postsPerPage}
            max={posts.length}
            min={4}
            onChange={handleSize}
          />
        </Form.Group>
      </Form>
      <p>
        Showing {indexOfFirstPost + 1} - {indexOfLastPost} ({postsPerPage}) of{" "}
        {posts.length} posts. Current page {currentPage} of{" "}
        {Math.ceil(posts.length / postsPerPage)}.
      </p>
    </div>
  );
};

export default ListPost;
