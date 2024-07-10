// import usePostsQuery from "../../hooks/forum/posts/usePostsQuery";
import { Form, Pagination } from "react-bootstrap";
import "../../assets/css/Forum.css";
import { useNavigate } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import PostCard from "./PostCard";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../../store/reducers/postsReducer";
import { fetchCategories } from "../../store/reducers/postCategoriesReducer";

// ...

const ListPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const categories = useSelector((state) => state.postCategories.categories);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
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
          category={categories.find(category => category.id === post.PostCategoryId)}
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
            onChange={handleSize}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default ListPost;
