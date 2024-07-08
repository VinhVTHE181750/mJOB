import React from 'react';
import useNewsContent from "../hooks/useNewsContent.js";
import {getMoment} from "../functions/Converter";
import {Card} from "react-bootstrap";

function HotNew() {
  const {news, loading, error } = useNewsContent();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='hot-news container'>
      {/* <div className="mt-4">
        <h2 style={{marginLeft: '20px', textAlign: 'left'}}>Hot News</h2>
        <Container>
        <div className="p-3 border bg-light text-center new-box" style={{marginBottom: '10px'}}>New Box</div>
        <div className="p-3 border bg-light text-center new-box" style={{marginBottom: '10px'}}>New Box</div>
        <div className="p-3 border bg-light text-center new-box" style={{marginBottom: '10px'}}>New Box</div>
        </Container>
      </div> */}
      <h2 style={{marginLeft: '30px', textAlign: 'left'}}>Hot News</h2>
      {news.map((newcontent) => (
        <Card className="post-card" key={newcontent.id}>
          
            <Card.Body>
              <Card.Title as="h2" style={{ color: "blue" }}>
                {newcontent.topic}
              </Card.Title>
              <Card.Text className="post-card-content">
                {newcontent.content}
              </Card.Text>
              <Card.Link
                href={`/users/${newcontent.author}`}
                className="post-author"
                data-toggle="tooltip"
                title={`Author: ${newcontent.author}`}
                onClick={(e) => e.stopPropagation()}
              >
                {newcontent.author}
              </Card.Link>
              <Card.Text
                className="post-card-content"
                style={{ textAlign: "right", fontSize: "small" }}
              >
                {getMoment(newcontent.created_timestamp)}
              </Card.Text>
            </Card.Body>
       
        </Card>
      ))}
    </div>
  );
}

export default HotNew;
