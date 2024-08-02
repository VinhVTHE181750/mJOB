import React from 'react';
import { useNavigate } from 'react-router-dom';
import useHotPost from '../../hooks/home/useHotPost.js';
import { getMoment } from '../../functions/Converter.js';
import { Card } from 'react-bootstrap';

function HotNew() {
  const navigate = useNavigate();
  const { contents, loading, error } = useHotPost();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <Card className="post-card mb-5">
        <Card.Body>
          <Card.Title as="h2" style={{ color: "red" }}>
            This Content is Currently Unavailable
          </Card.Title>
          <Card.Text className="post-card-content">
            Please check back later for updates.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  const handleCardClick = (id) => {
    navigate(`/forum/posts/${id}`);
  };

  return (
    <div className='hot-news container'>
      <h2 style={{ marginLeft: '30px', textAlign: 'left' }}>Hot News</h2>
      {contents.map((content) => (
        <Card 
          className="post-card" 
          key={content.id} 
          onClick={() => handleCardClick(content.id)}
          style={{ cursor: 'pointer' }} // Optional: cursor change on hover
        >
          <Card.Body>
            <Card.Title as="h2" style={{ color: "blue" }}>
              {content.title}
            </Card.Title>
            <Card.Text className="post-card-content">
              {content.content}
            </Card.Text>
            <hr />
            <div style={{ textAlign: "right", fontSize: "small" }}>
              {content.User.username}
            </div>
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
