import React, { useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import '../../assets/css/JobsStatistic.css';
import { useOngoingJobs } from '../../hooks/home/useOngoingJobs';
import { useRelatedJobs } from '../../hooks/home/useRelatedJobs';
import { usePendingJobs } from '../../hooks/home/usePendingJobs';

const userId = 1; // Replace with actual user ID

function JobsStatistic() {

  const { jobs: ongoingJobs, loading: ongoingLoading, error: ongoingError } = useOngoingJobs(userId);
  const { jobs: pendingJobs, loading: pendingLoading, error: pendingError } = usePendingJobs(userId);
  const { jobs: relatedJobs, loading: relatedLoading, error: relatedError } = useRelatedJobs();

  const [selectedJobs, setSelectedJobs] = useState('ongoing'); // 'ongoing' or 'pending'

  const handleOngoingClick = () => {
    setSelectedJobs('ongoing');
  };

  const handlePendingClick = () => {
    setSelectedJobs('pending');
  };

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
  
    // Format the amount
    let formatted = formatter.format(amount);
    if (currencyCode === 'USD') {
      formatted = formatted.replace('$', '').trim() + '$';
    }
  
    // Remove any space between the amount and the currency symbol
    formatted = formatted.replace(/\s/g, '');
  
    return formatted;
  }

  const formatSalary = (type, amount,currency) => {
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
        <div className={`jobs-on-progress ${selectedJobs === 'ongoing' ? 'selected-type' : ''}`} onClick={handleOngoingClick}>
          On Progress
        </div>
        <div className={`jobs-applied ${selectedJobs === 'pending' ? 'selected-type' : ''}`} onClick={handlePendingClick}>
          Applied
        </div>
        <a className='jobs-statistic-components' href='/myjobs' style={{float: 'right'}}>View all</a>
      </div>
      
      {/* Display Ongoing Jobs */}
      {selectedJobs === 'ongoing' && (
        <div className='row '>
          {ongoingJobs.length === 0 ? (
            <h2 style={{color: 'darkgrey', textAlign: 'center', marginTop: '20px'}}>Currently, you don't have any ongoing jobs.</h2>
          ) : (ongoingJobs.map(job => (
            <Card className='job-card-statistic' key={job.Job.id} style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title style={{ fontWeight: 'bold' }}>{job.Job.title}</Card.Title>
                <Card.Text>Location: {job.Job.location}</Card.Text>
                <Card.Text>{job.Job.User.username}</Card.Text>
                <Card.Text>Status: <span  style={getStatusStyle(job.status)}>{formatStatus(job.status)}</span></Card.Text>
                <Button variant="primary" href={`/jobs/${job.Job.id}`}>Detail</Button>
              </Card.Body>
            </Card>
          )))}
        </div>
      )}

      {/* Display Pending Jobs */}
      {selectedJobs === 'pending' && (
        <div className='row'>
           {pendingJobs.length === 0 ? (
            <h2 style={{color: 'darkgrey', textAlign: 'center', marginTop: '20px'}}>You haven't applied to any jobs.</h2>
          ) : (pendingJobs.map(job => (
             <Card className='job-card-statistic' key={job.Job.id} style={{ width: '18rem' }}>
             <Card.Img variant="top" src="holder.js/100px180" />
             <Card.Body>
               <Card.Title style={{ fontWeight: 'bold' }}>{job.Job.title}</Card.Title>
               <Card.Text>Location: {job.Job.location}</Card.Text>
               <Card.Text>{job.Job.User.username}</Card.Text>
               <Card.Text>Status: <span  style={getStatusStyle(job.status)}>{formatStatus(job.status)}</span></Card.Text>
               <Button variant="primary" href={`/jobs/${job.Job.id}`}>Detail</Button>
             </Card.Body>
           </Card>
          )))}
        </div>
      )}

      <h2 className='mt-5'>Jobs you may care about:</h2>
      <div className=''>

        {relatedJobs.map(job => (
          <div className="job-card" style={{ marginLeft: '10px' }} key={job.job_id}>
            <div className="job-card-img">IMG Background</div>
            <div className="job-card-content">
              <div className="job-card-header">
                <h2 className="job-title">{job.title}</h2>
                <a href={`/jobs/${job.id}`} className="job-detail-link">Detail</a>
              </div>
              <div className="job-card-body">
                <div className="job-info">
                  <p>Creator: {job.User.username}</p>
                  <p>Job Tag: {job.tags}</p>
                  <p>Location: {job.location}</p>
                </div>
                <div className="job-info-right">
                <p  className='tag'>{formatSalary(job.salaryType, job.salary,job.salaryCurrency)}</p>
                <p>{job.timeleft} days left</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default JobsStatistic