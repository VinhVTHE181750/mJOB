import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import useMarketingContent from '../../hooks/home/homeguest/useMarketingContent.js';
import { Card } from 'react-bootstrap';
import '../../assets/css/Carosel.css';

function HomeCarousel() {
  const { contents, loading, error } = useMarketingContent();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='carousel-container'>
      <Carousel data-bs-theme="dark" className='Carousel'>
        {contents.map((marketcontent) => (
          <Carousel.Item key={marketcontent.id} className='shadow-sm'>
            <Card 
              className="post-card shadow-sm"
              style={{ backgroundImage: `url(https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)` }}
            >
              <Card.Body style={{ height: '100%' }}>
                <Card.Title as="h2">
                  {marketcontent.title}
                </Card.Title>
                <Card.Text className="post-card-content">
                  {marketcontent.description}
                </Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
