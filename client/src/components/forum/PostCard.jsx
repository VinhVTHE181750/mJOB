import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getMoment } from "../../functions/Converter";
import Category from "./micro/Category";
import PropTypes from "prop-types";

const PostCard = ({ post, onClick, category }) => {
  return (
    <Card className="post-card" key={post.id} onClick={onClick}>
      <Card.Body>
        <Card.Subtitle className="fs-5">
          <Category category={category} />
          <span>
            {/* <ViewCount id={post.id} />
            <CommentCount id={post.id} />
            <LikeCount postId={post.id} /> */}
          </span>
        </Card.Subtitle>

        <Card.Title className="fs-3">{post.title}</Card.Title>
        <Card.Text className="fs-6">#tag #tag2 #tag3</Card.Text>
        <Card.Text className="post-card-content">{post.content}</Card.Text>

        <Link
          to={`/users/${post.author}`}
          className="card-author"
          data-toggle="tooltip"
          title={`Author: ${post.author}`}
          onClick={(e) => e.stopPropagation()}
        >
          #AUTHOR
        </Link>
        <Card.Text style={{ textAlign: "right", fontSize: "small" }}>
          {getMoment(post.updatedAt)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};


export default PostCard;
