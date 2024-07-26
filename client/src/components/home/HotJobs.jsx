import React from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import useTop3Jobs from '../../hooks/useTop3Jobs';
import useHotJobs from '../../hooks/home/homeguest/useHotjob'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/HotJobs.css';

function HotJobs() {
    // const { contents, loading, error } = useTop3Jobs();
    const { contents, loading, error } = useHotJobs();
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <Card className="post-card mb-5">
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
        <Container>
            <Row><h1 style={{margin: '50px'}}>Hot Jobs Today </h1></Row>
      <Row className="justify-content-center gap-50" style={{height: '400px'}}>
        {contents.map((job) => (
          <Col key={job.id} md className="mb-4">
            <Card className="custom-card h-100 shadow-sm">
              <Card.Img variant="top" src={job.job_image_url || 'default-image-url.jpg'} alt={job.title} />
              <Card.Body>
                <Card.Title>{job.title}</Card.Title>
                <Card.Text>
                  {job.description}
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">{job.location}</small>
                </Card.Text>
                <a href={`/jobs/${job.id}`} className="card-link">View Details</a>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    );
  }

export default HotJobs