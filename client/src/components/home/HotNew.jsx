import React from 'react';
import useNewsContent from "../../hooks/useNewsContent.js";
import {getMoment} from "../../functions/Converter.js";
import {Card} from "react-bootstrap";

function HotNew() {
  const {contents, loading, error } = useNewsContent();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // console.log(contents);

  return (
    <div className='hot-news container'>
      <h2 style={{marginLeft: '30px', textAlign: 'left'}}>Hot News</h2>
      {contents.map((content) => (
        <Card className="post-card" key={content.post_id}>
          
            <Card.Body>
              <Card.Title as="h2" style={{ color: "blue" }}>
                {content.post_title}
              </Card.Title>
              <Card.Text className="post-card-content">
                {content.post_content}
              </Card.Text>
              <hr/>
              
              <div>{content.username} </div>
              
              <Card.Text
                className="post-card-content"
                style={{ textAlign: "right", fontSize: "small" }}
              >
                {getMoment(content.created_timestamp)}
              </Card.Text>
            </Card.Body>
       
        </Card>
      ))}
    </div>
  );
}

export default HotNew;
