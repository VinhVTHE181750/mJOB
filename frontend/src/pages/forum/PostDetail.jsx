import React from "react";
import { Link, useParams } from "react-router-dom";
import usePostDetail from "../../hooks/usePostDetail.js";
import { Button, Row, Col } from "react-bootstrap";
import "../../assets/css/Forum.css";
import { getMoment } from "../../functions/Converter.js";
import avatar from "../../assets/img/default_avatar.webp";


const PostDetail = () => {
  const { id } = useParams();
  const { post, loading, error } = usePostDetail(id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="forum-body">
      <Button href="/forum" className="forum-button">
        Back to Forum
      </Button>

      <div className="post">
        <div className="post-title">
          <h1>{post.title}</h1>
        </div>
        <div className="d-flex gap-2">
          <div className="post-author">
            <div><img className="avatar" src={avatar} alt="Default Avatar" /></div>
            <div><Link to={`/users/${post.author}`}>{post.author}</Link></div>
            <div><p>{getMoment(post.created_timestamp)}</p></div>
          </div>
          <div className="post-content flex-grow">
            <p>{post.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
