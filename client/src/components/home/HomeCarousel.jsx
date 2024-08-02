import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Card } from 'react-bootstrap';
import '../../assets/css/Carousel.css';

function HomeCarousel() {
  const staticContents = [
    {
      id: 1,
      title: 'Let start with mJob',
      description: 'A market place that help you find your job in the comunity easier than going to find is your self.',
      imageUrl: 'https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      title: 'Market place that is helpful for students.',
      description: 'We provide a market place that is helpful for students who are looking for job.',
      imageUrl: 'https://images.pexels.com/photos/9588210/pexels-photo-9588210.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      title: 'Employer recommendation',
      description: 'Why don\'t you try to use our service to look for potential employee',
      imageUrl: 'https://images.pexels.com/photos/5833848/pexels-photo-5833848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  return (
    <div className='carousel-container'>
      <Carousel data-bs-theme="dark" className='Carousel'>
        {staticContents.map((content) => (
          <Carousel.Item key={content.id} className='shadow-sm'>
            <div className="carousel-content" style={{ backgroundImage: `url(${content.imageUrl})` }}>
              <div className="overlay">
                <div className="text-container">
                  <h2 className="carousel-title">
                    {content.title}
                  </h2>
                  <p className="carousel-description">
                    {content.description}
                  </p>
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
