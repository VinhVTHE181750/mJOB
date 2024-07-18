import React from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import useTop3Jobs from '../../hooks/useTop3Jobs';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/HotJobs.css';

function HotJobs() {
    const { contents, loading, error } = useTop3Jobs();

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
          <Col key={job.job_id} md className="mb-4">
            <Card className="custom-card h-100 shadow-sm">
              <Card.Img variant="top" src={job.job_image_url || 'default-image-url.jpg'} alt={job.job_title} />
              <Card.Body>
                <Card.Title>{job.job_title}</Card.Title>
                <Card.Text>
                  {job.job_description}
                </Card.Text>
                <Card.Text>
                  <small className="text-muted">{job.job_work_location}</small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    );
  }

export default HotJobs