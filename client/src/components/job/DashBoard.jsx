import React, {useEffect, useState} from 'react';
import '../../assets/css/Dashboard.css';
import useUserTotalCompletedJob from '../../hooks/useUserTotalCompletedJob';
import useUserTotalCurrentAppliedJob from '../../hooks/useUserTotalCurrentAppliedJob';
import useUserTotalCreatedJob from '../../hooks/useUserTotalCreatedJob';
import useUserCompletedJobList from '../../hooks/useUserCompletedJobList';
import useUserAppliedJobList from '../../hooks/useUserAppliedJobList';
// import useTotalCompletedJob from '../../hooks/job/dashboard/useTotalCompletedJob';
// import useTotalCreatedJob from '../../hooks/job/dashboard/useTotalCreatedJob';
// import useTotalCurrentAppliedJob from '../../hooks/job/dashboard/useTotalCurrentAppliedJob';
import useWhoAmI from '../../hooks/user/useWhoAmI';
import {Button, Table} from 'react-bootstrap';


const Dashboard = () => {
  const { userId} = useWhoAmI();
  console.log(userId);
  const { count: completedCount, loading: completedLoading, error: completedError } = useUserTotalCompletedJob(userId);
  const { count: appliedCount, loading: appliedLoading, error: appliedError } = useUserTotalCurrentAppliedJob(userId);
  const { count: createdCount, loading: createdLoading, error: createdError } = useUserTotalCreatedJob(userId);

  const { jobs: completedJobs, loading: jobsLoading, error: jobsError } = useUserCompletedJobList(userId);
  const { jobList: appliedJobs, loading: appliedJobsLoading, error: appliedJobsError } = useUserAppliedJobList(userId);
  const [completedJobList, setCompletedJobList] = useState([]);
  const [appliedJobList, setAppliedJobList] = useState([]);

  useEffect(() => {
    setCompletedJobList(completedJobs);
  }, [completedJobs]);

  useEffect(() => {
    setAppliedJobList(appliedJobs);
  }, [appliedJobs]);

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
  // console.log('Data: ', completedJobList);
  // console.log('Data applied: ', appliedJobs);



  // // console.log(completedJobList);
  // useEffect(() => {
  //   console.table(completedJobs);
  //   // console.log(jobsLoading); 
  // }, [jobsLoading]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="create-job-button" onClick={() => window.location.href = '/jobs/add'}>Create Job</button>
      </div>
      <div className="stats-container">
        <div className="stat-box">
        {completedLoading ? (
            <h3>Loading...</h3>
          ) : completedError ? (
            <h3>Error: {completedError.message}</h3>
          ) : (
            <h3 className='completed'>{completedCount}</h3>
          )}
          <p>Completed Jobs</p>
        </div>
        <div className="stat-box">
        {appliedLoading ? (
            <h3>Loading...</h3>
          ) : appliedError ? (
            <h3>Error: {appliedError.message}</h3>
          ) : (
            <h3 className='applied'>{appliedCount}</h3>
          )}
          <p>Current Apply Job</p>
        </div>
        <div className="stat-box">
        {createdLoading ? (
            <h3>Loading...</h3>
          ) : createdError ? (
            <h3>Error: {createdError.message}</h3>
          ) : (
            <h3 className='created'>{createdCount}</h3>
          )}
          <p>Jobs Posted</p>
        </div>
      </div>
      <div className="job-section">
        <h4>Job Applied</h4>
        <div className="job-list">
        {appliedJobs.length == 0 ? <h1 style={{color: 'darkgrey', textAlign: 'center'}}>No Jobs Currently Applied</h1> : (<Table striped bordered hover variant="white">
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
                {appliedJobs.map(job => (
                  <tr key={job.id}> 
                  <td>{job.Job.id}</td>            
                  <td>{job.Job.title}</td>
                  <td>{job.Job.tags}</td>
                  <td>{job.Job.location}</td>
                  <td>{job.Job.User.username}</td>
                  <td style={getStatusStyle(job.status)}>{formatStatus(job.status)}</td>
                  <td><Button variant="primary" size="sm" href={`/job/${job.Job.id}`}>Detail</Button></td>
                </tr>
                ))}
                </tbody>
              </Table>)}
        </div>
      </div>
      <div className="job-section">
        <h4>Job Completed</h4>
        <div className="job-list">
          {completedJobs.length == 0 ? <h1 style={{color: 'darkgrey', textAlign: 'center'}}>No Jobs Completed</h1> : (<Table striped bordered hover variant="white">
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
                {completedJobs.map(job => (
                  <tr key={job.id}> 
                  <td>{job.Job.id}</td>            
                  <td>{job.Job.title}</td>
                  <td>{job.Job.tags}</td>
                  <td>{job.Job.location}</td>
                  <td>{job.Job.User.username}</td>
                  <td style={getStatusStyle(job.status)}>{formatStatus(job.status)}</td>
                  <td><Button variant="primary" size="sm" href={`/job/${job.Job.id}`}>Detail</Button></td>
                </tr>
                ))}
                </tbody>
              </Table>)}
            
          {/* {jobsLoading ? (
            <p>Loading...</p>
          ) : jobsError ? (
            <p>Error: {jobsError.message}</p>
          // ) : completedJobs.length == 0 ? (
          //   <p>No completed jobs found.</p>
          ) : (
            <ul>
              {completedJobs.map(job => (
                <li key={job.id}>
                  <h5>{job.description}</h5>
                  <p>Date: {job.date}</p>
                  <p>Status: {job.status}</p>
                </li>
              ))}
            </ul>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
