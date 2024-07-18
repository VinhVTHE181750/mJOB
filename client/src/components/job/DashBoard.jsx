import React, {useEffect, useState} from 'react';
import '../../assets/css/Dashboard.css';
import useUserTotalCompletedJob from '../../hooks/useUserTotalCompletedJob';
import useUserTotalCurrentAppliedJob from '../../hooks/useUserTotalCurrentAppliedJob';
import useUserTotalCreatedJob from '../../hooks/useUserTotalCreatedJob';
import useUserCompletedJobList from '../../hooks/useUserCompletedJobList';
import useUserAppliedJobList from '../../hooks/useUserAppliedJobList';
import {Table} from 'react-bootstrap';


const Dashboard = () => {

  const { count: completedCount, loading: completedLoading, error: completedError } = useUserTotalCompletedJob(1);
  const { count: appliedCount, loading: appliedLoading, error: appliedError } = useUserTotalCurrentAppliedJob(1);
  const { count: createdCount, loading: createdLoading, error: createdError } = useUserTotalCreatedJob(1);

  const { jobs: completedJobs, loading: jobsLoading, error: jobsError } = useUserCompletedJobList(1);
  const { jobList: appliedJobs, loading: appliedJobsLoading, error: appliedJobsError } = useUserAppliedJobList(1);


  const [completedJobList, setCompletedJobList] = useState([]);
  const [appliedJobList, setAppliedJobList] = useState([]);

  useEffect(() => {
    setCompletedJobList(completedJobs);
  }, [completedJobs]);

  useEffect(() => {
    setAppliedJobList(appliedJobs);
  }, [appliedJobs]);

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
        <button className="create-job-button">Create Job</button>
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
        <Table striped bordered hover variant="white">
                <thead>
                  <tr>
                    <th>Job ID</th>
                    <th>Title</th>
                    <th>Tags</th>
                    <th>Location</th>
                    <th>Created by</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                {appliedJobList.map(job => (
                  <tr key={job.job_id}> 
                  <td>{job.job_id}</td>            
                  <td>{job.job_title}</td>
                  <td>{job.job_tags}</td>
                  <td>{job.job_work_location}</td>
                  <td>{job.username}</td>
                  <td>{job.job_status}</td>
                </tr>
                ))}
                </tbody>
              </Table>
        </div>
      </div>
      <div className="job-section">
        <h4>Job Completed</h4>
        <div className="job-list">
            <Table striped bordered hover variant="white">
                <thead>
                  <tr>
                    <th>Job ID</th>
                    <th>Title</th>
                    <th>Tags</th>
                    <th>Location</th>
                    <th>Created by</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                {completedJobs.map(job => (
                  <tr key={job.job_id}> 
                  <td>{job.job_id}</td>            
                  <td>{job.job_title}</td>
                  <td>{job.job_tags}</td>
                  <td>{job.job_work_location}</td>
                  <td>{job.username}</td>
                  <td>{job.job_status}</td>
                </tr>
                ))}
                </tbody>
              </Table>
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
