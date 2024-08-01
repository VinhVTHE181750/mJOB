import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import '../../assets/css/JobsStatistic.css';
import { useRelatedJobs } from '../../hooks/home/useRelatedJobs';
import useRecentProcessedJobs from '../../hooks/job/useRecentProcessedJobs';
import useRecentCreatedJobs from '../../hooks/job/useRecentCreatedJobs';

const defaultAvatarUrl = 'https://www.topcv.vn/v4/image/normal-company/logo_default.png';

function EmployerStatistic({ user }) {
  const [selectedJobs, setSelectedJobs] = useState('ongoing'); // 'ongoing' or 'pending'
  const userid = user.id;

  // Fetching jobs data
  const { jobs: processedJobs, loading: processedLoading, error: processedError, fetchRecentProcessedJobs } = useRecentProcessedJobs();
  const { jobs: createdJobs, loading: createdLoading, error: createdError, fetchRecentCreatedJobs } = useRecentCreatedJobs();
  const { jobs: relatedJobs, loading: relatedLoading, error: relatedError } = useRelatedJobs();
  const [jobList, setJobList] = useState(processedJobs);
  // Fetch jobs when component mounts or selectedJobs changes
  useEffect(() => {
    fetchRecentProcessedJobs(userid);
    fetchRecentCreatedJobs(userid);
  }, [userid]);

  const handleOngoingClick = () => {
    setJobList(processedJobs.slice(0,4));
    setSelectedJobs('ongoing');
  }
  const handlePendingClick = () => {
    setJobList(createdJobs.slice(0,4));

    setSelectedJobs('pending');
  }

  const formatCurrency = (amount, currencyCode) => {
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

    return formatted.replace(/\s/g, '');
  };

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

  const formatStatus = (status) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

const getStatusStyle = (status) => {
  switch (formatStatus(status)) {
    case 'Ongoing':
      return { color: 'orange' };
    case 'Completed':
      return { color: 'green' };
    case 'Rejected':
      return { color: 'red' };
    case 'Pending':
      return { color: 'blue' };
    default:
      return {};
  }
};

  return (
    <div className='jobs-statistic'>
      <h2>My Jobs</h2>
      <div className='jobs-statistic-components'>
        <div
          className={`jobs-on-progress ${selectedJobs === 'ongoing' ? 'selected-type' : ''}`}
          onClick={handleOngoingClick}
        >
          Processing Job
        </div>
        <div
          className={`jobs-applied ${selectedJobs === 'pending' ? 'selected-type' : ''}`}
          onClick={handlePendingClick}
        >
          Created Job
        </div>
        <a className='jobs-statistic-components' href='/myjobs' style={{ float: 'right' }}>View all</a>
      </div>
      {selectedJobs === 'ongoing' && (
        <div className='row '>
          {processedJobs.length === 0 ? (
            <h2 style={{ color: 'darkgrey', textAlign: 'center', marginTop: '20px' }}>Currently, you don't have any ongoing jobs.</h2>
          ) : (jobList.map(job => (
            <Card className='job-card-statistic' key={job.id} style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title style={{ fontWeight: 'bold' }}>{job.title}</Card.Title>
                <Card.Text>Location: {job.location}</Card.Text>
                <Card.Text>{job.User.username}</Card.Text>
                <Card.Text>Status: <span style={getStatusStyle(job.status)}>{formatStatus(job.status)}</span></Card.Text>
                <Button variant="primary" href={`/jobs/${job.id}`}>Detail</Button>
              </Card.Body>
            </Card>
          )))}
        </div>
      )}

      {/* Display Created Jobs */}
      {selectedJobs === 'pending' && (
        <div className='row'>
          {createdJobs.length === 0 ? (
            <h2 style={{ color: 'darkgrey', textAlign: 'center', marginTop: '20px' }}>You haven't applied to any jobs.</h2>
          ) : (jobList.map(job => (
            <Card className='job-card-statistic' key={job.id} style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title style={{ fontWeight: 'bold' }}>{job.title}</Card.Title>
                <Card.Text>Location: {job.location}</Card.Text>
                <Card.Text>{job.User.username}</Card.Text>
                <Card.Text>Status: <span style={getStatusStyle(job.status)}>{formatStatus(job.status)}</span></Card.Text>
                <Button variant="primary" href={`/jobs/${job.id}`}>Detail</Button>
              </Card.Body>
            </Card>
          )))}
        </div>
      )}
      <h2 className='mt-5'>Jobs you may care about:</h2>
      <div className='related-jobs'>
        {relatedLoading ? (
          <p>Loading related jobs...</p>
        ) : relatedError ? (
          <p>Error: {relatedError.message}</p>
        ) : relatedJobs.length === 0 ? (
          <p>No related jobs available.</p>
        ) : (
          relatedJobs.map(job => (
            <div className="job-card" style={{ marginLeft: '10px' }} key={job.job_id}>
              <div className="job-card-img">
                <img
                  src={defaultAvatarUrl}
                  alt={job.User?.username || 'Job Creator'}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className="job-card-content">
                <div className="job-card-header">
                  <h2 className="job-title">{job.title}</h2>
                  <a href={`/jobs/${job.job_id}`} className="job-detail-link">Detail</a>
                </div>
                <div className="job-card-body">
                  <div className="job-info">
                    <p>Creator: {job.User?.username || 'Unknown'}</p>
                    <p>Job Tag: {job.tags || 'N/A'}</p>
                    <p>Location: {job.location || 'Unknown'}</p>
                  </div>
                  <div className="job-info-right">
                    <p className='tag'>{formatSalary(job.salaryType, job.salary, job.salaryCurrency)}</p>
                    <p>{job.timeleft || 'Unknown'} days left</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* <h2 className='mt-5'>{selectedJobs === 'ongoing' ? 'Processing Jobs' : 'Created Jobs'}</h2> */}
      {/* <Row>
        <Col>
          {(selectedJobs === 'ongoing' ? processedJobs : createdJobs).map(job => (
            <div className="job-card" style={{ marginLeft: '10px' }} key={job.id || job.job_id}>
              <div className="job-card-img">
                <img
                  src={defaultAvatarUrl}
                  alt={job.User?.username || 'Job Creator'}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className="job-card-content">
                <div className="job-card-header">
                  <h2 className="job-title">{job.title}</h2>
                  <a href={`/jobs/${job.id || job.job_id}`} className="job-detail-link">Detail</a>
                </div>
                <div className="job-card-body">
                  <div className="job-info">
                    <p>Creator: {job.User?.username || 'Unknown'}</p>
                    <p>Job Tag: {job.tags || 'N/A'}</p>
                    <p>Location: {job.location || 'Unknown'}</p>
                  </div>
                  <div className="job-info-right">
                    <p className='tag'>{formatSalary(job.salaryType, job.salary, job.salaryCurrency)}</p>
                    <p>{job.timeleft || 'Unknown'} days left</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Col>
      </Row> */}
    </div>
  );
}

export default EmployerStatistic;
