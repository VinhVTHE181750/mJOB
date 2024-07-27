import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getMoment } from "../../functions/Converter";
import { useEffect, useState } from "react";
import ViewCount from "./micro/ViewCount";
import CommentCount from "./micro/CommentCount";
import LikeCount from "./micro/LikeCount";
import useCategories from "../../hooks/forum/categories/useCategories";
import Skeleton from "react-loading-skeleton";

const PostCard = ({ post, onClick }) => {
  const [likes] = useState(0);
  const [dislikes] = useState(0);
  const [comments] = useState(0);

  const { getCategory } = useCategories();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      const categoryData = await getCategory(post.PostCategoryId);
      setCategory(categoryData);
    };

    fetchCategory();
  }, []);

  return (
    <Card className="post-card" key={post.id} onClick={onClick}>
      <Card.Body>
        <Card.Subtitle className="fs-5">
        {category ? (
          <div
            className=""
            style={{
              backgroundColor: `#${category.bgColor}`,
              color: `#${category.fgColor}`,
              borderRadius: "5px",
              padding: "5px",
              width: "fit-content",
            }}
          >
            {category.name}
          </div>
        ) : (
          <div><Skeleton count={0.2}/></div>
        )}
          <span>
            <ViewCount id={post.id} />
            <CommentCount id={post.id} />
            <LikeCount postId={post.id} />
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

export default PostCard;
