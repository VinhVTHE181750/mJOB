import React from 'react'
import { Card, Button } from 'react-bootstrap'
import '../../assets/css/JobsStatistic.css'
function JobsStatistic() {
  return (
    <div className='jobs-statistic'>
      <h2>My Jobs</h2>
      <div className='jobs-statistic-components'>
        <div className='jobs-on-progress'>On Progress</div>
        <div className='jobs-applied'>Applied</div>
      </div>
      
      <Card style={{width: '90%'}}>
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
      <h2 className='mt-5'>Jobs you may care about:</h2>
      <Card style={{ width: '18rem' }}>
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
  )
}

export default JobsStatistic