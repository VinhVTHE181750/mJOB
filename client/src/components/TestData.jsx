import { Card } from "react-bootstrap";
import "../assets/css/Forum.css";
import { getMoment } from "../functions/Converter";
import useMarketContent from "../hooks/useMarketContent.js";

const ListContent = () => {
  const {contents, loading, error } = useMarketContent();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {contents.map((marketcontent) => (
        <Card className="post-card" key={marketcontent.id}>
          
            <Card.Body>
              <Card.Title as="h2" style={{ color: "blue" }}>
                {marketcontent.topic}
              </Card.Title>
              <Card.Text className="post-card-content">
                {marketcontent.content}
              </Card.Text>
              <Card.Link
                href={`/users/${marketcontent.author}`}
                className="post-author"
                data-toggle="tooltip"
                title={`Author: ${marketcontent.author}`}
                onClick={(e) => e.stopPropagation()}
              >
                {marketcontent.author}
              </Card.Link>
              <Card.Text
                className="post-card-content"
                style={{ textAlign: "right", fontSize: "small" }}
              >
                {getMoment(marketcontent.created_timestamp)}
              </Card.Text>
            </Card.Body>
       
        </Card>
      ))}
    </div>
  );
};

export default ListContent;
