import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import useMarketContent from "../hooks/useMarketContent.js";
import { getMoment } from "../functions/Converter";
import { Card } from "react-bootstrap";
import '../assets/css/Carosel.css';

function HomeCarousel() {
  const {contents, loading, error } = useMarketContent();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }  

  return (
    <>
    <div className='carousel-container'>
      <Carousel data-bs-theme="dark" className='Carousel'>        
        {contents.map((marketcontent) => (
        <Carousel.Item className='content-box'>  
        <Card className="post-card shadow-sm" key={marketcontent.id} style={{border: '2px solid darkgrey'}}>          
          <Card.Body style={{height: '200px'}}>
            <Card.Title as="h2" style={{ color: "blue" }}>
              {marketcontent.topic}
            </Card.Title>
            <Card.Text className="post-card-content" style={{color: 'black'}}>
              {marketcontent.content}
            </Card.Text>
          </Card.Body>
      </Card>
      </Carousel.Item>
      ))}
      </Carousel>
    </div>
    </>
  );
}

export default HomeCarousel;
