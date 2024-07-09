import usePostsQuery from "../../hooks/forum/posts/usePostsQuery";
import { Pagination } from "react-bootstrap";
import "../../assets/css/Forum.css";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostCard from "./PostCard";
import { useState } from "react";

// ...

const ListPost = () => {
  const navigate = useNavigate();
  const { posts, loading, error } = usePostsQuery();

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

  if (loading) {
    return (
      <>
        {Array.from({ length: postsPerPage }, (_, index) => (
          <Skeleton key={index} height={160} className="mt-2" />
        ))}
      </>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {currentPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onClick={() => navigate(`/posts/${post.id}`)}
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
    </div>
  );
};

export default ListPost;
