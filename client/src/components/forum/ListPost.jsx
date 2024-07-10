import usePostsQuery from "../../hooks/forum/posts/usePostsQuery";
import { Pagination } from "react-bootstrap";
import "../../assets/css/Forum.css";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostCard from "./PostCard";
import { useContext, useEffect, useState } from "react";
import { ForumContext } from "../../context/ForumContext";

// ...

const ListPost = () => {
  const navigate = useNavigate();
  const { posts, loading, error } = useContext(ForumContext);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  return () => {
    <>
    </>
  }
};

export default ListPost;
