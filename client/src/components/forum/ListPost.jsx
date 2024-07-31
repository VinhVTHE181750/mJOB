// import usePostsQuery from "../../hooks/forum/posts/usePostsQuery";
import { useContext, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Forum.css";
import { ForumContext } from "../../context/ForumContext";
import PostCard from "./PostCard";

// ...

const ListPost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
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

  const paginate = (pageNumber) => {
    // move to top
    // window.scrollTo(0, 0);
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // const handleSize = (e) => {
  //   if (!e.target.value || e.target.value < 1) return;
  //   setPostsPerPage(e.target.value);
  // };

  if (!posts)
    return (
      <Skeleton
        count={4}
        height={200}
      />
    );

  return (
    <div>
      {currentPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onClick={() => navigate(`/forum/posts/${post.id}`)}
          category={categoryOf(post.id)}
        />
      ))}

      <p>
        Showing {indexOfFirstPost + 1} - {indexOfLastPost > posts.length ? posts.length : indexOfLastPost} of {posts.length} posts.
      </p>
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
