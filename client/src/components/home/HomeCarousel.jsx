import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import useMarketContent from "../../hooks/useMarketContent.js";
import useMarketingContent from '../../hooks/home/homeguest/useMarketingContent.js';
import {Card} from "react-bootstrap";
import '../../assets/css/Carosel.css';

function HomeCarousel() {
  // const {contents, loading, error } = useMarketContent();
  const { contents, loading, error } = useMarketingContent();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }  
  // console.log(contents);

  return (
    <>
    <div className='carousel-container'>
      <Carousel data-bs-theme="dark" className='Carousel'>        
        {contents.map((marketcontent) => (
        <Carousel.Item className='content-box'>  
        <Card className="post-card shadow-sm" key={marketcontent.id} style={{border: '2px solid darkgrey', backgroundImage: `url(${marketcontent.banner})`}}>          
          <Card.Body style={{height: '200px'}}>
            <Card.Title as="h2" style={{ color: "blue" }}>
              {marketcontent.title}
            </Card.Title>
            <Card.Text className="post-card-content" style={{color: 'black'}}>
              {marketcontent.description}
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
