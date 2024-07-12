import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getMoment} from "../../functions/Converter";
import Category from "./micro/Category";
import PropTypes from "prop-types";
import Tag from "./micro/Tag";
import Count from "./micro/InteractionCount";
import {useContext} from "react";
import {ForumContext} from "../../context/ForumContext";

const PostCard = ({ post, onClick, category, handler }) => {

  const { addTag } = useContext(ForumContext);
  const tags = post.tags.split(",");
  return (
    <Card className="post-card" key={post.id} onClick={onClick}>
      <Card.Body>
        <Card.Subtitle className="fs-5">
          {category && <Category category={category} />}
          <span>
            <Count count={100} icon="👀" />
            <Count count={11} icon="💬" />
            <Count count={25} icon="👎👍" />
          </span>
        </Card.Subtitle>

        <Card.Title className="fs-1 fw-bolder mb-2">{post.title}</Card.Title>
        <Card.Text className="fs-6">
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} handler={(tag) => addTag(tag)} />
          ))}
        </Card.Text>
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
  category: PropTypes.object,
  handler: PropTypes.func,
};

export default PostCard;
