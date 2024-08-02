import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { BsChatSquare, BsEyeFill, BsHandThumbsDownFill, BsHandThumbsUpFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ForumContext } from "../../context/ForumContext";
import { getMoment } from "../../functions/Converter";
import Category from "./micro/Category";
import Count from "./micro/InteractionCount";
import Tag from "./micro/Tag";
import avatar from "../../assets/img/default_avatar.webp";

const PostCard = ({ post, onClick, category }) => {
  const { addTag, setCategory } = useContext(ForumContext);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // if tags contains , split it
    if (post.tags) {
      setTags(post.tags.split(","));
    } else {
      setTags([]);
    }
  }, [post]);

  // const [likes, setLikes] = useState(0);
  // const [dislikes, setDislikes] = useState(0);
  const [likesDelta, setLikesDelta] = useState(0);

  useEffect(() => {
    setLikesDelta(post.likes - post.dislikes);
    // // console.log(likes, dislikes);
  }, [post]);

  return (
    <Card
      className="post-card"
      key={post.id}
      onClick={onClick}
    >
      <Card.Body>
        <Card.Subtitle className="fs-5">
          {category && (
            <Category
              category={category}
              handler={setCategory}
            />
          )}
          <span>
            <Count
              count={post.views}
              icon={<BsEyeFill />}
            />
            <Count
              count={post.comments}
              icon={<BsChatSquare color="black" />}
            />
            <Count
              count={likesDelta}
              icon={
                <>
                  <BsHandThumbsUpFill color="green" /> <BsHandThumbsDownFill color="red" />
                </>
              }
            />
          </span>
        </Card.Subtitle>

        <Card.Title className="fs-1 fw-bolder mb-2">{post.title}</Card.Title>
        <Card.Text className="fs-6">
          {tags.map((tag) => (
            <Tag
              key={tag}
              tag={tag}
              handler={(tag) => addTag(tag)}
            />
          ))}
        </Card.Text>
        <Card.Text className="post-card-content">{post.content}</Card.Text>

        <Link
          to={`/profile/${post.UserId}`}
          className="card-author"
          data-toggle="tooltip"
          title={`Author: ${post.author}`}
          onClick={(e) => e.stopPropagation()}
        >
          {post.avatar ? (
            <img
              className="align-middle me-2"
              src={post.avatar}
              alt={`${post.author}'s avatar`}
              width={24}
              height={24}
            />
          ) : (
            <img
              className="align-middle me-2"
              src={avatar}
              alt="Default avatar"
              style={{ width: "1.5em", height: "1.5em", borderRadius: "50%" }}
            />
          )}
          {post.author}
        </Link>
        <Card.Text style={{ textAlign: "right", fontSize: "small" }}>{getMoment(post.updatedAt)}</Card.Text>
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
