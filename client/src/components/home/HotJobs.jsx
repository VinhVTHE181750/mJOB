import React from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import useHotJobs from '../../hooks/home/homeguest/useHotjob'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/HotJobs.css';

function HotJobs() {
  const { contents, loading, error } = useHotJobs();

  function formatCurrency(amount, currencyCode) {
    const locales = {
      'USD': 'en-US',
      'EUR': 'de-DE',
      'VND': 'vi-VN'
    };

    const formatter = new Intl.NumberFormat(locales[currencyCode] || 'en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    let formatted = formatter.format(amount);
    if (currencyCode === 'USD') {
      formatted = formatted.replace('$', '').trim() + '$';
    }

    formatted = formatted.replace(/\s/g, '');

    return formatted;
  }

  const formatSalary = (type, amount, currency) => {
    switch (type.toUpperCase()) {
      case 'ONETIME':
        return `${formatCurrency(amount, currency)}`;
      case 'HOURLY':
        return `${formatCurrency(amount, currency)}/Hour`;
      case 'MONTHLY':
        return `${formatCurrency(amount, currency)}/Month`;
      default:
        return amount;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const defaultAvatarUrl = 'https://images.pexels.com/photos/583848/pexels-photo-583848.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

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

  return (
    <>
      <Container>
        <Row>
          <h1 style={{ margin: '50px' }}>Hot Jobs Today</h1>
        </Row>
        <Row className="justify-content-center">
          {contents.map(content => (
            <Col key={content.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card style={{ height: '100%' }}>
                <Card.Img variant="top" src={defaultAvatarUrl} alt={content.User.username} />
                <Card.Body>
                  <Card.Title>{content.title}</Card.Title>
                  <Card.Text>
                    <p style={{ fontWeight: 'bold', fontStyle: 'italic', color: 'darkgray' }}>Creator: {content.User.EmployerProfile.name}</p>
                    <p>Location: {content.location}</p>
                    <p className='tag'>{formatSalary(content.salaryType, content.salary, content.salaryCurrency)}</p>
                    </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HotJobs;
