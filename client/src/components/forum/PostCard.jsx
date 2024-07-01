import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getMoment } from "../../functions/Converter";
import { useState } from "react";

const PostCard = ({ post, onClick }) => {
  const [likes] = useState(20);
  const [dislikes] = useState(2);
  const [comments] = useState(5);
  const [views] = useState(100);
  return (
    <Card className="post-card" key={post.id} onClick={onClick}>
      <Card.Body>
        <Card.Title as="h2" className="post-card-title">
          {post.post_title}
          <Card.Text
            className="ms-2"
            style={{ textAlign: "right", float: "right", fontSize: "small" }}
          >
            {views} <span>👁</span> {/* UPDATE */}
          </Card.Text>
          <Card.Text
            className="ms-2"
            style={{ textAlign: "right", float: "right", fontSize: "small" }}
          >
            {comments} <span>💬</span> {/* UPDATE */}
          </Card.Text>
          <Card.Text
            className="ms-2"
            style={{ textAlign: "right", float: "right", fontSize: "small" }}
          >
            {likes - dislikes} <span>👎👍</span> {/* UPDATE */}
          </Card.Text>
        </Card.Title>
        <Card.Text className="post-card-content">{post.post_content}</Card.Text>

        <Link
          to={`/users/${post.author}`}
          className="card-author"
          data-toggle="tooltip"
          title={`Author: ${post.author}`}
          onClick={(e) => e.stopPropagation()}
        >
          {post.username}
        </Link>
        <Card.Text style={{ textAlign: "right", fontSize: "small" }}>
          {getMoment(post.updatedAt)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PostCard;