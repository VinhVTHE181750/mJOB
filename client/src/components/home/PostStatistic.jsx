import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../../assets/css/PostStatistic.css';
function PostStatistic() {
return (
    <div>
    <div className='post-statistic'>
      <h2>Post</h2>
      <div className='post-statistic-components'>
        <div className='post-on-progress'>New Post</div>
        <div className='post-applied'>Hot Post</div>
        <div className='post-applied'>Related Post</div>
      </div>
      <div className='row align-items-float-end'>
      <Card className='col-md-4 post-card-statistic' style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card className='col-md-4 post-card-statistic' style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      <Card className='col-md-4 post-card-statistic' style={{ width: '18rem' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
      </div>
    </div>
    </div>
  )
}

export default PostStatistic