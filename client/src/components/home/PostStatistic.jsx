import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../../assets/css/PostStatistic.css';

import useNewPosts from '../../hooks/home/homeuser/useNewPost';
import useHotPosts from '../../hooks/home/useHotPost';
import { getMoment } from '../../functions/Converter.js';

function PostStatistic() {
  const navigate = useNavigate();
  const { posts: newPosts, loading: newLoading, error: newError } = useNewPosts();
  const { contents: hotPosts, loading: hotLoading, error: hotError } = useHotPosts();
  const [selectedPosts, setSelectedPosts] = useState('new'); // 'new' or 'hot'

  const handleNewPostsClick = () => {
    setSelectedPosts('new');
  };

  const handleHotPostsClick = () => {
    setSelectedPosts('hot');
  };

  const handleDetailClick = (id) => {
    navigate(`/forum/posts/${id}`);
  };

  return (
    <div>
      <div className='post-statistic'>
        <h2>Post</h2>
        <div className='post-statistic-components'>
          <div className={`post-on-progress ${selectedPosts === 'new' ? 'selected-type' : ''}`} onClick={handleNewPostsClick}>
            New Post
          </div>
          <div className={`post-applied ${selectedPosts === 'hot' ? 'selected-type' : ''}`} onClick={handleHotPostsClick}>
            Hot Post
          </div>
        </div>
        <div className='row align-items-float-end'>
          {selectedPosts === 'new' && (
            newPosts.map(post => (
              <Card key={post.id} className='post-card-statistic post-card' style={{ width: '90%' }}>
                {/* Replace with actual image source and content */}
                <Card.Body>
                  <Card.Title as="h2" style={{ color: "blue" }}>
                    {post.title}
                  </Card.Title>
                  <Card.Text>{post.content}</Card.Text>
                  <div style={{ alignContent: "right", fontSize: "small" }}>{post.User.username}</div>
                  <Card.Text
                    className="post-card-content"
                    style={{ textAlign: "right", fontSize: "small" }}
                  >
                    {getMoment(post.updatedAt)}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleDetailClick(post.id)}>Detail</Button>
                </Card.Body>
              </Card>
            ))
          )}
          {selectedPosts === 'hot' && (
            hotPosts.map(post => (
              <Card key={post.id} className='post-card-statistic post-card' style={{ width: '90%' }}>
              {/* Replace with actual image source and content */}
              <Card.Body>
                <Card.Title as="h2" style={{ color: "blue" }}>
                  {post.title}
                </Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <div style={{ alignContent: "right", fontSize: "small" }}>{post.User.username}</div>
                <Card.Text
                  className="post-card-content"
                  style={{ textAlign: "right", fontSize: "small" }}
                >
                  {getMoment(post.updatedAt)}
                </Card.Text>
                <Button variant="primary" onClick={() => handleDetailClick(post.id)}>Detail</Button>
              </Card.Body>
            </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PostStatistic;
