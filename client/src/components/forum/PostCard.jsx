import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getMoment} from "../../functions/Converter";
import {useState} from "react";
import ViewCount from "./micro/ViewCount";
import CommentCount from "./micro/CommentCount";
import LikeCount from "./micro/LikeCount";

const PostCard = ({post, onClick}) => {
    const [likes] = useState(0);
    const [dislikes] = useState(0);
    const [comments] = useState(0);
    return (
        <Card className="post-card" key={post.id} onClick={onClick}>
            <Card.Body>
                <Card.Title as="h2" className="post-card-title">
                    {post.title}
                    <ViewCount id={post.id}/>
                    <CommentCount id={post.id}/>
                    <LikeCount postId={post.id}/>
                </Card.Title>
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
                <Card.Text style={{textAlign: "right", fontSize: "small"}}>
                    {getMoment(post.updatedAt)}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default PostCard;