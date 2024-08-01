import React, { useEffect, useState } from 'react';
import '../../assets/css/Dashboard.css';
import { Button, Table } from 'react-bootstrap';
import useCreatorJobHistory from '../../hooks/job/jobhistory/useCreatorJobHistory';

const CreatorDashboard = (user) => {
  const userId = user.user.id;
  const { jobHistory, loading, error, fetchJobHistory } = useCreatorJobHistory();
  const formatStatus = (status) => {
    if (!status) return '';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  useEffect(() => {
    fetchJobHistory(userId);
  }, [userId]);

  const totalJobs = jobHistory.length;
  const completedJobs = jobHistory.filter((job) => formatStatus(job.status) === 'Completed');
  const processedJobs = jobHistory.filter((job) => formatStatus(job.status) !== 'Completed');
  const totalCompletedJobs = completedJobs.length;
  const totalProcessedJobs = processedJobs.length;
  const totalCreatedJobs = jobHistory.filter((job) => formatStatus(job.status) === 'Active').length;

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

  if (loading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>Error loading data.</h3>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Employer Dashboard</h2>
        <button className="create-job-button" onClick={() => window.location.href = '/jobs/add'}>Create Job</button>
      </div>
      
      
      <div className="stats-container">
      <div className="stat-box">
          <h3 className='created'>{totalCreatedJobs}</h3>
          <p>Total Job Created</p>
        </div>
        <div className="stat-box">
          <h3 className='completed'>{totalCompletedJobs}</h3>
          <p>Jobs Completed</p>
        </div>
        <div className="stat-box">
          <h3 className='applied'>{totalProcessedJobs}</h3>
          <p>Jobs Processed</p>
        </div>
        
      </div>

      <div className="job-section">
        <h4>Jobs Processed</h4>
        <div className="job-list">
          {processedJobs.length === 0 ? (
            <h1 style={{ color: 'darkgrey', textAlign: 'center' }}>No Jobs Currently Applied</h1>
          ) : (
            <Table striped bordered hover variant="white">
              <thead>
                <tr>
                  <th>Job ID</th>
                  <th>Title</th>
                  <th>Tags</th>
                  <th>Location</th>
                  <th>Created by</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {processedJobs.slice(0, 3).map(job => (
                  <tr key={job.id}>
                    <td>{job.id}</td>
                    <td>{job.title}</td>
                    <td>{job.tags}</td>
                    <td>{job.location}</td>
                    <td>{job.User.username}</td>
                    <td style={getStatusStyle(job.status)}>{formatStatus(job.status)}</td>
                    <td><Button variant="primary" size="sm" href={`/jobs/${job.id}`}>Detail</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>

      <div className="job-section">
        <h4>Job Completed</h4>
        <div className="job-list">
          {completedJobs.length === 0 ? (
            <h1 style={{ color: 'darkgrey', textAlign: 'center' }}>No Jobs Completed</h1>
          ) : (
            <Table striped bordered hover variant="white">
              <thead>
                <tr>
                  <th>Job ID</th>
                  <th>Title</th>
                  <th>Tags</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {completedJobs.slice(0, 3).map(job => (
                  <tr key={job.id}>
                    <td>{job.id}</td>
                    <td>{job.title}</td>
                    <td>{job.tags}</td>
                    <td>{job.location}</td>
                    <td style={getStatusStyle(job.status)}>{formatStatus(job.status)}</td>
                    <td><Button variant="primary" size="sm" href={`/jobs/${job.id}`}>Detail</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboard;
