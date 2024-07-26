import React from 'react';
import useNewsContent from "../../hooks/useNewsContent.js";
import useHotPost from '../../hooks/home/useHotPost.js';
import {getMoment} from "../../functions/Converter.js";
import {Card} from "react-bootstrap";

function HotNew() {
  // const {contents, loading, error } = useNewsContent();
  const {contents, loading, error } = useHotPost();
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(contents);
  if (error) {
    return  <Card className="post-card mb-5">
    <Card.Body>
      <Card.Title as="h2" style={{ color: "red" }}>
        This Content is Currently Unavailable
      </Card.Title>
      <Card.Text className="post-card-content">
        Please check back later for updates.
      </Card.Text>
    </Card.Body>
  </Card>;
  }

  return (
    <div className='hot-news container'>
      <h2 style={{marginLeft: '30px', textAlign: 'left'}}>Hot News</h2>
      {contents.map((content) => (
        <Card className="post-card" key={content.id}>
          
            <Card.Body>
              <Card.Title as="h2" style={{ color: "blue" }}>
                {content.title}
              </Card.Title>
              <Card.Text className="post-card-content">
                {content.content}
              </Card.Text>
              <hr/>
              
              <div style={{ alignContent: "right", fontSize: "small" }} >{content.User.username} </div>
              
              <Card.Text
                className="post-card-content"
                style={{ textAlign: "right", fontSize: "small" }}
              >
                {getMoment(content.updatedAt)}
              </Card.Text>
            </Card.Body>
       
        </Card>
      ))}
    </div>
  );
}

export default HotNew;
