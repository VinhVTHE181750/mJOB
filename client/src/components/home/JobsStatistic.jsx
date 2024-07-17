import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
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
      </div>
      
      {/* Display Ongoing Jobs */}
      {selectedJobs === 'ongoing' && (
        <div className='mt-3 row'>
          {ongoingJobs.map(job => (
            <Card className='job-card-statistic' key={job.job_id} style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{job.job_title}</Card.Title>
                <Card.Text>{job.job_description}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Display Pending Jobs */}
      {selectedJobs === 'pending' && (
        <div className='mt-3 row'>
          {pendingJobs.map(job => (
             <Card className=' job-card-statistic' key={job.job_id} style={{ width: '18rem' }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{job.job_title}</Card.Title>
                <Card.Text>{job.job_description}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      <h2 className='mt-5'>Jobs you may care about:</h2>
      <div className='mt-3'>
        {relatedJobs.map(job => (
          <Card className='job-card-statistic' key={job.job_id} style={{ width: '90%' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{job.job_title}</Card.Title>
              <Card.Text>{job.job_description}</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default JobsStatistic